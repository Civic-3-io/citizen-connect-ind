import React from 'react';
import { Shield, Users, MapPin, Award, Phone, Mail, Globe, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ashokaChakra from '@/assets/ashoka-chakra.png';
import govtBuilding from '@/assets/govt-building.png';

const About = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Real-time Reporting',
      description: 'Report civic issues with GPS location and photo evidence'
    },
    {
      icon: Users,
      title: 'Community Engagement',
      description: 'Upvote and comment on issues to prioritize solutions'
    },
    {
      icon: Shield,
      title: 'Government Integration',
      description: 'Direct connection with local authorities and departments'
    },
    {
      icon: Award,
      title: 'Civic Rewards',
      description: 'Earn points for verified reports and community participation'
    }
  ];

  const stats = [
    { label: 'Cities Covered', value: '150+' },
    { label: 'Issues Resolved', value: '25,000+' },
    { label: 'Active Citizens', value: '100K+' },
    { label: 'Government Partners', value: '50+' }
  ];

  const departments = [
    'Municipal Corporation',
    'Public Works Department',
    'Electricity Board',
    'Water Supply Department',
    'Traffic Police',
    'Waste Management'
  ];

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <div className="max-w-md mx-auto px-4 space-y-6">
        {/* Header with Government Branding */}
        <div className="text-center">
          <div className="relative mb-6">
            <img 
              src={govtBuilding} 
              alt="Government Building" 
              className="w-24 h-24 mx-auto mb-4 opacity-90"
            />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <img src={ashokaChakra} alt="Ashoka Chakra" className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Civic Connect</h1>
          <p className="text-lg text-primary font-semibold mb-2">Government of India</p>
          <p className="text-muted-foreground">
            Official Digital Platform for Civic Issue Reporting
          </p>
          <div className="gradient-tricolor h-1 w-16 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Mission Statement */}
        <Card className="card-civic bg-gradient-to-r from-saffron-light to-indian-green-light">
          <div className="text-center">
            <h3 className="font-semibold text-foreground mb-3">🇮🇳 Our Mission</h3>
            <p className="text-sm text-muted-foreground">
              "Empowering every citizen to contribute towards building a cleaner, 
              safer, and more efficient India through technology-enabled civic participation."
            </p>
          </div>
        </Card>

        {/* Key Features */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Key Features</h3>
          <div className="grid grid-cols-1 gap-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-civic animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Platform Impact</h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <Card key={index} className="card-civic text-center animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Connected Departments */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Connected Departments</h3>
          <Card className="card-civic">
            <div className="flex flex-wrap gap-2">
              {departments.map((dept, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {dept}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* App Information */}
        <Card className="card-civic">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">App Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="text-foreground">2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="text-foreground">September 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform</span>
                <span className="text-foreground">Android, iOS, Web</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Languages</span>
                <span className="text-foreground">Hindi, English, +16 more</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Contact & Support</h3>
          <div className="space-y-3">
            <Card className="card-civic">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Helpline</p>
                  <p className="text-sm text-muted-foreground">1800-xxx-xxxx (Toll Free)</p>
                </div>
              </div>
            </Card>
            
            <Card className="card-civic">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@civicconnect.gov.in</p>
                </div>
              </div>
            </Card>
            
            <Card className="card-civic">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Official Website</p>
                  <p className="text-sm text-muted-foreground">www.civicconnect.gov.in</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-between">
            Privacy Policy
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            Terms of Service
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            Open Source Licenses
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {/* Government Footer */}
        <Card className="card-civic gradient-header text-white">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <img src={ashokaChakra} alt="Ashoka Chakra" className="w-6 h-6" />
              <p className="font-semibold">Government of India</p>
            </div>
            <p className="text-xs opacity-90">
              A Digital India Initiative • Ministry of Electronics and IT
            </p>
            <p className="text-xs opacity-75 mt-2">
              "Technology for Transparent Governance"
            </p>
          </div>
        </Card>

        {/* App Rating */}
        <Card className="card-civic text-center">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Rate Civic Connect</h4>
            <div className="flex justify-center space-x-1 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-amber-400">⭐</span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              4.8/5 based on 50K+ reviews
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Write a Review
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;