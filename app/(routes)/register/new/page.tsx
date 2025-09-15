// src/app/(routes)/register/new/page.tsx
'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from "@/app/components/common/header";
import Footer from "@/app/components/common/footer";
import BasicBodyProvider from "@/app/components/providers/basic-body-provider";
import BasicPageProvider from "@/app/components/providers/basic-page-provider";
import { StaffRegistrationForm } from './staff-reg-form';
import { PatientRegistrationForm } from './patient-reg-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

// --- FIX: EXPORT the Notification type so child components can import it ---
export interface Notification {
  type: 'success' | 'error';
  message: string;
}

export default function NewUserPage() {
  const [activeTab, setActiveTab] = useState<'staff' | 'patient'>('staff');
  const [notification, setNotification] = useState<Notification | null>(null);

  return (
    <BasicPageProvider fontClassName={inter.className}>
      <BasicBodyProvider header={<Header variant="admin" />} footer={<Footer />}>
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Create New User Account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Register a new staff member or patient in the system.
            </p>
          </div>

          {notification && (
            <Alert variant={notification.type === 'success' ? 'default' : 'destructive'} className="mb-6">
              {notification.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{notification.type === 'success' ? 'Success!' : 'Operation Failed'}</AlertTitle>
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1 mb-6">
            <button
              onClick={() => setActiveTab('staff')}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium",
                activeTab === 'staff' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              Register Staff
            </button>
            <button
              onClick={() => setActiveTab('patient')}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium",
                activeTab === 'patient' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              Register Patient
            </button>
          </div>

          <div>
            {/* The setNotification prop is now correctly passed and typed */}
            {activeTab === 'staff' && <StaffRegistrationForm setNotification={setNotification} />}
            {activeTab === 'patient' && <PatientRegistrationForm setNotification={setNotification} />}
          </div>
        </div>
      </BasicBodyProvider>
    </BasicPageProvider>
  );
}