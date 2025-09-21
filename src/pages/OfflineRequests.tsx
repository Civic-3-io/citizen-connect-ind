import React, { useState } from 'react';
import { WifiOff, Upload, Trash2, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const OfflineRequests = () => {
  const { toast } = useToast();
  const [syncing, setSyncing] = useState(false);

  // Mock offline stored requests
  const [offlineRequests, setOfflineRequests] = useState([
    {
      id: 'offline-001',
      title: 'Street Light Not Working',
      category: 'Electricity',
      description: 'The street light near the park has been off for 2 days',
      location: 'Park Street, Sector 12',
      priority: 'high',
      images: ['offline_image_1.jpg'],
      timestamp: '2024-09-21T08:30:00',
      status: 'pending_sync',
      size: '2.3 MB'
    },
    {
      id: 'offline-002',
      title: 'Pothole on Main Road',
      category: 'Roads',
      description: 'Large pothole causing traffic issues and vehicle damage',
      location: 'Main Road, opposite City Mall',
      priority: 'medium',
      images: ['offline_image_2.jpg', 'offline_image_3.jpg'],
      timestamp: '2024-09-20T16:45:00',
      status: 'pending_sync',
      size: '4.1 MB'
    },
    {
      id: 'offline-003',
      title: 'Garbage Overflow',
      category: 'Waste Management',
      description: 'Garbage bin overflowing for past 3 days',
      location: 'Residency Road, Block A',
      priority: 'low',
      images: ['offline_image_4.jpg'],
      timestamp: '2024-09-20T12:15:00',
      status: 'synced',
      syncedAt: '2024-09-21T09:15:00',
      size: '1.8 MB'
    }
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending_sync':
        return { 
          icon: Clock, 
          color: 'text-amber-600', 
          bg: 'bg-amber-50',
          label: 'Pending Sync'
        };
      case 'syncing':
        return { 
          icon: Upload, 
          color: 'text-blue-600', 
          bg: 'bg-blue-50',
          label: 'Syncing...'
        };
      case 'synced':
        return { 
          icon: CheckCircle, 
          color: 'text-indian-green', 
          bg: 'bg-indian-green-light',
          label: 'Synced'
        };
      case 'error':
        return { 
          icon: AlertCircle, 
          color: 'text-red-600', 
          bg: 'bg-red-50',
          label: 'Sync Failed'
        };
      default:
        return { 
          icon: Clock, 
          color: 'text-muted-foreground', 
          bg: 'bg-muted',
          label: 'Unknown'
        };
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

  const handleSyncAll = async () => {
    setSyncing(true);
    const pendingRequests = offlineRequests.filter(req => req.status === 'pending_sync');
    
    if (pendingRequests.length === 0) {
      toast({
        title: "Nothing to Sync",
        description: "All offline requests have already been synced.",
      });
      setSyncing(false);
      return;
    }

    // Simulate syncing each request
    for (let i = 0; i < pendingRequests.length; i++) {
      const request = pendingRequests[i];
      
      // Update status to syncing
      setOfflineRequests(prev => 
        prev.map(req => 
          req.id === request.id 
            ? { ...req, status: 'syncing' }
            : req
        )
      );

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update status to synced
      setOfflineRequests(prev => 
        prev.map(req => 
          req.id === request.id 
            ? { ...req, status: 'synced', syncedAt: new Date().toISOString() }
            : req
        )
      );
    }

    setSyncing(false);
    toast({
      title: "Sync Complete! 🇮🇳",
      description: `${pendingRequests.length} offline requests have been submitted successfully.`,
    });
  };

  const handleDeleteRequest = (requestId: string) => {
    setOfflineRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Request Deleted",
      description: "Offline request has been removed from storage.",
    });
  };

  const pendingCount = offlineRequests.filter(req => req.status === 'pending_sync').length;
  const totalSize = offlineRequests
    .filter(req => req.status === 'pending_sync')
    .reduce((total, req) => total + parseFloat(req.size), 0)
    .toFixed(1);

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <div className="max-w-md mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-navy-light rounded-full flex items-center justify-center mx-auto mb-4">
            <WifiOff className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Offline Requests</h2>
          <p className="text-muted-foreground">
            Manage reports saved when offline
          </p>
        </div>

        {/* Sync Summary */}
        <Card className="card-civic">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                {pendingCount} Pending Requests
              </h3>
              <p className="text-sm text-muted-foreground">
                Total size: {totalSize} MB
              </p>
            </div>
            <Button
              onClick={handleSyncAll}
              disabled={syncing || pendingCount === 0}
              className="btn-saffron"
            >
              {syncing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Syncing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Sync All</span>
                </div>
              )}
            </Button>
          </div>
        </Card>

        {/* Connection Status */}
        <Card className="card-civic bg-indian-green-light">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-indian-green rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-indian-green">Connected</p>
              <p className="text-xs text-muted-foreground">
                Ready to sync offline requests
              </p>
            </div>
          </div>
        </Card>

        {/* Offline Requests List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Stored Requests ({offlineRequests.length})
          </h3>
          
          {offlineRequests.map((request, index) => {
            const statusInfo = getStatusInfo(request.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <Card key={request.id} className="card-civic animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-foreground">{request.title}</h4>
                        <span className={getPriorityColor(request.priority)}>•</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">{request.category}</Badge>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${statusInfo.bg} ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusInfo.label}</span>
                        </div>
                      </div>
                    </div>
                    {request.status === 'pending_sync' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRequest(request.id)}
                        className="text-destructive hover:text-destructive p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{request.location}</p>
                    <p className="text-sm text-foreground">{request.description}</p>
                  </div>

                  {/* Media & Size Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      {request.images && (
                        <span className="text-muted-foreground">
                          📸 {request.images.length} photo{request.images.length > 1 ? 's' : ''}
                        </span>
                      )}
                      <span className="text-muted-foreground">{request.size}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {new Date(request.timestamp).toLocaleString()}
                    </span>
                  </div>

                  {/* Sync Status */}
                  {request.status === 'synced' && request.syncedAt && (
                    <div className="p-3 bg-indian-green-light rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-indian-green" />
                        <div>
                          <p className="text-sm font-medium text-indian-green">Successfully Synced</p>
                          <p className="text-xs text-muted-foreground">
                            Synced on {new Date(request.syncedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions for pending requests */}
                  {request.status === 'pending_sync' && (
                    <div className="flex space-x-2 pt-2 border-t border-card-border">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Upload className="w-4 h-4 mr-1" />
                        Sync Now
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit Request
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {offlineRequests.length === 0 && (
          <Card className="card-civic text-center py-12">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <WifiOff className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">No Offline Requests</h3>
              <p className="text-sm text-muted-foreground">
                Reports submitted while offline will appear here for syncing when connected.
              </p>
            </div>
          </Card>
        )}

        {/* Info Card */}
        <Card className="card-civic bg-navy-light">
          <div className="space-y-3">
            <h4 className="font-semibold text-primary mb-2">📡 How Offline Mode Works</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Reports are automatically saved when offline</p>
              <p>• Media files are compressed for efficient storage</p>
              <p>• Auto-sync when connection is restored</p>
              <p>• All data is encrypted and secure</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OfflineRequests;