// app/(routes)/log-out/page.tsx
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/app/components/hooks/use-auth';
import { FullPageLoader } from '@/app/components/common/full-page-loader';

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <FullPageLoader />;
}