// app/(routes)/page.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/app/components/common/header';
import Footer from '@/app/components/common/footer';
import BasicPageProvider from '@/app/components/providers/basic-page-provider';
import BasicBodyProvider from '@/app/components/providers/basic-body-provider';
import BCV from './visualizer';

const inter = Inter({ subsets: ['latin'] });

// This works because page.tsx is a Server Component.
export async function generateMetadata(): Promise<Metadata> {
  const title = 'JOTON: Modern Healthcare Management System';
  const description = "JOTON is a comprehensive Healthcare Management System (HMS) designed to streamline operations for hospitals, clinics, and medical practices.";

  return {
    title: 'Home', 
    description: description,
    
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: '/png/full-lockup-with-tagline.png',
          width: 852,
          height: 300,
          alt: 'JOTON -  Healthcare with Hope',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/png/full-lockup-with-tagline.png'],
      creator: '@iamShium', // Corrected your handle
    },
  };
}

export default function HomePage() {
  return (
    <BasicPageProvider fontClassName={inter.className}>
      <BasicBodyProvider header={<Header variant='landing'/>} footer={<Footer/>}>
        <BCV />
      </BasicBodyProvider>
    </BasicPageProvider>
  );
}