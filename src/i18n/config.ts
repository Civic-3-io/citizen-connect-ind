import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Common
      welcomeBack: "Welcome Back",
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      submit: "Submit",
      search: "Search",
      filter: "Filter",
      
      // Auth
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign Out",
      email: "Email",
      password: "Password",
      fullName: "Full Name",
      phone: "Phone Number",
      address: "Address",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      
      // Navigation
      home: "Home",
      report: "Report",
      myIssues: "My Issues",
      community: "Community",
      about: "About",
      profile: "Profile",
      rewards: "Rewards",
      offline: "Offline",
      
      // Home Page
      recentIssues: "Recent Issues",
      quickActions: "Quick Actions",
      reportIssue: "Report Issue",
      viewMap: "View Map",
      checkRewards: "Check Rewards",
      
      // Report Issue
      reportCivicIssue: "Report Civic Issue",
      issueTitle: "Issue Title",
      description: "Description",
      location: "Location",
      category: "Category",
      priority: "Priority",
      attachPhotos: "Attach Photos",
      reportAnonymously: "Report Anonymously",
      submitReport: "Submit Report",
      low: "Low",
      medium: "Medium",
      high: "High",
      
      // Profile
      contactInformation: "Contact Information",
      joinedOn: "Joined on",
      achievements: "Achievements",
      issuesReported: "Issues Reported",
      issuesResolved: "Issues Resolved",
      tokensEarned: "Tokens Earned",
      editProfile: "Edit Profile",
      privacySettings: "Privacy Settings",
      
      // Tokens/Rewards
      tokens: "Tokens",
      totalEarnings: "Total earnings from civic contributions",
      nextLevel: "Next Level",
      tokensToGo: "tokens to go",
      recentEarnings: "Recent Earnings",
      availableRewards: "Available Rewards",
      redeem: "Redeem",
      insufficientTokens: "Insufficient Tokens",
      comingSoon: "Coming Soon",
      howToEarnTokens: "How to Earn Tokens",
      reportIssues: "Report Issues",
      issueResolution: "Issue Resolution",
      communityEngagement: "Community Engagement",
      earnTokensForEachValidReport: "Earn tokens for each valid report",
      bonusWhenReportResolved: "Bonus when your report gets resolved",
      upvoteAndComment: "Upvote and comment on issues",
      
      // About
      aboutCivicConnect: "About Civic Connect",
      makingCommunitiesBetter: "Making Communities Better Through Technology",
      ourMission: "Our Mission",
      ourValues: "Our Values",
      getInvolved: "Get Involved",
      
      // Issue Status
      pending: "Pending",
      assigned: "Assigned", 
      inProgress: "In Progress",
      resolved: "Resolved",
      
      // Categories
      pothole: "Pothole",
      streetLight: "Street Light",
      garbageCollection: "Garbage Collection",
      waterLeakage: "Water Leakage",
      trafficSignal: "Traffic Signal",
      publicTransport: "Public Transport",
      parksRecreation: "Parks & Recreation",
      other: "Other",
      
      // Messages
      signInSuccess: "Successfully signed in!",
      signUpSuccess: "Account created successfully!",
      signOutSuccess: "Successfully signed out!",
      profileUpdated: "Profile updated successfully!",
      rewardRedeemed: "Reward redeemed successfully!",
      errorOccurred: "An error occurred. Please try again.",
      
      // App Title
      appTitle: "Civic Connect"
    }
  },
  hi: {
    translation: {
      // Common
      welcomeBack: "वापसी पर स्वागत है",
      loading: "लोड हो रहा है...",
      save: "सेव करें",
      cancel: "रद्द करें",
      edit: "संपादित करें",
      delete: "हटाएं",
      confirm: "पुष्टि करें",
      submit: "जमा करें",
      search: "खोजें",
      filter: "फिल्टर",
      
      // Auth
      signIn: "साइन इन",
      signUp: "साइन अप",
      signOut: "साइन आउट",
      email: "ईमेल",
      password: "पासवर्ड",
      fullName: "पूरा नाम",
      phone: "फोन नंबर",
      address: "पता",
      alreadyHaveAccount: "पहले से खाता है?",
      dontHaveAccount: "खाता नहीं है?",
      
      // Navigation  
      home: "होम",
      report: "रिपोर्ट",
      myIssues: "मेरी समस्याएं",
      community: "समुदाय",
      about: "बारे में",
      profile: "प्रोफाइल",
      rewards: "पुरस्कार",
      offline: "ऑफलाइन",
      
      // Home Page
      recentIssues: "हाल की समस्याएं",
      quickActions: "त्वरित कार्य",
      reportIssue: "समस्या रिपोर्ट करें",
      viewMap: "मानचित्र देखें",
      checkRewards: "पुरस्कार देखें",
      
      // Report Issue
      reportCivicIssue: "नागरिक समस्या रिपोर्ट करें",
      issueTitle: "समस्या का शीर्षक",
      description: "विवरण",
      location: "स्थान",
      category: "श्रेणी",
      priority: "प्राथमिकता",
      attachPhotos: "फोटो संलग्न करें",
      reportAnonymously: "गुमनाम रिपोर्ट करें",
      submitReport: "रिपोर्ट जमा करें",
      low: "कम",
      medium: "मध्यम",  
      high: "उच्च",
      
      // Profile
      contactInformation: "संपर्क जानकारी",
      joinedOn: "में शामिल हुए",
      achievements: "उपलब्धियां",
      issuesReported: "रिपोर्ट की गई समस्याएं",
      issuesResolved: "हल की गई समस्याएं",
      tokensEarned: "अर्जित टोकन",
      editProfile: "प्रोफाइल संपादित करें",
      privacySettings: "गोपनीयता सेटिंग्स",
      
      // Tokens/Rewards
      tokens: "टोकन",
      totalEarnings: "नागरिक योगदान से कुल कमाई",
      nextLevel: "अगला स्तर",
      tokensToGo: "टोकन बाकी",
      recentEarnings: "हाल की कमाई",
      availableRewards: "उपलब्ध पुरस्कार",
      redeem: "भुनाएं",
      insufficientTokens: "अपर्याप्त टोकन",
      comingSoon: "जल्द आ रहा है",
      howToEarnTokens: "टोकन कैसे कमाएं",
      reportIssues: "समस्या रिपोर्ट करें",
      issueResolution: "समस्या समाधान",
      communityEngagement: "सामुदायिक सहभागिता",
      earnTokensForEachValidReport: "प्रत्येक वैध रिपोर्ट के लिए टोकन कमाएं",
      bonusWhenReportResolved: "जब आपकी रिपोर्ट हल हो जाए तो बोनस",
      upvoteAndComment: "समस्याओं को अपवोट और कमेंट करें",
      
      // About
      aboutCivicConnect: "सिविक कनेक्ट के बारे में",
      makingCommunitiesBetter: "प्रौद्योगिकी के माध्यम से समुदायों को बेहतर बनाना",
      ourMission: "हमारा मिशन",
      ourValues: "हमारे मूल्य",
      getInvolved: "शामिल हों",
      
      // Issue Status
      pending: "लंबित",
      assigned: "आवंटित",
      inProgress: "प्रगति में",
      resolved: "हल किया गया",
      
      // Categories
      pothole: "गड्ढा",
      streetLight: "स्ट्रीट लाइट",
      garbageCollection: "कचरा संग्रह",
      waterLeakage: "पानी का रिसाव",
      trafficSignal: "ट्रैफिक सिग्नल",
      publicTransport: "सार्वजनिक परिवहन",
      parksRecreation: "पार्क और मनोरंजन",
      other: "अन्य",
      
      // Messages
      signInSuccess: "सफलतापूर्वक साइन इन!",
      signUpSuccess: "खाता सफलतापूर्वक बनाया गया!",
      signOutSuccess: "सफलतापूर्वक साइन आउट!",
      profileUpdated: "प्रोफाइल सफलतापूर्वक अपडेट किया गया!",
      rewardRedeemed: "पुरस्कार सफलतापूर्वक भुनाया गया!",
      errorOccurred: "एक त्रुटि हुई। कृपया पुनः प्रयास करें।",
      
      // App Title  
      appTitle: "सिविक कनेक्ट"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;