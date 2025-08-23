// app/page.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/app/components/common/header';
import Footer from '@/app/components/common/footer';
import Body from './body';
import BasicPageProvider from '@/app/components/providers/basic-page-provider';
import BasicBodyProvider from '@/app/components/providers/basic-body-provider';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  // --- CHANGE: Updated title and description for broader scope ---
  const title = 'JOTON: Modern Healthcare Management System';
  const description = "JOTON is a comprehensive Healthcare Management System (HMS) designed to streamline operations for hospitals, clinics, and medical practices. Manage appointments, user roles, and inventory with dynamic dashboards.";

  return {
    title: 'Departments', 
    description: description,
    
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: '/png/full-lockup-with-tagline.png',
          width: 852,
          height: 300,
          alt: 'JOTON - A Modern Healthcare Management System',
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

export default function Departments() {
  return (
    <BasicPageProvider fontClassName={inter.className}>
      <BasicBodyProvider header={<Header variant='landing'/>} footer={<Footer/>}>
        <Body/>
      </BasicBodyProvider>
    </BasicPageProvider>
  );
}