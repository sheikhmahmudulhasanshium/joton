// app/(routes)/register/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import Link from 'next/link';
import {
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  ChevronDown,
  ShieldAlert,
} from 'lucide-react';
import { Role } from '@/lib/types';

import { getSetupToken, registerAdmin } from '@/lib/api';
import { Header } from '@/app/components/common/header';
import Footer from '@/app/components/common/footer';
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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import BasicPageProvider from '@/app/components/providers/basic-page-provider';
import BasicBodyProvider from '@/app/components/providers/basic-body-provider';
import { SetupNotice } from './set-up-notice';

const countries = [
  { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
];

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  workEmail: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  contactPhone: z
    .string()
    .min(10, 'A valid phone number is required (min 10 digits)'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type FormData = z.infer<typeof registerSchema>;

const FORM_STORAGE_KEY = 'adminRegistrationFormData';

export default function RegisterAdminPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [countryCode, setCountryCode] = useState(countries[0].code);
  const [setupToken, setSetupToken] = useState<string | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState(true);

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      workEmail: '',
      password: '',
      contactPhone: '',
      terms: false,
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(FORM_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData) as FormData & { countryCode?: string };
        form.reset(parsedData);
        if (parsedData.countryCode) {
          setCountryCode(parsedData.countryCode);
        }
      }
    } catch (error) {
      console.error("Failed to parse saved form data:", error);
      localStorage.removeItem(FORM_STORAGE_KEY);
    }
  }, [form]);

  useEffect(() => {
    const dataToSave = { ...watchedValues, countryCode };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [watchedValues, countryCode]);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await getSetupToken();
        setSetupToken(response.data.secret);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          router.push('/log-in');
        } else {
          setApiError(
            'Could not retrieve setup configuration. Please check the backend server.',
          );
        }
      } finally {
        setIsTokenLoading(false);
      }
    }
    fetchToken();
  }, [router]);

  const generateAndCopyPassword = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 14; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    form.setValue('password', password, { shouldValidate: true });
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClearDataChange = (checked: boolean) => {
    if (checked) {
      localStorage.removeItem(FORM_STORAGE_KEY);
      form.reset({
        firstName: '',
        lastName: '',
        workEmail: '',
        password: '',
        contactPhone: '',
        terms: false,
      });
      setCountryCode(countries[0].code);
    }
  };
  
  async function onSubmit(values: FormData) {
    if (!setupToken) {
      setApiError('Cannot submit: setup token is missing.');
      return;
    }
    setIsSubmitting(true);
    setApiError(null);
    try {
      // --- THIS IS THE FIX ---
      // Disable the ESLint warning for this line because the 'terms' variable
      // is intentionally unused. We only use destructuring to exclude it from the payload.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { terms, ...restOfValues } = values;
      const fullContactPhone = `${countryCode}${restOfValues.contactPhone}`;
      const payload = {
        ...restOfValues,
        contactPhone: fullContactPhone,
        secret: setupToken,
        jobTitle: Role.ADMIN,
        department: 'Administration',
      };

      await registerAdmin(payload);
      
      localStorage.removeItem(FORM_STORAGE_KEY);

      window.location.href = '/log-in?registered=true';

    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseData = error.response.data;
        if (Array.isArray(responseData.message)) {
          setApiError(responseData.message.join('. '));
        } else {
          setApiError(responseData.message || 'An unexpected error occurred.');
        }
      } else {
        setApiError('Failed to connect to the server.');
      }
      setIsSubmitting(false); 
    }
  }

  if (isTokenLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <BasicPageProvider fontClassName="font-sans">
      <BasicBodyProvider header={<Header variant="landing" />} footer={<Footer />}>
        <div className="flex flex-grow items-center justify-center p-4">
          <Card className="w-full max-w-lg border border-border/20 bg-background/60 shadow-lg backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle className="text-2xl">Create Initial Admin Account</CardTitle>
              <CardDescription>
                This form is for setting up the first system administrator.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SetupNotice title="Welcome to JOTON!">
                It looks like this is a new installation. Before you can
                proceed, you must create the first administrator account below.
              </SetupNotice>

              {apiError && (
                <Alert variant="destructive" className="mb-4">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Registration Failed</AlertTitle>
                  <AlertDescription>{apiError}</AlertDescription>
                </Alert>
              )}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id="clear-data" onCheckedChange={handleClearDataChange} />
                    <label
                      htmlFor="clear-data"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Clear saved data and start over.
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="workEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            {...field}
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
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <div className="flex items-center gap-2">
                            {isCopied && (
                              <span className="text-sm text-green-500 animate-pulse">
                                Copied!
                              </span>
                            )}
                            <Button
                              type="button"
                              variant="link"
                              size="sm"
                              className="p-0 h-auto"
                              onClick={generateAndCopyPassword}
                            >
                              <Sparkles className="mr-2 h-4 w-4" />
                              Generate & Copy
                            </Button>
                          </div>
                        </div>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <div className="relative flex items-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                className="absolute left-0 h-full rounded-r-none border-r-0 flex items-center gap-2 px-3 font-mono"
                              >
                                {countries.find((c) => c.code === countryCode)
                                  ?.flag}
                                {countryCode}
                                <ChevronDown className="h-4 w-4 opacity-50" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                              {countries.map((country) => (
                                <DropdownMenuItem
                                  key={country.code}
                                  onSelect={() => setCountryCode(country.code)}
                                >
                                  <span className="w-6">{country.flag}</span>
                                  <span className="ml-2 flex-1">
                                    {country.name}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {country.code}
                                  </span>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <FormControl>
                            <Input
                              type="tel"
                              className="pl-28"
                              placeholder="1712345678"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border bg-background/50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Accept terms and conditions</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            You agree to our{' '}
                            <Link
                              href="/terms"
                              className="underline hover:text-primary"
                            >
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                              href="/privacy"
                              className="underline hover:text-primary"
                            >
                              Privacy Policy
                            </Link>
                            .
                          </p>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isTokenLoading || !!apiError || isSubmitting}
                  >
                    {isTokenLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparing Form...
                      </>
                    ) : isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Admin Account'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground w-full text-center">
                Already have an account?{' '}
                <Link
                  href="/log-in"
                  className="font-medium text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </BasicBodyProvider>
    </BasicPageProvider>
  );
}