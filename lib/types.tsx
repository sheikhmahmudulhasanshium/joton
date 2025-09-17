// lib/types.ts

import { type LucideIcon } from 'lucide-react';

// --- ADD THIS TYPE ---
// Defines the possible states for the system initialization check.
export type SystemStatus = 'initializing' | 'setup_needed' | 'ready' | 'error';

export interface MenuItem {
  title: string;
  href: string;
  Icon: LucideIcon;
  isSeparator?: boolean; // Optional separator for grouping
}

interface Schedule {
  day: string;
  time_from: string;
  time_to: string;
}
interface Degree {
  name: string;
  institute: string;
  passing_year: string;
  speciality: string;
}
export interface ProfileCardProps {
  id: string;
  name: string;
  imageUrl?: string;
  degree?: Degree[];
  schedule?: Schedule[];
  featured: boolean;
}

export interface LoginDto {
  email: string;
  password?: string;
}
// types/role.enum.ts
export enum Role {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  MANAGER = 'MANAGER',
  RECEPTIONIST = 'RECEPTIONIST',
  PHARMACIST = 'PHARMACIST',
  EMPLOYEE = 'EMPLOYEE',
  MEDICINE_SHOP_KEEPER = 'MEDICINE_SHOP_KEEPER',
  TESTER = 'TESTER',
  BANNED = 'BANNED',
  USER = 'USER',
}
// This type should match the SanitizedUser type from your NestJS AuthService
export interface User {
  _id: string;
  email: string;
  role: Role;
  identityId: string;
  identityType: 'Staff' | 'Patient';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// lib/blood-data.ts

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const donationRules: Record<BloodType, BloodType[]> = {
  'A+': ['A+', 'AB+'],
  'A-': ['A+', 'A-', 'AB+', 'AB-'],
  'B+': ['B+', 'AB+'],
  'B-': ['B+', 'B-', 'AB+', 'AB-'],
  'AB+': ['AB+'],
  'AB-': ['AB+', 'AB-'],
  'O+': ['A+', 'B+', 'AB+', 'O+'],
  'O-': [...bloodTypes], // O- can donate to all
};

export const receptionRules: Record<BloodType, BloodType[]> = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': [...bloodTypes], // AB+ can receive from all
  'AB-': ['A-', 'B-', 'AB-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-'],
};

