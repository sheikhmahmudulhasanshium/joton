// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script"; // Required for the successful Google Analytics implementation
import "./globals.css";
import { ThemeProvider } from "./components/providers/theme-provider";

// --- ENVIRONMENT VARIABLES ---
// These are read from your .env.local file
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

// This metadata object is perfect. It includes the successful HTML tag verification method.
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* --- Google Analytics Snippet --- */}
        {/* This implementation pattern successfully passed Google's verification. Do not change it. */}
        {gaId && (
          <>
            <Script strategy="beforeInteractive" async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></Script>
            <Script
              id="ga-inline-script"
              strategy="beforeInteractive"
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

        {/* --- Google Tag Manager - Head Snippet --- */}
        {/* This is the most direct implementation for GTM. It works for tracking, even if the verification bot fails. */}
        {gtmId && (
          <script
            id="google-tag-manager-head-native"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        )}
      </head>

      <body suppressHydrationWarning>
        {/* --- GTM noscript Fallback --- */}
        {/* This must be the first element inside the <body> tag. This placement is correct. */}
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
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}