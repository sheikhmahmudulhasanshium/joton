// app/page.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BasicPageProvider from './components/providers/basic-page-provider';

const inter = Inter({ subsets: ['latin'] });

// --- USE generateMetadata FUNCTION INSTEAD OF STATIC OBJECT ---
// This ensures Next.js correctly processes and merges metadata with the layout.
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Home', // This string will now correctly fill the %s in the layout's template
    description: "LIORA is a comprehensive Hospital Management System designed to streamline healthcare operations. Manage appointments, user roles, and inventory with dynamic dashboards and robust analytics.",
    openGraph: {
      title: "LIORA: Healthcare with hope.",
      description: "A modern HMS for managing appointments, patient data, and analytics.",
    },
  };
}

// The rest of your component remains the same
export default function HomePage() {
  return (
    <BasicPageProvider fontClassName={inter.className}>
      <h1>Welcome to LIORA</h1>
      <h2>Healthcare with hope.</h2>
      <p>
        This is the main landing page for the Hospital Management System.
      </p>
    </BasicPageProvider>
  );
}