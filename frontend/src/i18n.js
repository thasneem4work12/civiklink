import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Auth
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      phone: 'Phone Number',
      role: 'Role',
      // Roles
      citizen: 'Citizen',
      government: 'Government Official',
      ngo: 'NGO',
      admin: 'Administrator',
      // Navigation
      home: 'Home',
      postIssue: 'Report Issue',
      myIssues: 'My Issues',
      dashboard: 'Dashboard',
      profile: 'Profile',
      logout: 'Logout',
      // Issues
      issueTitle: 'Issue Title',
      description: 'Description',
      category: 'Category',
      location: 'Location',
      photos: 'Photos',
      submit: 'Submit',
      // Categories
      water: 'Water',
      electricity: 'Electricity',
      road: 'Road',
      garbage: 'Garbage',
      flood: 'Flood',
      drainage: 'Drainage',
      // Status
      pending: 'Pending',
      verified: 'Verified',
      in_progress: 'In Progress',
      solved: 'Solved',
      rejected: 'Rejected',
    },
  },
  si: {
    translation: {
      login: 'ඇතුල් වන්න',
      register: 'ලියාපදිංචි වන්න',
      email: 'විද්‍යුත් තැපෑල',
      password: 'මුරපදය',
      fullName: 'සම්පූර්ණ නම',
      phone: 'දුරකථන අංකය',
      role: 'භූමිකාව',
      citizen: 'පුරවැසියා',
      government: 'රාජ්‍ය නිලධාරි',
      ngo: 'රාජ්‍ය නොවන සංවිධානය',
      admin: 'පරිපාලක',
      home: 'මුල් පිටුව',
      postIssue: 'ගැටලුවක් වාර්තා කරන්න',
      myIssues: 'මගේ ගැටලු',
      dashboard: 'උපකරණ පුවරුව',
      profile: 'පැතිකඩ',
      logout: 'වරන්න',
      water: 'ජලය',
      electricity: 'විදුලිය',
      road: 'මාර්ගය',
      garbage: 'කසළ',
      flood: 'ගංවතුර',
      drainage: 'ජලාපවහනය',
    },
  },
  ta: {
    translation: {
      login: 'உள்நுழைய',
      register: 'பதிவு',
      email: 'மின்னஞ்சல்',
      password: 'கடவுச்சொல்',
      fullName: 'முழு பெயர்',
      phone: 'தொலைபேசி எண்',
      role: 'பங்கு',
      citizen: 'குடிமகன்',
      government: 'அரசு அதிகாரி',
      ngo: 'தன்னார்வ தொண்டு நிறுவனம்',
      admin: 'நிர்வாகி',
      home: 'முகப்பு',
      postIssue: 'சிக்கலை அறிவிக்கவும்',
      myIssues: 'எனது சிக்கல்கள்',
      dashboard: 'டாஷ்போர்டு',
      profile: 'சுயவிவரம்',
      logout: 'வெளியேறு',
      water: 'தண்ணீர்',
      electricity: 'மின்சாரம்',
      road: 'சாலை',
      garbage: 'குப்பை',
      flood: 'வெள்ளம்',
      drainage: 'வடிகால்',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
