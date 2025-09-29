import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5e9798c7d0484d3db283b7f997d708ac',
  appName: 'citizen-connect-ind',
  webDir: 'dist',
  server: {
    url: 'https://5e9798c7-d048-4d3d-b283-b7f997d708ac.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;