// hooks/useConnectionStatus.ts
'use client';

import { useContext } from 'react';
import { ConnectionContext, ConnectionContextType } from '../contexts/connection-context';

export const useConnectionStatus = (): ConnectionContextType => {
  const context = useContext(ConnectionContext);

  if (context === undefined) {
    throw new Error('useConnectionStatus must be used within a ConnectionProvider');
  }

  return context;
};