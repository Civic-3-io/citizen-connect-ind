-- Add tokens and level columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN tokens integer DEFAULT 0,
ADD COLUMN level text DEFAULT 'New Citizen';

-- Create categories table for issue types
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Categories are publicly readable
CREATE POLICY "Categories are publicly readable" 
ON public.categories 
FOR SELECT 
USING (true);

-- Create issues table
CREATE TABLE public.issues (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  category_id uuid REFERENCES public.categories(id) NOT NULL,
  title text NOT NULL,
  description text,
  location_text text,
  latitude double precision,
  longitude double precision,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in-progress', 'resolved')),
  assigned_to text,
  image_urls text[],
  is_anonymous boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on issues
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- Issues policies
CREATE POLICY "Issues are publicly readable" 
ON public.issues 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own issues" 
ON public.issues 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own issues" 
ON public.issues 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own issues" 
ON public.issues 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create issue_upvotes table
CREATE TABLE public.issue_upvotes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  issue_id uuid REFERENCES public.issues(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, issue_id)
);

-- Enable RLS on issue_upvotes
ALTER TABLE public.issue_upvotes ENABLE ROW LEVEL SECURITY;

-- Upvotes policies
CREATE POLICY "Upvotes are publicly readable" 
ON public.issue_upvotes 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own upvotes" 
ON public.issue_upvotes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own upvotes" 
ON public.issue_upvotes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create comments table
CREATE TABLE public.comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  issue_id uuid REFERENCES public.issues(id) ON DELETE CASCADE NOT NULL,
  comment_text text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Comments policies
CREATE POLICY "Comments are publicly readable" 
ON public.comments 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own comments" 
ON public.comments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
ON public.comments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
ON public.comments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create rewards table
CREATE TABLE public.rewards (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  cost_in_tokens integer NOT NULL,
  type text NOT NULL CHECK (type IN ('pass', 'certificate', 'credits', 'priority')),
  is_available boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on rewards
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- Rewards are publicly readable
CREATE POLICY "Rewards are publicly readable" 
ON public.rewards 
FOR SELECT 
USING (true);

-- Create user_redeemed_rewards table
CREATE TABLE public.user_redeemed_rewards (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  reward_id uuid REFERENCES public.rewards(id) NOT NULL,
  redeemed_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on user_redeemed_rewards
ALTER TABLE public.user_redeemed_rewards ENABLE ROW LEVEL SECURITY;

-- Users can view their own redeemed rewards
CREATE POLICY "Users can view their own redeemed rewards" 
ON public.user_redeemed_rewards 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own redemptions" 
ON public.user_redeemed_rewards 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add triggers for updated_at columns
CREATE TRIGGER update_issues_updated_at
BEFORE UPDATE ON public.issues
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rewards_updated_at
BEFORE UPDATE ON public.rewards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.categories (name, icon) VALUES
('Pothole', 'Construction'),
('Street Light', 'Lightbulb'),
('Garbage Collection', 'Trash2'),
('Water Leakage', 'Droplets'),
('Traffic Signal', 'TrafficCone'),
('Public Transport', 'Bus'),
('Parks & Recreation', 'Trees'),
('Other', 'AlertCircle');

-- Insert default rewards
INSERT INTO public.rewards (title, description, cost_in_tokens, type, is_available) VALUES
('Bus Pass - Monthly', 'Free monthly bus pass', 500, 'pass', true),
('Certificate of Appreciation', 'Digital certificate', 200, 'certificate', true),
('Metro Card Credits', '₹100 metro credits', 1000, 'credits', true),
('Government Office Priority', 'Fast-track service', 2000, 'priority', false);

-- Create RPC function to redeem rewards atomically
CREATE OR REPLACE FUNCTION public.redeem_reward(reward_uuid uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_tokens integer;
  reward_cost integer;
  reward_available boolean;
  result json;
BEGIN
  -- Get user's current tokens
  SELECT tokens INTO user_tokens 
  FROM public.profiles 
  WHERE user_id = auth.uid();
  
  -- Get reward details
  SELECT cost_in_tokens, is_available 
  INTO reward_cost, reward_available
  FROM public.rewards 
  WHERE id = reward_uuid;
  
  -- Check if reward exists and is available
  IF reward_cost IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Reward not found');
  END IF;
  
  IF NOT reward_available THEN
    RETURN json_build_object('success', false, 'error', 'Reward not available');
  END IF;
  
  -- Check if user has enough tokens
  IF user_tokens < reward_cost THEN
    RETURN json_build_object('success', false, 'error', 'Insufficient tokens');
  END IF;
  
  -- Deduct tokens and record redemption
  UPDATE public.profiles 
  SET tokens = tokens - reward_cost 
  WHERE user_id = auth.uid();
  
  INSERT INTO public.user_redeemed_rewards (user_id, reward_id)
  VALUES (auth.uid(), reward_uuid);
  
  RETURN json_build_object('success', true, 'remaining_tokens', user_tokens - reward_cost);
END;
$$;

-- Create RPC function to grant tokens for actions
CREATE OR REPLACE FUNCTION public.grant_tokens_for_action(target_user_id uuid, token_amount integer, action_type text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_token_count integer;
  new_level text;
BEGIN
  -- Add tokens to user
  UPDATE public.profiles 
  SET tokens = tokens + token_amount 
  WHERE user_id = target_user_id
  RETURNING tokens INTO new_token_count;
  
  -- Determine new level based on token count
  IF new_token_count >= 5000 THEN
    new_level := 'Community Hero';
  ELSIF new_token_count >= 2000 THEN
    new_level := 'Active Citizen';
  ELSIF new_token_count >= 500 THEN
    new_level := 'Aware Citizen';
  ELSE
    new_level := 'New Citizen';
  END IF;
  
  -- Update level if changed
  UPDATE public.profiles 
  SET level = new_level 
  WHERE user_id = target_user_id;
  
  RETURN json_build_object(
    'success', true, 
    'new_tokens', new_token_count, 
    'new_level', new_level,
    'action', action_type
  );
END;
$$;