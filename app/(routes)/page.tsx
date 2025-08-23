// app/page.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BasicPageProvider from '../components/providers/basic-page-provider';
import BasicBodyProvider from '../components/providers/basic-body-provider';
import { Header } from '@/app/components/common/header';
import Footer from '@/app/components/common/footer';
import Body from './body';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  // --- CHANGE: Updated title and description for broader scope ---
  const title = 'JOTON: Modern Healthcare Management System';
  const description = "JOTON is a comprehensive Healthcare Management System (HMS) designed to streamline operations for hospitals, clinics, and medical practices. Manage appointments, user roles, and inventory with dynamic dashboards.";

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
      creator: '@YourTwitterHandle',
    },
  };
}

export default function HomePage() {
  return (
    <BasicPageProvider fontClassName={inter.className}>
      <BasicBodyProvider header={<Header variant='landing'/>} footer={<Footer/>}>
        <Body/>
      </BasicBodyProvider>
    </BasicPageProvider>
  );
}