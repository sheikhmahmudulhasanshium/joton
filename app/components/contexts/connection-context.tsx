// contexts/ConnectionContext.tsx
'use client';

import { createContext } from 'react';

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

export interface ConnectionContextType {
  status: ConnectionStatus;
}

export const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);