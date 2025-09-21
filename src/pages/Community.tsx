import React, { useState } from 'react';
import { TrendingUp, MessageSquare, MapPin, Eye, Filter, Search, Heart, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Community = () => {
  const [selectedFilter, setSelectedFilter] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: MessageSquare },
    { id: 'nearby', label: 'Nearby', icon: MapPin },
    { id: 'resolved', label: 'Resolved', icon: Eye }
  ];

  const communityIssues = [
    {
      id: 1,
      title: 'Major Pothole on NH-48 Causing Accidents',
      location: 'National Highway 48, Gurgaon',
      category: 'Roads',
      status: 'assigned',
      priority: 'high',
      upvotes: 156,
      comments: 42,
      views: 2340,
      reportedBy: 'Rajesh Kumar',
      timeAgo: '4 hours ago',
      description: 'Deep pothole has formed after recent rains, already caused 3 minor accidents.',
      trending: true,
      images: 3,
      engagement: 'high',
      officerResponse: 'Roads Department has been notified. Repair scheduled for tomorrow.'
    },
    {
      id: 2,
      title: 'Street Lights Not Working in Residential Area',
      location: 'Sector 14, Block B, Noida',
      category: 'Electricity',
      status: 'pending',
      priority: 'medium',
      upvotes: 89,
      comments: 23,
      views: 1250,
      reportedBy: 'Priya Sharma',
      timeAgo: '8 hours ago',
      description: 'Multiple street lights are non-functional for the past week, creating safety concerns.',
      trending: false,
      images: 2,
      engagement: 'medium'
    },
    {
      id: 3,
      title: 'Water Supply Issue in Morning Hours',
      location: 'Green Park Extension, Delhi',
      category: 'Water Supply',
      status: 'resolved',
      priority: 'medium',
      upvotes: 67,
      comments: 15,
      views: 890,
      reportedBy: 'Anonymous Citizen',
      timeAgo: '1 day ago',
      description: 'Low water pressure during morning hours affecting daily routines.',
      trending: false,
      images: 1,
      engagement: 'low',
      resolution: 'Water pressure restored after pipeline maintenance.'
    },
    {
      id: 4,
      title: 'Garbage Dump Near School Creating Health Issues',
      location: 'MG Road, near Government School',
      category: 'Waste Management',
      status: 'assigned',
      priority: 'high',
      upvotes: 234,
      comments: 78,
      views: 3420,
      reportedBy: 'Community Group',
      timeAgo: '2 days ago',
      description: 'Illegal garbage dumping near school premises causing hygiene and health concerns for children.',
      trending: true,
      images: 4,
      engagement: 'high',
      officerResponse: 'Immediate cleanup ordered. Anti-dumping measures being implemented.'
    }
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-indian-green';
      default:
        return 'text-muted-foreground';
    }
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-amber-500 bg-amber-50';
      case 'low':
        return 'text-indian-green bg-indian-green-light';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const filteredIssues = communityIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (selectedFilter) {
      case 'trending':
        return matchesSearch && issue.trending;
      case 'recent':
        return matchesSearch;
      case 'nearby':
        // In a real app, this would filter by user's location
        return matchesSearch;
      case 'resolved':
        return matchesSearch && issue.status === 'resolved';
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <div className="max-w-md mx-auto px-4 space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Community Feed</h2>
          <p className="text-muted-foreground">
            See what issues your fellow citizens are reporting
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search community issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-card-border"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-xl p-1 mb-6">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={cn(
                  "flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                  selectedFilter === filter.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Community Issues */}
        <div className="space-y-4">
          {filteredIssues.map((issue, index) => (
            <Card key={issue.id} className="card-civic animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{issue.title}</h4>
                      {issue.trending && (
                        <Badge className="bg-red-100 text-red-700 text-xs px-2 py-0.5">
                          🔥 Trending
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{issue.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">{issue.category}</Badge>
                      <span className={`${getStatusBadge(issue.status)} text-xs`}>
                        {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getEngagementColor(issue.engagement)}`}>
                        {issue.engagement} engagement
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={getPriorityColor(issue.priority)}>
                      <span className="text-2xl">•</span>
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground">{issue.description}</p>

                {/* Officer Response */}
                {issue.officerResponse && (
                  <div className="p-3 bg-navy-light rounded-lg">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-primary mb-1">Official Response</p>
                        <p className="text-xs text-muted-foreground">{issue.officerResponse}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Resolution */}
                {issue.resolution && (
                  <div className="p-3 bg-indian-green-light rounded-lg">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-indian-green rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-indian-green mb-1">Resolution</p>
                        <p className="text-xs text-muted-foreground">{issue.resolution}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-primary">
                      <TrendingUp className="w-4 h-4" />
                      <span>{issue.upvotes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MessageSquare className="w-4 h-4" />
                      <span>{issue.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{issue.views}</span>
                    </div>
                    {issue.images && (
                      <span className="text-muted-foreground">📸 {issue.images}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{issue.timeAgo}</p>
                    <p className="text-xs text-muted-foreground">by {issue.reportedBy}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2 border-t border-card-border">
                  <Button variant="outline" size="sm" className="flex-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Upvote
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Comment
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <Card className="card-civic text-center py-12">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">No Issues Found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery 
                  ? `No issues match "${searchQuery}"`
                  : `No ${selectedFilter} issues available`
                }
              </p>
            </div>
          </Card>
        )}

        {/* Community Guidelines */}
        <Card className="card-civic bg-gradient-to-r from-saffron-light to-indian-green-light">
          <div className="text-center">
            <h4 className="font-semibold text-foreground mb-2">🤝 Community Guidelines</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Upvote genuine issues to help prioritize solutions</p>
              <p>• Comment constructively to add valuable information</p>
              <p>• Report false or spam content to maintain quality</p>
              <p>• Respect fellow citizens and government officials</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Community;