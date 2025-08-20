// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script"; // This is already imported, which is great.
import "./globals.css";
import { ThemeProvider } from "./components/providers/theme-provider";

// --- ENVIRONMENT VARIABLES ---
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

// The metadata object remains correct, including verification.
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
      {/* 
        The <head> tag is now managed by Next.js. We place scripts directly in the component,
        and Next.js will correctly move them into the head or body based on strategy.
      */}
      <head />

      <body suppressHydrationWarning>
        {/* --- Google Tag Manager (GTM) - CORRECTED IMPLEMENTATION --- */}
        {gtmId && (
          <>
            {/* This <Script> component will be correctly placed in the <head> by Next.js */}
            <Script
              id="gtm-script-head"
              strategy="beforeInteractive" // CRITICAL: This ensures it's loaded early in the <head>
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
            {/* The <noscript> tag MUST be directly in the <body> and does not use the Script component */}
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              ></iframe>
            </noscript>
          </>
        )}
        
        {/* --- Standalone Google Analytics (GA) --- */}
        {/* This logic remains correct. It only runs if GTM is not present. */}
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
        
        {/* Your ThemeProvider and children remain the same */}
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