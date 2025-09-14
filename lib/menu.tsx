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
  HandHeart,
  Brain,
  Ribbon,
  Bone,
  Baby,
  Venus,
  Layers,
  BrainCircuit,
  Smile,
  Stethoscope,
  Eye,
  Ear,
  Carrot,
  Ambulance,
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
// In your lib/data.ts or lib/menu.ts file

export const departments = [
  { 
    id: 'dept-cardiology',
    title: 'Cardiology', 
    href: '/departments/cardiology', 
    description: 'Expert care for your heart and vascular system, from prevention to complex interventions.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/cardiology.jpg',
    icon: <HandHeart />,
    patient_services: ['ECG & Echocardiogram', 'Coronary Angioplasty', 'Heart Failure Management', 'Rhythm Disorder Treatment']
  },
  { 
    id: 'dept-neurology',
    title: 'Neurology', 
    href: '/departments/neurology', 
    description: 'Advanced diagnosis and treatment for brain, spine, and nervous system conditions.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/neurology.jpg',
    icon: <Brain />,
    patient_services: ['Stroke Care', 'Epilepsy & Seizure Management', 'Headache & Migraine Clinics', 'Memory Disorders']
  },
  { 
    id: 'dept-oncology',
    title: 'Oncology', 
    href: '/departments/oncology', 
    description: 'Comprehensive and compassionate cancer diagnosis, treatment, and survivorship care.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/oncology.jpg',
    icon: <Ribbon />,
    patient_services: ['Chemotherapy & Immunotherapy', 'Radiation Oncology', 'Surgical Oncology', 'Genetic Counseling']
  },
  { 
    id: 'dept-orthopedics',
    title: 'Orthopedics', 
    href: '/departments/orthopedics', 
    description: 'Specialized care for bones, joints, muscles, and ligaments to restore mobility.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/orthopedics.jpg',
    icon: <Bone />,
    patient_services: ['Joint Replacement Surgery', 'Sports Medicine', 'Fracture & Trauma Care', 'Spine Surgery']
  },
  { 
    id: 'dept-pediatrics',
    title: 'Pediatrics', 
    href: '/departments/pediatrics', 
    description: 'Compassionate and comprehensive medical care for infants, children, and adolescents.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/pediatrics.jpg',
    icon: <Baby />,
    patient_services: ['Well-Child Visits & Immunizations', 'Adolescent Medicine', 'Developmental Screening', 'Acute Illness Care']
  },
  { 
    id: 'dept-gynecology',
    title: 'Gynecology', 
    href: '/departments/gynecology', 
    description: 'Dedicated and specialized care for all aspects of women\'s reproductive health.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/gynecology.jpg',
    icon: <Venus />,
    patient_services: ['Annual Wellness Exams', 'Maternity & Obstetric Care', 'Menopause Management', 'Family Planning']
  },
  { 
    id: 'dept-dermatology',
    title: 'Dermatology', 
    href: '/departments/dermatology', 
    description: 'Expert treatment for all skin, hair, and nail conditions for a healthier you.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/dermatology.jpg',
    icon: <Layers />,
    patient_services: ['Acne & Rosacea Treatment', 'Skin Cancer Screening', 'Cosmetic Dermatology', 'Psoriasis & Eczema Care']
  },
  { 
    id: 'dept-psychology',
    title: 'Psychology', 
    href: '/departments/psychology', 
    description: 'Confidential and supportive mental healthcare to help you navigate life\'s challenges.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/psychology.jpg',
    icon: <BrainCircuit />,
    patient_services: ['Individual Therapy (CBT, DBT)', 'Couples Counseling', 'Anxiety & Depression Treatment', 'Stress Management']
  },
  { 
    id: 'dept-dental',
    title: 'Dental', 
    href: '/departments/dental', 
    description: 'Complete dental care for a healthy smile, from routine check-ups to advanced procedures.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/dental.jpg',
    icon: <Smile />,
    patient_services: ['Preventive Cleanings & Exams', 'Cosmetic Dentistry', 'Root Canal Therapy', 'Dental Implants']
  },
  { 
    id: 'dept-medicine',
    title: 'General Medicine', 
    href: '/departments/medicine', 
    description: 'Primary care for adults, focusing on disease prevention and managing chronic conditions.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/medicine.jpg',
    icon: <Stethoscope />,
    patient_services: ['Annual Physicals', 'Diabetes Management', 'Hypertension Control', 'Preventive Health Screening']
  },
  { 
    id: 'dept-ophthalmology',
    title: 'Ophthalmology', 
    href: '/departments/eye', 
    description: 'Comprehensive eye care, from routine vision exams to complex surgical procedures.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/eye.jpg',
    icon: <Eye />,
    patient_services: ['Cataract Surgery', 'Glaucoma Treatment', 'LASIK & Vision Correction', 'Retina Services']
  },
  { 
    id: 'dept-ent',
    title: 'ENT (Otolaryngology)', 
    href: '/departments/ent', 
    description: 'Specialized medical and surgical care for ear, nose, and throat disorders.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/ent.jpg',
    icon: <Ear />,
    patient_services: ['Sinus & Allergy Care', 'Hearing Loss & Audiology', 'Sleep Apnea Treatment', 'Tonsil & Adenoid Surgery']
  },
  { 
    id: 'dept-nutrition',
    title: 'Nutrition & Dietetics', 
    href: '/departments/nutrition', 
    description: 'Personalized nutrition plans and guidance from registered dietitians for a healthier life.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/nutrition.jpg',
    icon: <Carrot />,
    patient_services: ['Weight Management', 'Medical Nutrition Therapy', 'Sports Nutrition', 'Digestive Health Plans']
  },
  { 
    id: 'dept-emergency',
    title: 'Emergency Care', 
    href: '/departments/emergency', 
    description: '24/7 critical care for urgent and life-threatening medical needs by expert physicians.',
    imageUrl: 'https://raw.githubusercontent.com/adrianhajdin/hms-assets/main/images/departments/emergency.jpg',
    icon: <Ambulance />,
    patient_services: ['Level I Trauma Center', 'Cardiac Emergency Response', 'Stroke & Neurological Emergencies', '24/7 On-site Lab & Imaging']
  }
];