// app/components/providers/basic-page-provider.tsx

'use client'; // This component now handles client-side state and hooks.

import React, { useState, useEffect } from 'react';
import { Lora } from 'next/font/google'; // Example of another font

// --- Placeholder for your user settings hook ---
// This hook will eventually get data from your settings context or API.
const useUserSettings = () => {
  // For demonstration, we'll pretend the user prefers the "Lora" font.
  // In a real app, this would check localStorage, a cookie, or an API.
  const userPreferredFont = 'Lora'; // e.g., 'Inter', 'Lora', 'Roboto'
  const userPreferredFontSize = '16px'; // e.g., '14px', '16px', '18px'
  const userPreferredColor = '#888888'; // e.g., a dark text color

  return { userPreferredFont, userPreferredFontSize, userPreferredColor };
};

// Initialize other fonts you might use
const lora = Lora({ subsets: ['latin'] });

// A map to connect font names to their Next.js font objects
const fontMap: { [key: string]: { className: string } } = {
  Lora: lora,
  // Add other fonts here as needed
};

interface BasicPageProviderProps {
  children: React.ReactNode;
  /** The DEFAULT font class name from the server for the initial render. */
  fontClassName: string;
}

const BasicPageProvider: React.FC<BasicPageProviderProps> = ({ children, fontClassName }) => {
  // State for client-side preferences
  const [activeFontClass, setActiveFontClass] = useState(fontClassName);
  const [activeStyles, setActiveStyles] = useState<React.CSSProperties>({});
  
  // Get user settings from your custom hook
  const { userPreferredFont, userPreferredFontSize, userPreferredColor } = useUserSettings();

  useEffect(() => {
    // This effect runs ONLY on the client, after hydration.
    // It updates the font and styles based on the user's preferences.
    
    // Update font family
    const preferredFont = fontMap[userPreferredFont];
    if (preferredFont) {
      setActiveFontClass(preferredFont.className);
    }

    // Update other CSS properties like font size and color
    setActiveStyles({
      fontSize: userPreferredFontSize,
      color: userPreferredColor,
      // You can add more dynamic styles here
    });

  }, [userPreferredFont, userPreferredFontSize, userPreferredColor]);

  return (
    // The className and style are now driven by client-side state,
    // which falls back to the server-rendered font class initially.
    <main className={activeFontClass} style={activeStyles}>
      {children}
    </main>
  );
};

export default BasicPageProvider;