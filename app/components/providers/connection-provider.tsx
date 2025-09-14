// providers/ConnectionProvider.tsx
'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api'; // Use your global axios instance
import { ConnectionContext, ConnectionStatus } from '../contexts/connection-context';

// Define a dedicated function for the heartbeat check
const checkBackendStatus = () => api.get('/status');

export const ConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');

  useEffect(() => {
    let isMounted = true;

    const checkConnection = async () => {
      try {
        await checkBackendStatus();
        if (isMounted) {
          setStatus('connected');
        }
      } catch (error) {
        if (isMounted) {
          console.error('Heartbeat check failed:', error);
          setStatus('disconnected');
        }
      }
    };

    // 1. Perform an initial check immediately on load
    checkConnection();

    // 2. Set up an interval to poll the backend periodically
    // A 30-second interval is a good balance to avoid spamming the server.
    const intervalId = setInterval(checkConnection, 30000); // 30 seconds

    // 3. Cleanup function to stop the interval when the component unmounts
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <ConnectionContext.Provider value={{ status }}>
      {children}
    </ConnectionContext.Provider>
  );
};