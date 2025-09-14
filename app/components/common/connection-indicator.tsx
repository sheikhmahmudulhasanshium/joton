// app/components/common/ConnectionStatusIndicator.tsx
'use client';

import { cn } from '@/lib/utils';
import { Wifi, WifiOff } from 'lucide-react';
import { useConnectionStatus } from '../hooks/use-connection-status';

export default function ConnectionStatusIndicator() {
  const { status } = useConnectionStatus();

  // We don't want to show anything if the connection is stable.
  // The indicator should only appear when there's an issue or during the initial check.
  if (status === 'connected') {
    return null;
  }

  const indicatorContent = {
    connecting: {
      text: 'Connecting...',
      className: 'bg-yellow-500 text-yellow-900',
      icon: <Wifi className="h-4 w-4 animate-pulse" />,
    },
    disconnected: {
      text: 'Connection Lost. Retrying...',
      className: 'bg-red-500 text-white',
      icon: <WifiOff className="h-4 w-4" />,
    },
  };

  // Default to connecting state if status is somehow invalid
  const content = indicatorContent[status] || indicatorContent.connecting;

  return (
    <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-2 text-sm font-medium",
        content.className
    )}>
      {content.icon}
      <span className="ml-2">{content.text}</span>
    </div>
  );
}