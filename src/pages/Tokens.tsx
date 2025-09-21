import React from 'react';
import { Coins, Gift, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Tokens = () => {
  const recentEarnings = [
    { id: 1, reason: "Pothole Report - Resolved", tokens: 100, date: "2 days ago", status: "completed" },
    { id: 2, reason: "Street Light Issue", tokens: 75, date: "5 days ago", status: "completed" },
    { id: 3, reason: "Garbage Collection Report", tokens: 50, date: "1 week ago", status: "completed" },
    { id: 4, reason: "Water Leakage Report", tokens: 80, date: "2 weeks ago", status: "completed" },
  ];

  const rewards = [
    { id: 1, title: "Bus Pass - Monthly", cost: 500, description: "Free monthly bus pass", available: true },
    { id: 2, title: "Certificate of Appreciation", cost: 200, description: "Digital certificate", available: true },
    { id: 3, title: "Metro Card Credits", cost: 1000, description: "₹100 metro credits", available: true },
    { id: 4, title: "Government Office Priority", cost: 2000, description: "Fast-track service", available: false },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Token Balance */}
      <Card className="mb-6 bg-gradient-civic text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <Coins className="w-12 h-12 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">1,250 Tokens</h1>
            <p className="text-white/80 mb-4">Total earnings from civic contributions</p>
            
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Next Level</span>
                <span>350 tokens to go</span>
              </div>
              <Progress value={78} className="h-2" />
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
              <span>Recent Earnings</span>
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
              <span>Available Rewards</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewards.map((reward) => (
                <div key={reward.id} className={`p-3 rounded-lg border ${reward.available ? 'bg-background' : 'bg-muted/50 opacity-60'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{reward.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-saffron" />
                      <span className="font-bold">{reward.cost}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{reward.description}</p>
                  <Button 
                    size="sm" 
                    className="w-full" 
                    variant={reward.available ? "default" : "secondary"}
                    disabled={!reward.available || reward.cost > 1250}
                  >
                    {reward.available ? (reward.cost <= 1250 ? 'Redeem' : 'Insufficient Tokens') : 'Coming Soon'}
                    {reward.available && reward.cost <= 1250 && <ArrowRight className="w-4 h-4 ml-2" />}
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
            <span>How to Earn Tokens</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-saffron/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-saffron">50</span>
              </div>
              <h3 className="font-medium mb-1">Report Issues</h3>
              <p className="text-xs text-muted-foreground">Earn tokens for each valid report</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-indian-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-indian-green">100</span>
              </div>
              <h3 className="font-medium mb-1">Issue Resolution</h3>
              <p className="text-xs text-muted-foreground">Bonus when your report gets resolved</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-primary">25</span>
              </div>
              <h3 className="font-medium mb-1">Community Engagement</h3>
              <p className="text-xs text-muted-foreground">Upvote and comment on issues</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tokens;