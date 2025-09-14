// app/components/providers/auth-provider.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getProfile, getSystemStatus, loginUser, logoutUser } from '@/lib/api';
import { type LoginDto, type User } from '@/lib/types';
import { AuthContext } from '../contexts/AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSetupNeeded, setIsSetupNeeded] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const checkStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const systemStatusResponse = await getSystemStatus();
      if (systemStatusResponse.data.staffCount === 0) {
        setIsSetupNeeded(true);
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      setIsSetupNeeded(false);
      const profileResponse = await getProfile();
      setUser(profileResponse.data as User);
      setIsAuthenticated(true);
    // --- THIS IS THE FIX ---
    // Change 'catch (error)' to just 'catch' because the error variable is not used.
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  useEffect(() => {
    if (isSetupNeeded && pathname !== '/register/admin') {
      router.push('/register/admin');
    }
  }, [isSetupNeeded, pathname, router]);

  const login = async (credentials: LoginDto) => {
    await loginUser(credentials);
    await checkStatus();
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout API call failed, proceeding with client logout:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/log-in');
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    isSetupNeeded,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};