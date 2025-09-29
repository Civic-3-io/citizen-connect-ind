-- Use existing allowed types for new rewards
INSERT INTO public.rewards (title, description, cost_in_tokens, type, is_available) VALUES
('Ayushman Bharat Health Consultation', 'Free health consultancy under Ayushman Bharat scheme. Access to qualified doctors and health professionals.', 200, 'certificate', true),
('PM Ujjawala Yojana Benefits', 'Redeem benefits under PM Ujjawala Yojana for clean cooking fuel. Subsidized LPG connection and refills.', 300, 'certificate', true);