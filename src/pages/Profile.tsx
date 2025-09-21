import React from 'react';
import { User, Phone, Mail, MapPin, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-civic rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary">Rahul Sharma</h1>
              <p className="text-muted-foreground">Active Citizen</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-indian-green/20 text-indian-green">
                  Verified
                </Badge>
                <Badge variant="outline" className="border-saffron text-saffron">
                  Level 3
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>rahul.sharma@email.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>Connaught Place, New Delhi, Delhi - 110001</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Member since January 2024</span>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-saffron">15</div>
              <div className="text-sm text-muted-foreground">Issues Reported</div>
            </div>
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-indian-green">12</div>
              <div className="text-sm text-muted-foreground">Issues Resolved</div>
            </div>
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">1,250</div>
              <div className="text-sm text-muted-foreground">Tokens Earned</div>
            </div>
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">85%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button className="w-full btn-saffron">
          Edit Profile
        </Button>
        <Button variant="outline" className="w-full">
          Privacy Settings
        </Button>
      </div>
    </div>
  );
};

export default Profile;