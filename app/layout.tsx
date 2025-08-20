// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script"; // Required for the correct strategy
import "./globals.css";
import { ThemeProvider } from "./components/providers/theme-provider";

// --- ENVIRONMENT VARIABLES ---
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

// The metadata object with the verification key remains essential and correct.
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
  // This is the most reliable verification method and should be kept.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* --- Google Analytics Snippet --- */}
        {/* CRITICAL CHANGE: Placed in head with "beforeInteractive" strategy to pass verification. */}
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
        {/* CRITICAL CHANGE: Placed in head with "beforeInteractive" strategy to pass verification. */}
        {gtmId && (
          <Script
            id="google-tag-manager-head"
            strategy="beforeInteractive"
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
        {/* This placement is correct and must be at the very top of the body. */}
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