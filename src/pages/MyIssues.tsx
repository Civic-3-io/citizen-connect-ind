import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, MessageSquare, Eye, Calendar, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const MyIssues = () => {
  const [activeTab, setActiveTab] = useState('all');

  const userIssues = [
    {
      id: 'CIV-2024-001247',
      title: 'Broken Street Light on MG Road',
      category: 'Electricity',
      status: 'assigned',
      priority: 'high',
      submittedDate: '2024-09-20',
      lastUpdated: '2024-09-21',
      assignedOfficer: 'Rajesh Kumar (Electrical Dept.)',
      location: 'MG Road, Sector 14, Gurgaon',
      description: 'Street light has been non-functional for 3 days causing safety issues.',
      upvotes: 24,
      comments: 8,
      images: 2,
      estimatedResolution: '2-3 business days',
      updates: [
        { date: '2024-09-21', status: 'assigned', message: 'Issue assigned to Electrical Department' },
        { date: '2024-09-20', status: 'submitted', message: 'Issue reported successfully' }
      ]
    },
    {
      id: 'CIV-2024-001198',
      title: 'Pothole on Highway Service Road',
      category: 'Roads',
      status: 'resolved',
      priority: 'medium',
      submittedDate: '2024-09-18',
      lastUpdated: '2024-09-20',
      assignedOfficer: 'Priya Sharma (Roads Dept.)',
      location: 'Service Road, NH-48',
      description: 'Large pothole causing vehicle damage and traffic issues.',
      upvotes: 45,
      comments: 12,
      images: 3,
      resolution: 'Pothole filled and road surface restored.',
      updates: [
        { date: '2024-09-20', status: 'resolved', message: 'Issue resolved successfully' },
        { date: '2024-09-19', status: 'in-progress', message: 'Repair work in progress' },
        { date: '2024-09-18', status: 'assigned', message: 'Issue assigned to Roads Department' },
        { date: '2024-09-18', status: 'submitted', message: 'Issue reported successfully' }
      ]
    },
    {
      id: 'CIV-2024-001156',
      title: 'Water Logging in Residential Area',
      category: 'Drainage',
      status: 'pending',
      priority: 'low',
      submittedDate: '2024-09-15',
      lastUpdated: '2024-09-16',
      location: 'Green Park Extension, Block B',
      description: 'Water accumulation after recent rains, needs drainage improvement.',
      upvotes: 8,
      comments: 3,
      images: 1,
      updates: [
        { date: '2024-09-16', status: 'under-review', message: 'Issue under departmental review' },
        { date: '2024-09-15', status: 'submitted', message: 'Issue reported successfully' }
      ]
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Issues', count: userIssues.length },
    { id: 'pending', label: 'Pending', count: userIssues.filter(i => i.status === 'pending').length },
    { id: 'assigned', label: 'Assigned', count: userIssues.filter(i => i.status === 'assigned').length },
    { id: 'resolved', label: 'Resolved', count: userIssues.filter(i => i.status === 'resolved').length }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'badge-pending';
      case 'assigned':
      case 'in-progress':
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

  const filteredIssues = activeTab === 'all' 
    ? userIssues 
    : userIssues.filter(issue => 
        activeTab === 'assigned' 
          ? issue.status === 'assigned' || issue.status === 'in-progress'
          : issue.status === activeTab
      );

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <div className="max-w-md mx-auto px-4 space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">My Issues</h2>
          <p className="text-muted-foreground">Track your reported civic issues</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="card-civic text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-saffron">{userIssues.length}</p>
              <p className="text-xs text-muted-foreground">Total Reports</p>
            </div>
          </Card>
          <Card className="card-civic text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-indian-green">
                {userIssues.filter(i => i.status === 'resolved').length}
              </p>
              <p className="text-xs text-muted-foreground">Resolved</p>
            </div>
          </Card>
          <Card className="card-civic text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">156</p>
              <p className="text-xs text-muted-foreground">Points Earned</p>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-xl p-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.map((issue, index) => (
            <Card key={issue.id} className="card-civic animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{issue.title}</h4>
                      <span className={getPriorityColor(issue.priority)}>•</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">ID: {issue.id}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="text-xs">{issue.category}</Badge>
                      <span className={`${getStatusBadge(issue.status)} text-xs`}>
                        {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(issue.submittedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Location & Description */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{issue.location}</p>
                  <p className="text-sm text-foreground">{issue.description}</p>
                </div>

                {/* Officer Assignment */}
                {issue.assignedOfficer && (
                  <div className="flex items-center space-x-2 p-3 bg-navy-light rounded-lg">
                    <User className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-primary">Assigned Officer</p>
                      <p className="text-xs text-muted-foreground">{issue.assignedOfficer}</p>
                    </div>
                  </div>
                )}

                {/* Resolution Info */}
                {issue.status === 'resolved' && issue.resolution && (
                  <div className="p-3 bg-indian-green-light rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-indian-green" />
                      <p className="text-sm font-medium text-indian-green">Resolved</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{issue.resolution}</p>
                  </div>
                )}

                {/* Estimated Resolution */}
                {issue.estimatedResolution && issue.status !== 'resolved' && (
                  <div className="p-3 bg-saffron-light rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-saffron" />
                      <div>
                        <p className="text-sm font-medium text-saffron">Estimated Resolution</p>
                        <p className="text-xs text-muted-foreground">{issue.estimatedResolution}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-card-border">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-primary">
                      <Eye className="w-4 h-4" />
                      <span>{issue.upvotes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MessageSquare className="w-4 h-4" />
                      <span>{issue.comments}</span>
                    </div>
                    {issue.images && (
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <span>📸 {issue.images}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      Last updated: {new Date(issue.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Latest Update */}
                {issue.updates && issue.updates.length > 0 && (
                  <div className="pt-2 border-t border-card-border">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Latest Update</p>
                        <p className="text-xs text-muted-foreground">
                          {issue.updates[0].message} • {new Date(issue.updates[0].date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Track Progress
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
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">No Issues Found</h3>
              <p className="text-sm text-muted-foreground">
                {activeTab === 'all' 
                  ? "You haven't reported any issues yet."
                  : `No ${activeTab} issues found.`
                }
              </p>
              <Button className="btn-saffron mt-4">
                Report Your First Issue
              </Button>
            </div>
          </Card>
        )}

        {/* Points & Rewards Info */}
        <Card className="card-civic bg-gradient-to-r from-saffron-light to-indian-green-light">
          <div className="text-center">
            <h4 className="font-semibold text-foreground mb-2">🎯 Civic Points System</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Earn points for verified reports and community engagement
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <div className="text-center">
                <p className="font-semibold text-saffron">+10</p>
                <p className="text-xs text-muted-foreground">Valid Report</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-indian-green">+5</p>
                <p className="text-xs text-muted-foreground">Community Upvote</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-primary">+20</p>
                <p className="text-xs text-muted-foreground">Issue Resolved</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyIssues;