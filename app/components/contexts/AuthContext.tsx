// src/contexts/AuthContext.ts
'use client';

import { type LoginDto, type User } from '@/lib/types';
import { createContext } from 'react';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSetupNeeded: boolean; // <-- ADD THIS LINE
  login: (credentials: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);