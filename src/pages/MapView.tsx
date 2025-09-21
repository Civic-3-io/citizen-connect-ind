import React, { useState } from 'react';
import { MapPin, Filter, Search, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import indiaMapPins from '@/assets/india-map-pins.png';

const MapView = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All Issues', count: 1589 },
    { id: 'road', label: 'Roads', count: 423 },
    { id: 'water', label: 'Water', count: 312 },
    { id: 'electric', label: 'Electricity', count: 287 },
    { id: 'waste', label: 'Waste', count: 234 },
  ];

  const mapIssues = [
    {
      id: 1,
      title: 'Broken Street Light',
      location: 'MG Road, Sector 14, Gurgaon',
      category: 'electric',
      status: 'assigned',
      priority: 'high',
      upvotes: 24,
      comments: 8,
      reportedBy: 'Rajesh Kumar',
      timeAgo: '2 hours ago',
      coordinates: { lat: 28.4595, lng: 77.0266 }
    },
    {
      id: 2,
      title: 'Water Logging Issue',
      location: 'Central Park, Delhi',
      category: 'water',
      status: 'pending',
      priority: 'medium',
      upvotes: 47,
      comments: 15,
      reportedBy: 'Priya Sharma',
      timeAgo: '5 hours ago',
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    {
      id: 3,
      title: 'Garbage Collection Delayed',
      location: 'Residency Road, Bangalore',
      category: 'waste',
      status: 'resolved',
      priority: 'low',
      upvotes: 12,
      comments: 3,
      reportedBy: 'Suresh Reddy',
      timeAgo: '1 day ago',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: 4,
      title: 'Pothole on Highway',
      location: 'NH-48, Mumbai-Pune Route',
      category: 'road',
      status: 'assigned',
      priority: 'high',
      upvotes: 89,
      comments: 32,
      reportedBy: 'Anonymous Citizen',
      timeAgo: '6 hours ago',
      coordinates: { lat: 19.0760, lng: 72.8777 }
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

  const filteredIssues = mapIssues.filter(issue => {
    const matchesFilter = selectedFilter === 'all' || issue.category === selectedFilter;
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <div className="max-w-md mx-auto px-4 space-y-4">
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search issues by location or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-card-border"
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className={cn(
                  "flex-shrink-0 transition-all duration-200",
                  selectedFilter === filter.id 
                    ? "btn-civic" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {filter.label} ({filter.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="card-civic">
          <div className="relative">
            <img 
              src={indiaMapPins} 
              alt="India Map with Issue Pins" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm font-medium">Showing {filteredIssues.length} issues</p>
              <p className="text-xs opacity-90">Tap pins to view details</p>
            </div>
            <Button className="absolute top-4 right-4 btn-civic">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Issues List */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Issues in Your Area ({filteredIssues.length})
          </h3>
          <div className="space-y-3">
            {filteredIssues.map((issue, index) => (
              <Card key={issue.id} className="card-civic animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">{issue.title}</h4>
                        <span className={getPriorityColor(issue.priority)}>
                          •
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" />
                        <span>{issue.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`${getStatusBadge(issue.status)}`}>
                        {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                      </span>
                    </div>
                  </div>

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
                        <span>View</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{issue.timeAgo}</p>
                      <p className="text-xs text-muted-foreground">by {issue.reportedBy}</p>
                    </div>
                  </div>

                  {/* Actions */}
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
                      <MapPin className="w-4 h-4 mr-1" />
                      Directions
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center py-4">
          <Button variant="outline" className="w-full">
            Load More Issues
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapView;