// src/app/(routes)/faq/page.tsx
'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils'; // For conditional class names

import { Header } from "@/app/components/common/header";
import Footer from "@/app/components/common/footer";
import BasicBodyProvider from "@/app/components/providers/basic-body-provider";
import BasicPageProvider from "@/app/components/providers/basic-page-provider";

const inter = Inter({ subsets: ['latin'] });

// --- FAQ Data remains in a separate array for easy updates ---
const faqData = [
  {
    question: "What is JOTON?",
    answer: (
      <p>
        JOTON is a modern, full-stack Healthcare Management System (HMS) built as a portfolio project. It demonstrates a complete authentication flow, initial system setup, and the foundational features of a multi-user application using Next.js for the frontend and NestJS for the backend.
      </p>
    ),
  },
  {
    question: "Is this a real service? Can I use it for my hospital?",
    answer: (
      <p>
        No, this is strictly a <strong>non-commercial demonstration project</strong>. It is not intended for real-world use with actual patient data. All data displayed is fictional, and the platform is designed for experimental and portfolio review purposes only.
      </p>
    ),
  },
  {
    question: "How do I create an account?",
    answer: (
      <p>
        For security, this system uses an &ldquo;admin-first&rdquo; setup. The very first account must be an administrator, created via a special, one-time registration process. After the first admin account is created, that admin can then create other staff accounts (like doctors or receptionists) from within the application&apos;s dashboard.
      </p>
    ),
  },
  {
    question: "I was redirected to a 'Create Initial Admin Account' page. Why?",
    answer: (
      <p>
        You were redirected because the system&apos;s database is currently empty. This is the initial setup phase. The application requires that the first user be an administrator, so it automatically directs you to the secure registration page to create that account.
      </p>
    ),
  },
  {
    question: "What happens after the first admin is registered?",
    answer: (
      <p>
        Once the first admin account is created, the system switches to its normal operational mode. The special admin registration page becomes inaccessible, and all users will be directed to the standard <Link href="/log-in" className="text-primary underline">Sign In</Link> page. The application will then function with its public and protected routes as expected.
      </p>
    ),
  },
  {
    question: "Who is the owner of this project?",
    answer: (
      <p>
        This project was designed and developed by Sheikh Mahmudul Hasan Shium. You can view his full portfolio and get in touch via his personal website: <a href="https://iamshium.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary underline">iamshium.vercel.app</a>.
      </p>
    ),
  },
];

const FAQsPage = () => {
  // State to track which FAQ item is currently open. null means all are closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Handler to toggle the open state of an FAQ item
  const handleToggle = (index: number) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <BasicPageProvider fontClassName={inter.className}>
      <BasicBodyProvider header={<Header variant="landing" />} footer={<Footer />}>
        <div className="container mx-auto max-w-3xl px-4 py-8 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Answers to common questions about the JOTON project and its functionality.
            </p>
          </div>
          
          <div className="w-full space-y-2">
            {faqData.map((item, index) => (
              <div key={index} className="border-b">
                {/* The clickable question area */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center py-6 text-left text-lg font-medium hover:text-primary transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-300",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>
                
                {/* The collapsible answer area */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openIndex === index
                      ? "max-h-96 opacity-100 pb-6" // Expanded state
                      : "max-h-0 opacity-0"      // Collapsed state
                  )}
                >
                  <div className="text-base text-muted-foreground">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BasicBodyProvider>
    </BasicPageProvider>
  );
}
 
export default FAQsPage;