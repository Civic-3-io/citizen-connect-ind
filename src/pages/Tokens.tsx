import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Coins, Gift, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Reward {
  id: string;
  title: string;
  description: string;
  cost_in_tokens: number;
  type: string;
  is_available: boolean;
}

interface RecentEarning {
  id: number;
  reason: string;
  tokens: number;
  date: string;
  status: string;
}

const Tokens = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [userTokens, setUserTokens] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<string>('New Citizen');
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  const recentEarnings: RecentEarning[] = [
    { id: 1, reason: "Pothole Report - Resolved", tokens: 100, date: "2 days ago", status: "completed" },
    { id: 2, reason: "Street Light Issue", tokens: 75, date: "5 days ago", status: "completed" },
    { id: 3, reason: "Garbage Collection Report", tokens: 50, date: "1 week ago", status: "completed" },
    { id: 4, reason: "Water Leakage Report", tokens: 80, date: "2 weeks ago", status: "completed" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Fetch user profile data
          const { data: profileData } = await supabase
            .from('profiles')
            .select('tokens, level')
            .eq('user_id', user.id)
            .single();

          if (profileData) {
            setUserTokens(profileData.tokens || 0);
            setUserLevel(profileData.level || 'New Citizen');
          }

          // Fetch available rewards
          const { data: rewardsData } = await supabase
            .from('rewards')
            .select('*')
            .order('cost_in_tokens');

          if (rewardsData) {
            setRewards(rewardsData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleRedeem = async (reward: Reward) => {
    if (!user) return;
    
    try {
      const { data } = await supabase.rpc('redeem_reward', { 
        reward_uuid: reward.id 
      });

      const result = data as any; // Type assertion for RPC response

      if (result?.success) {
        setUserTokens(result.remaining_tokens);
        toast.success(t('rewardRedeemed'));
      } else {
        toast.error(result?.error || t('errorOccurred'));
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      toast.error(t('errorOccurred'));
    }
  };

  const getProgressToNextLevel = () => {
    if (userTokens >= 5000) return 100;
    if (userTokens >= 2000) return ((userTokens - 2000) / 3000) * 100;
    if (userTokens >= 500) return ((userTokens - 500) / 1500) * 100;
    return (userTokens / 500) * 100;
  };

  const getTokensToNextLevel = () => {
    if (userTokens >= 5000) return 0;
    if (userTokens >= 2000) return 5000 - userTokens;
    if (userTokens >= 500) return 2000 - userTokens;
    return 500 - userTokens;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Token Balance */}
      <Card className="mb-6 bg-gradient-to-br from-saffron to-saffron-dark text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <Coins className="w-12 h-12 mx-auto mb-4 text-white" />
            <h1 className="text-3xl font-bold mb-2 text-white">{userTokens.toLocaleString()} Tokens</h1>
            <p className="text-white mb-4">Total earnings from civic contributions</p>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex justify-between text-sm mb-2 text-white">
                <span>Next Level:</span>
                <span>{getTokensToNextLevel()} tokens to go</span>
              </div>
              <Progress value={getProgressToNextLevel()} className="h-2 bg-white/20" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Earnings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>{t('recentEarnings')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEarnings.map((earning) => (
                <div key={earning.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{earning.reason}</p>
                    <p className="text-xs text-muted-foreground">{earning.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-indian-green">+{earning.tokens}</div>
                    <Badge variant="secondary" className="text-xs">
                      {earning.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="w-5 h-5" />
              <span>{t('availableRewards')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewards.map((reward) => (
                <div key={reward.id} className={`p-3 rounded-lg border ${reward.is_available ? 'bg-background' : 'bg-muted/50 opacity-60'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{reward.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-saffron" />
                      <span className="font-bold">{reward.cost_in_tokens}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{reward.description}</p>
                  <Button 
                    size="sm" 
                    className="w-full" 
                    variant={reward.is_available ? "default" : "secondary"}
                    disabled={!reward.is_available || reward.cost_in_tokens > userTokens}
                    onClick={() => handleRedeem(reward)}
                  >
                    {reward.is_available ? (reward.cost_in_tokens <= userTokens ? t('redeem') : t('insufficientTokens')) : t('comingSoon')}
                    {reward.is_available && reward.cost_in_tokens <= userTokens && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Token Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>{t('howToEarnTokens')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-saffron/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-saffron">50</span>
              </div>
              <h3 className="font-medium mb-1">{t('reportIssues')}</h3>
              <p className="text-xs text-muted-foreground">{t('earnTokensForEachValidReport')}</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-indian-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-indian-green">100</span>
              </div>
              <h3 className="font-medium mb-1">{t('issueResolution')}</h3>
              <p className="text-xs text-muted-foreground">{t('bonusWhenReportResolved')}</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-primary">25</span>
              </div>
              <h3 className="font-medium mb-1">{t('communityEngagement')}</h3>
              <p className="text-xs text-muted-foreground">{t('upvoteAndComment')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tokens;