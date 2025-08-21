// app/page.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BasicPageProvider from '../../components/providers/basic-page-provider';
import BasicBodyProvider from '../../components/providers/basic-body-provider';
import { Header } from '@/app/components/common/header';
import Footer from '@/app/components/common/footer';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const title = 'JOTON: Modern Hospital Management System';
  const description = "JOTON is a comprehensive HMS designed to streamline healthcare operations. Manage appointments, user roles, and inventory with dynamic dashboards and robust analytics.";

  return {
    // This sets the browser tab title to "Home | JOTON"
    title: 'Home', 
    description: description,
    
    // --- HOMEPAGE-SPECIFIC SOCIAL MEDIA PREVIEW (USING YOUR 852x300 IMAGE) ---
    openGraph: {
      title: title, // A more descriptive title for sharing
      description: description,
      images: [
        {
          url: '/png/full-lockup-with-tagline.png',
          width: 852,  // Your specific image width
          height: 300, // Your specific image height
          alt: 'JOTON - A Modern Hospital Management System',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      // Note: Twitter/X will likely crop this wide image to fit its standard card aspect ratio.
      images: ['/png/full-lockup-with-tagline.png'],
      creator: '@YourTwitterHandle', // Replace with your actual Twitter handle
    },
  };
}

export default function HomePage() {
  return (
    <BasicPageProvider fontClassName={inter.className}>
      <BasicBodyProvider header={<Header variant='admin'/>} footer={<Footer/>}>
      body
      </BasicBodyProvider>
    </BasicPageProvider>
  );
}