// app/components/providers/basic-page-provider.tsx

'use client'; // This component now handles client-side state and hooks.

import React, { useState, useEffect } from 'react';
import { Lora } from 'next/font/google'; // Example of another font
import { FullPageLoader } from '../common/full-page-loader';

// --- Placeholder for your user settings hook ---
const useUserSettings = () => {
  const userPreferredFont = 'Lora';
  const userPreferredFontSize = '16px';
  const userPreferredColor = '#888888';
  return { userPreferredFont, userPreferredFontSize, userPreferredColor };
};

// Initialize other fonts you might use
const lora = Lora({ subsets: ['latin'] });

// A map to connect font names to their Next.js font objects
const fontMap: { [key: string]: { className: string } } = {
  Lora: lora,
};

interface BasicPageProviderProps {
  children: React.ReactNode;
  fontClassName: string;
}

const BasicPageProvider: React.FC<BasicPageProviderProps> = ({ children, fontClassName }) => {
  const [activeFontClass, setActiveFontClass] = useState(fontClassName);
  const [activeStyles, setActiveStyles] = useState<React.CSSProperties>({});
  const [isClientHydrated, setIsClientHydrated] = useState(false);

  const { userPreferredFont, userPreferredFontSize, userPreferredColor } = useUserSettings();

  useEffect(() => {
    // --- START: MODIFICATION FOR DELAY ---

    // Define the minimum time the loader should be visible (in milliseconds)
    const MINIMUM_LOADING_TIME = 2000; // 2 seconds

    const timer = setTimeout(() => {
      // This code will run after the 2-second delay

      // Update font family
      const preferredFont = fontMap[userPreferredFont];
      if (preferredFont) {
        setActiveFontClass(preferredFont.className);
      }

      // Update other CSS properties
      setActiveStyles({
        fontSize: userPreferredFontSize,
        color: userPreferredColor,
      });

      // Mark that the client has hydrated and content can be shown
      setIsClientHydrated(true);

    }, MINIMUM_LOADING_TIME);

    // --- Cleanup function ---
    // This is crucial. If the component unmounts before the timer finishes
    // (e.g., user navigates away), we must clear the timer to prevent errors.
    return () => clearTimeout(timer);

    // --- END: MODIFICATION FOR DELAY ---

  }, [userPreferredFont, userPreferredFontSize, userPreferredColor]); // Dependencies remain the same

  // This logic remains the same. It will show the loader until the useEffect
  // completes its 2-second timeout and sets isClientHydrated to true.
  if (!isClientHydrated) {
    return <FullPageLoader />;
  }

  return (
    <main className={activeFontClass} style={activeStyles}>
      {children}
    </main>
  );
};

export default BasicPageProvider;