// src/app/components/common/SetupNotice.tsx
'use client';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SetupNoticeProps {
  title: string;
  children: React.ReactNode;
}

export function SetupNotice({ title, children }: SetupNoticeProps) {
  return (
    <Alert className="mb-6 border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-200">
      <AlertCircle className="h-5 w-5 text-blue-500" />
      <AlertTitle className="font-bold">{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}