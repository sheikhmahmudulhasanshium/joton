// app/(routes)/log-in/page.tsx
'use client';

import { Suspense, useState, useEffect } from 'react'; // --- IMPORT Suspense ---
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import Link from 'next/link';
import { CheckCircle, Loader2 } from 'lucide-react';

import { Header } from '@/app/components/common/header';
import Footer from '@/app/components/common/footer';
import BasicBodyProvider from '@/app/components/providers/basic-body-provider';
import BasicPageProvider from '@/app/components/providers/basic-page-provider';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/app/components/hooks/use-auth';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

// --- FIX: All logic that uses client-side hooks is moved into this component ---
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setShowSuccessAlert(true);
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);
    setApiError(null);
    setShowSuccessAlert(false);
    try {
      await auth.login(values);
      router.push('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          setApiError('Login service not found. Please contact support.');
        } else {
          setApiError(error.response.data.message || 'Invalid credentials.');
        }
      } else {
        setApiError('Failed to connect to the server.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showSuccessAlert && (
          <Alert
            variant="default"
            className="mb-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
          >
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800 dark:text-green-300">
              Registration Successful
            </AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Your admin account has been created. You can now sign in.
            </AlertDescription>
          </Alert>
        )}
        {apiError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="owner@hms.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing
                  In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col items-start text-sm">
        <p>Don&apos;t have an account?</p>
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Learn how to get access
        </Link>
      </CardFooter>
    </Card>
  );
}

// --- FIX: The main export now wraps the client component in a Suspense boundary ---
export default function LoginPage() {
  return (
    <BasicPageProvider fontClassName="font-sans">
      <BasicBodyProvider header={<Header variant="landing" />} footer={<Footer />}>
        <div className="flex flex-grow items-center justify-center p-4">
          <Suspense
            fallback={
              <div className="flex h-96 w-full max-w-md items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </BasicBodyProvider>
    </BasicPageProvider>
  );
}