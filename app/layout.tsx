// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script"; // Import the Next.js Script component for GA
import "./globals.css";
import { ThemeProvider } from "./components/providers/theme-provider";

// --- ENVIRONMENT VARIABLES ---
// Read all IDs from your .env.local file at the project root
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

// The metadata object now includes the site verification key
export const metadata: Metadata = {
  title: {
    template: '%s | JOTON',
    default: 'JOTON | Healthcare with hope.',
  },
  description: 'A modern Hospital Management System for seamless operations.',
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'JOTON',
  },
  icons: {
    shortcut: '/favicon.ico',
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  // Reads the server-side environment variable and generates the correct meta tag for verification.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The suppressHydrationWarning is on <html> as next-themes modifies its class
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* --- Google Tag Manager (GTM) --- */}
        {/* This script is only injected if a GTM ID is provided. */}
        {/* It's placed in the <head> as required by Google's implementation guide. */}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        )}
      </head>

      <body suppressHydrationWarning>
        {/* --- GTM noscript Fallback --- */}
        {/* This must be placed immediately after the opening <body> tag. */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
        )}
        
        {/* --- Standalone Google Analytics (GA) --- */}
        {/* This block only runs if a GA_ID is provided AND a GTM_ID is NOT provided. */}
        {/* This prevents loading Google Analytics twice if you're managing it via GTM. */}
        {gaId && !gtmId && (
          <>
            <Script 
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="ga-config-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        
        {/*
          The ThemeProvider wraps your entire application, enabling theme switching.
          It's a Client Component wrapping Server Component children. This is the correct pattern.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Your page content will be rendered here */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}