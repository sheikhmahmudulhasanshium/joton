// app/_components/Analytics.tsx
'use client'; // Scripts are a client-side concern

import Script from "next/script";

// This component is ready for you to add your analytics IDs.
// Store your IDs in .env.local file for security.
// e.g., NEXT_PUBLIC_GTM_ID='GTM-XXXXXXX'

const Analytics = () => {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {/* --- Google Tag Manager --- */}
      {gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive" // Load after the page is interactive
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
      
      {/* --- Google Analytics (if not using GTM) --- */}
      {gaId && !gtmId && (
        <>
          <Script 
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="ga-script"
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
    </>
  );
};

export default Analytics;