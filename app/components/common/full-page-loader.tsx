// app/components/common/full-page-loader.tsx
'use client';

import { Loader2 } from 'lucide-react';

export function FullPageLoader() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}