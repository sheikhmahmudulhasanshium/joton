// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/providers/theme-provider";
import Analytics from "./components/seo/analytics";

// Your metadata object remains the same. It is correct and handled by Next.js.
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The suppressHydrationWarning is on <html> as next-themes modifies its class
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
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
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}