// lib/types.tsx
import { type LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  href: string;
  Icon: LucideIcon;
  isSeparator?: boolean; // Optional separator for grouping
}