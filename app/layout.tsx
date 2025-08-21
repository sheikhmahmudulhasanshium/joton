// app/layout.tsx

import type { Metadata } from "next";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaId= process.env.NEXT_PUBLIC_GA_ID;
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
        {/* The component handles adding the GTM script here */}
      </head>
      <body suppressHydrationWarning>
        {children}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        {gaId && <GoogleAnalytics gaId={gaId} />}

      </body>
    </html>
  );
}