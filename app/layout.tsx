// app/layout.tsx

import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';
import { ThemeProvider } from './components/providers/theme-provider';
import { AuthProvider } from './components/providers/auth-provider';
import { ConnectionProvider } from './components/providers/connection-provider';
import ConnectionStatusIndicator from './components/common/connection-indicator';

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'JOTON | Healthcare with hope.',
    template: '%s | JOTON',
  },
  description: 'A modern Healthcare Management System for seamless operations.',
  openGraph: {
    title: 'JOTON | Healthcare with hope.',
    description:
      'A modern Healthcare Management System for seamless operations.',
    url: siteUrl,
    siteName: 'JOTON',
    images: [
      {
        url: '/png/full-lockup-with-tagline.png',
        width: 852,
        height: 300,
        alt: 'JOTON Logo and Tagline',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JOTON | Healthcare with hope.',
    description:
      'A modern Healthcare Management System for seamless operations.',
    images: ['/png/full-lockup-with-tagline.png'],
    creator: '@iamShium',
  },
  applicationName: 'JOTON',
  appleWebApp: {
    title: 'JOTON',
    capable: true,
    statusBarStyle: 'default',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/svg/symbol-light.svg',
        type: 'image/svg+xml',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/svg/symbol-dark.svg',
        type: 'image/svg+xml',
      },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConnectionProvider>
            {/* The single, simplified AuthProvider now wraps the application */}
            <AuthProvider>
                              {children}

              <ConnectionStatusIndicator />
            </AuthProvider>
          </ConnectionProvider>
        </ThemeProvider>

        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </body>
    </html>
  );
}