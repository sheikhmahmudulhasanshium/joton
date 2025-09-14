// app/register/page.tsx
'use client';

import Link from 'next/link';
import { Header } from '@/app/components/common/header';
import Footer from '@/app/components/common/footer';
import BasicBodyProvider from '@/app/components/providers/basic-body-provider';
import BasicPageProvider from '@/app/components/providers/basic-page-provider';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <BasicPageProvider fontClassName="font-sans">
      <BasicBodyProvider header={<Header variant="landing" />} footer={<Footer />}>
        <div className="flex flex-grow items-center justify-center p-4">
          <Card className="w-full max-w-lg text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Account Registration</CardTitle>
              <CardDescription>
                How to get access to the JOTON HMS platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                For security and operational integrity, new user accounts on this platform are created by system administrators.
              </p>
              <div className="text-left p-4 bg-secondary rounded-md">
                <h4 className="font-semibold mb-2">Are you a new Staff Member?</h4>
                <p className="text-sm text-secondary-foreground">
                  Please contact your department manager or the IT department. They will create an account for you and provide you with your initial login credentials.
                </p>
              </div>
               <div className="text-left p-4 bg-secondary rounded-md">
                <h4 className="font-semibold mb-2">Are you a Patient?</h4>
                <p className="text-sm text-secondary-foreground">
                  A patient profile will be created for you by our reception staff during your first visit or registration at our facility. If you wish to have online portal access, please inquire at the front desk.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/log-in">
                  Back to Sign In
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </BasicBodyProvider>
    </BasicPageProvider>
  );
}