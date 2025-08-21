// app/layout.tsx

import type { Metadata } from "next";
// --- STEP 1: ONLY import GoogleTagManager ---
import { GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
// --- STEP 2: The gaId is NOT needed here ---

export const metadata: Metadata = {
  title: {
    default: 'JOTON | Healthcare with hope.',
    template: '%s | JOTON',
  },
  description: 'A modern Hospital Management System for seamless operations.',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* The GTM component will automatically add the necessary script here */}
      </head>
      <body suppressHydrationWarning>
        {children}
        
        {/* --- STEP 3: Place ONLY the GTM component here, before the closing </body> tag --- */}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </body>
    </html>
  );
}