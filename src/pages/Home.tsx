import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, MapPin, Camera, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import citizenReporting from '@/assets/citizen-reporting.png';

const Home = () => {
  const stats = [
    { label: 'Open Issues', value: '1,247', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Resolved', value: '5,932', icon: CheckCircle, color: 'text-indian-green', bg: 'bg-indian-green-light' },
    { label: 'In Progress', value: '342', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Your Points', value: '156', icon: TrendingUp, color: 'text-saffron', bg: 'bg-saffron-light' },
  ];

  const quickActions = [
    { label: 'Report Issue', icon: Camera, path: '/report', primary: true },
    { label: 'View Map', icon: MapPin, path: '/map' },
    { label: 'Community', icon: MessageSquare, path: '/community' },
  ];

  const recentIssues = [
    {
      id: 1,
      title: 'Broken Street Light',
      location: 'MG Road, Sector 14',
      status: 'assigned',
      timeAgo: '2 hours ago',
      upvotes: 12
    },
    {
      id: 2,
      title: 'Pothole on Main Street',
      location: 'Central Avenue',
      status: 'resolved',
      timeAgo: '1 day ago',
      upvotes: 28
    },
    {
      id: 3,
      title: 'Garbage Collection Missed',
      location: 'Residential Area B',
      status: 'pending',
      timeAgo: '3 hours ago',
      upvotes: 7
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'badge-pending';
      case 'assigned':
        return 'badge-assigned';
      case 'resolved':
        return 'badge-resolved';
      default:
        return 'badge-pending';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <div className="max-w-md mx-auto px-4 space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-6">
          <img 
            src={citizenReporting} 
            alt="Citizen Reporting" 
            className="w-32 h-32 mx-auto mb-4 opacity-90"
          />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome to Civic Connect
          </h2>
          <p className="text-muted-foreground">
            Report issues, track progress, and help build a better India
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="card-civic text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="flex gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.path} className="flex-1">
                  <Button
                    className={cn(
                      "w-full h-20 flex flex-col items-center justify-center space-y-2 animate-slide-up",
                      action.primary ? "btn-saffron" : "btn-civic"
                    )}
                    style={{ animationDelay: `${(index + 4) * 100}ms` }}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Issues */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Issues</h3>
            <Link to="/map" className="text-primary text-sm font-medium hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentIssues.map((issue, index) => (
              <Card key={issue.id} className="card-civic animate-fade-in" style={{ animationDelay: `${(index + 7) * 100}ms` }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{issue.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{issue.location}</p>
                    <div className="flex items-center space-x-4">
                      <span className={`${getStatusBadge(issue.status)}`}>
                        {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">{issue.timeAgo}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-primary">
                      <TrendingUp className="w-4 h-4" />
                      <span>{issue.upvotes}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Citizen Engagement Message */}
        <Card className="card-civic text-center bg-gradient-to-r from-saffron-light to-indian-green-light animate-fade-in" style={{ animationDelay: '1000ms' }}>
          <div className="p-2">
            <h4 className="font-semibold text-foreground mb-2">🇮🇳 Every Report Counts</h4>
            <p className="text-sm text-muted-foreground">
              Your civic participation helps build a stronger, cleaner India. Thank you for being an active citizen!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;