// lib/types.tsx
import { type LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  href: string;
  Icon: LucideIcon;
  isSeparator?: boolean; // Optional separator for grouping
}

interface Schedule{
    day:string
    time_from:string
    time_to:string
}
interface Degree{
    name:string
    institute:string
    passing_year:string
    speciality:string
}
export interface ProfileCardProps{
  id:string
  name:string
  imageUrl?:string
  degree?:Degree[]
  schedule?:Schedule[]
  featured:boolean
}