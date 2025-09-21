import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Plus, FileText, Info, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import ashokaChakra from '@/assets/ashoka-chakra.png';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home', key: 'home' },
    { path: '/map', icon: Map, label: 'Map', key: 'map' },
    { path: '/report', icon: Plus, label: 'Report', key: 'report', isMainAction: true },
    { path: '/my-issues', icon: FileText, label: 'My Issues', key: 'my-issues' },
    { path: '/offline', icon: WifiOff, label: 'Offline', key: 'offline' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Header */}
      <header className="gradient-header sticky top-0 z-50 px-4 py-3 shadow-civic">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <img src={ashokaChakra} alt="Government of India" className="w-8 h-8" />
            <div>
              <h1 className="text-white font-semibold text-lg">Civic Connect</h1>
              <p className="text-navy-light text-xs">Government of India</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className="w-5 h-5 text-indian-green" />
            <span className="text-xs text-white">Online</span>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border shadow-lg z-50">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200",
                    item.isMainAction
                      ? "btn-saffron transform hover:scale-105 -mt-4 shadow-lg"
                      : active
                      ? "text-primary bg-navy-light"
                      : "text-muted-foreground hover:text-primary hover:bg-accent"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 mb-1",
                    item.isMainAction ? "w-6 h-6" : ""
                  )} />
                  <span className={cn(
                    "text-xs font-medium",
                    item.isMainAction ? "text-white" : ""
                  )}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* About Us Link */}
      <Link
        to="/about"
        className={cn(
          "fixed top-4 right-4 z-40 p-2 rounded-full transition-all duration-200",
          isActive('/about') 
            ? "bg-saffron text-white shadow-lg" 
            : "bg-white/90 text-primary hover:bg-saffron hover:text-white shadow-md"
        )}
      >
        <Info className="w-5 h-5" />
      </Link>
    </>
  );
};

export default Navigation;