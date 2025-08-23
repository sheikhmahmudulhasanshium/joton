// lib/menu.ts

import {
  LayoutDashboard,
  User,
  Users,
  CalendarCheck2,
  Pill,
  LineChart,
  Settings,
  type LucideIcon,
  HeartIcon,
  HandHeart,
  BrainCog,
  Brain,
  BoneIcon,
  BabyIcon,
  Popcorn,
  PillIcon,
  Siren,
  EyeIcon,
  Biohazard,
  BrushIcon,
  ScanFace,
  ShowerHead,
  LucideAngry,
  EarIcon,
  SlackIcon,
  UserIcon,
  LucideAnnoyed,
  LucideSmile,
  LucideCarrot,
} from 'lucide-react';

// --- TYPE AND DATA FOR THE ADMIN/HMS DASHBOARD ---
export interface HmsMenuItem {
  title: string;
  href: string;
  Icon: LucideIcon;
  isSeparator?: boolean;
}

export const hmsMenu: HmsMenuItem[] = [
  { title: 'Dashboard', href: '/dashboard', Icon: LayoutDashboard },
  { title: 'Appointments', href: '/dashboard/appointments', Icon: CalendarCheck2 },
  { title: 'Patients', href: '/dashboard/patients', Icon: User },
  { title: 'Staff Management', href: '/dashboard/staff', Icon: Users },
  { title: 'Pharmacy', href: '/dashboard/pharmacy', Icon: Pill, isSeparator: true },
  { title: 'Analytics', href: '/dashboard/analytics', Icon: LineChart },
  { title: 'Settings', href: '/dashboard/settings', Icon: Settings },
];


// --- UPDATED & STRATEGIC LANDING PAGE MENU ---
export interface LandingPageMenuItem {
  title: string;
  href: string;
  description?: string;
  children?: LandingPageMenuItem[];
}

export const landingPageMenu: LandingPageMenuItem[] = [
  { title: 'Home', href: '/' },
  {
    title: 'Features',
    href: '/features',
    children: [
      { title: 'Appointment Scheduling', href: '/features/appointments', description: 'Intuitive scheduling for patients and staff.' },
      { title: 'Patient Portal', href: '/features/portal', description: 'Secure access to health records and results.' },
      { title: 'Announcements & Notices', href: '/features/announcements', description: 'Broadcast important news and updates to all users.' },
      { title: 'Pharmacy Management', href: '/features/pharmacy', description: 'Track inventory and manage prescriptions.' },
      { title: 'Blood Bank Inventory', href: '/features/blood-bank', description: 'Real-time view of blood group availability.' },
      // --- CHANGE: Broadened description from "hospital" to "healthcare" ---
      { title: 'Analytics & Reporting', href: '/features/analytics', description: 'Data-driven insights for healthcare administration.' },
      { title: 'Notification System', href: '/features/notifications', description: 'Automated alerts for appointments and updates.' },
    ],
  },
  {
    title: 'Departments',
    href: '/departments',
    children: [
      { title: 'Cardiology', href: '/departments/cardiology', description: 'Expert heart and vascular care.' },
      { title: 'Neurology', href: '/departments/neurology', description: 'Advanced treatment for brain conditions.' },
      { title: 'Oncology', href: '/departments/oncology', description: 'Comprehensive cancer diagnosis and treatment.' },
      { title: 'Orthopedics', href: '/departments/orthopedics', description: 'Care for bones, joints, muscles, and ligaments.' },
      { title: 'Pediatrics', href: '/departments/pediatrics', description: 'Compassionate care for children of all ages.' },
      { title: 'Gynecology', href: '/departments/gynecology', description: 'Specialized care for women\'s health.' },
      { title: 'Dermatology', href: '/departments/dermatology', description: 'Treatment for all skin-related conditions.' },
      { title: 'Emergency Care', href: '/departments/emergency', description: '24/7 critical care for urgent medical needs.' },
      { title: 'View All Departments', href: '/departments', description: 'Explore our full range of medical specialties.' },
    ]
  },
  // --- CHANGE: Renamed "For Hospitals" to "Solutions" and updated the link ---
  { title: 'Solutions', href: '/solutions' },
  { title: 'About Us', href: '/about' },
  { title: 'Contact', href: '/contact'},
];

// --- UPDATED FOOTER MENU LINKS ---
export const footerLinks = {
    features: [
        { title: 'Appointment Scheduling', href: '/features/appointments' },
        { title: 'Patient Portal', href: '/features/portal' },
        { title: 'Announcements', href: '/features/announcements' },
        { title: 'Pharmacy Management', href: '/features/pharmacy' },
        { title: 'Analytics & Reporting', href: '/features/analytics' },
    ],
    company: [
        { title: 'About Us', href: '/about' },
        { title: 'Announcements', href: '/features/announcements' },
        { title: 'Contact', href: '/contact' },
        { title: 'Careers', href: '/careers' },
        { title: 'FAQs', href: '/faq' },
        { title: 'Offers', href: '/offers' },
    ],
    legal: [
        { title: 'Terms & Conditions', href: '/terms' },
        { title: 'Privacy Policy', href: '/privacy' },
    ]
};

// --- CONTACT INFORMATION ---
export const contactInfo = {
    emergency:    { display: "+1 (800) 123-XXXX", href: "#" },
    ambulance:    { display: "+1 (800) 456-XXXX", href: "#" },
    appointments: { display: "+1 (800) 789-XXXX", href: "#" },
    hotline:      { number: "+1 (888) 999-XXXX", href: "#" },
};

export const departments=[
      { title: 'Cardiology', href: '/departments/cardiology', description: 'Expert heart and vascular care.' ,icon:<HandHeart/>},
      { title: 'Neurology', href: '/departments/neurology', description: 'Advanced treatment for brain conditions.',icon:<Brain/> },
      { title: 'Oncology', href: '/departments/oncology', description: 'Comprehensive cancer diagnosis and treatment.',icon:<Biohazard/> },
      { title: 'Orthopedics', href: '/departments/orthopedics', description: 'Care for bones, joints, muscles, and ligaments.' ,icon:<BoneIcon/>},
      { title: 'Pediatrics', href: '/departments/pediatrics', description: 'Compassionate care for children of all ages.' ,icon:<BabyIcon/>},
      { title: 'Gynecology', href: '/departments/gynecology', description: 'Specialized care for women\'s health.' ,icon:<UserIcon/>},
      { title: 'Dermatology', href: '/departments/dermatology', description: 'Treatment for all skin-related conditions.',icon:<SlackIcon/> },
      { title: 'Psychology', href: '/departments/psychology', description: 'Treatment for all mental healthcare.' ,icon:<LucideAngry/>},
      { title: 'Dental', href: '/departments/dental', description: 'Treatment for all teeth conditions.',icon:<LucideSmile/> },
      { title: 'Medicine', href: '/departments/medicine', description: 'Medicine specalists (improvise)' ,icon:<PillIcon/>},
      { title: 'Eye', href: '/departments/eye', description: 'Eye specalists (improvise)' ,icon:<EyeIcon/>},
      { title: 'Nose, Ear, Throat', href: '/departments/medicine', description: ' (improvise)',icon:<EarIcon/> },
      { title: 'Dietatian', href: '/departments/medicine', description: 'Food specalists (improvise)' ,icon:<LucideCarrot/>},

      { title: 'Emergency Care', href: '/departments/emergency', description: '24/7 critical care for urgent medical needs.' ,icon:<Siren/>},
    ]

    