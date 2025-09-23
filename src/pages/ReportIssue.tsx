import React, { useState } from 'react';
import { Camera, MapPin, Mic, AlertTriangle, Send, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    location: '',
    anonymous: false,
    repeated: false
  });
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'road', label: 'Roads & Traffic', icon: '🚗', color: 'bg-blue-50 text-blue-700' },
    { id: 'water', label: 'Water Supply', icon: '💧', color: 'bg-cyan-50 text-cyan-700' },
    { id: 'electric', label: 'Electricity', icon: '⚡', color: 'bg-yellow-50 text-yellow-700' },
    { id: 'waste', label: 'Waste Management', icon: '🗑️', color: 'bg-green-50 text-green-700' },
    { id: 'drainage', label: 'Drainage', icon: '🌊', color: 'bg-teal-50 text-teal-700' },
    { id: 'other', label: 'Other', icon: '📋', color: 'bg-gray-50 text-gray-700' }
  ];

  const priorities = [
    { id: 'low', label: 'Low Priority', color: 'text-indian-green' },
    { id: 'medium', label: 'Medium Priority', color: 'text-amber-600' },
    { id: 'high', label: 'High Priority', color: 'text-red-600' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 3)); // Max 3 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you'd reverse geocode this
          handleInputChange('location', `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          toast.success("Location Added", {
            description: "GPS coordinates have been added to your report.",
          });
        },
        (error) => {
          toast.error("Location Error", {
            description: "Unable to get your location. Please enter manually.",
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.description) {
      toast.error("Incomplete Form", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Issue Reported Successfully! 🇮🇳", {
      description: "Your report has been submitted to the concerned authorities. Track ID: CIV-2024-001247",
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      location: '',
      anonymous: false,
      repeated: false
    });
    setImages([]);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <div className="max-w-md mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Report Civic Issue</h2>
          <p className="text-muted-foreground">Help us improve your community by reporting issues</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-foreground">
              Issue Title *
            </Label>
            <Input
              id="title"
              placeholder="e.g., Broken street light on MG Road"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Category Selection */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">
              Category *
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleInputChange('category', category.id)}
                  className={cn(
                    "p-3 rounded-xl border-2 transition-all duration-200 text-left",
                    formData.category === category.id
                      ? "border-primary bg-navy-light text-primary shadow-md"
                      : "border-card-border hover:border-primary/50 hover:bg-accent"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium">{category.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Priority Level */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">
              Priority Level
            </Label>
            <div className="flex space-x-3">
              {priorities.map((priority) => (
                <button
                  key={priority.id}
                  type="button"
                  onClick={() => handleInputChange('priority', priority.id)}
                  className={cn(
                    "flex-1 p-3 rounded-xl border-2 transition-all duration-200 text-center",
                    formData.priority === priority.id
                      ? "border-primary bg-navy-light text-primary shadow-md"
                      : "border-card-border hover:border-primary/50"
                  )}
                >
                  <div className={priority.color}>
                    <AlertTriangle className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs font-medium">{priority.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-sm font-medium text-foreground">
              Location
            </Label>
            <div className="mt-1 flex space-x-2">
              <Input
                id="location"
                placeholder="Enter location or use GPS"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                className="px-3"
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Provide detailed description of the issue..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="mt-1 min-h-[100px]"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">
              Add Photos (Max 3)
            </Label>
            <div className="space-y-3">
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-card-border rounded-xl hover:border-primary/50 cursor-pointer transition-colors">
                <div className="text-center">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Tap to add photos
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              
              {images.length > 0 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Options */}
          <Card className="card-civic">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={formData.anonymous}
                  onCheckedChange={(checked) => handleInputChange('anonymous', !!checked)}
                />
                <Label htmlFor="anonymous" className="text-sm text-foreground">
                  Submit anonymously
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="repeated"
                  checked={formData.repeated}
                  onCheckedChange={(checked) => handleInputChange('repeated', !!checked)}
                />
                <Label htmlFor="repeated" className="text-sm text-foreground">
                  This is a repeated issue
                </Label>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-saffron h-12 text-lg font-semibold"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Submit Report</span>
              </div>
            )}
          </Button>
        </form>

        {/* Info Card */}
        <Card className="card-civic bg-navy-light">
          <div className="text-center">
            <h4 className="font-semibold text-primary mb-2">🇮🇳 Serving the Nation</h4>
            <p className="text-sm text-muted-foreground">
              Your report will be reviewed by local authorities within 24-48 hours. 
              Track your submission in the "My Issues" section.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportIssue;