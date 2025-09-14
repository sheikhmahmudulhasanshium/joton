// src/hooks/useSystemStatus.ts
import { useState, useEffect } from 'react';
import { getSystemStatus } from '@/lib/api'; // FIX: Import the correct function
import { type SystemStatus } from '@/lib/types';

export function useSystemStatus() {
  const [status, setStatus] = useState<SystemStatus>('initializing');

  useEffect(() => {
    let isMounted = true;
    const checkStatus = async () => {
      try {
        const response = await getSystemStatus(); // FIX: Call the correct function
        if (isMounted) {
          // FIX: Use the correct key from the response body
          const count = response.data.staffCount as number;
          setStatus(count === 0 ? 'setup_needed' : 'ready');
        }
      } catch (err) {
        console.error('Failed to fetch system status:', err);
        if (isMounted) {
          setStatus('error');
        }
      }
    };

    checkStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  return { status };
}