// src/app/(routes)/register/new/_components/StaffRegistrationForm.tsx
'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react'; // Import Dispatch and SetStateAction
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { Role } from '@/lib/types';
import { createStaff } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { departments } from '@/lib/menu';
import { type Notification } from './page'; // Import the shared Notification type

const rolesRequiringDepartment = [
  Role.DOCTOR,
  Role.NURSE,
  Role.PHARMACIST,
];

const staffSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  workEmail: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  contactPhone: z.string().min(10, 'A valid phone number is required'),
  jobTitle: z.nativeEnum(Role),
  department: z.string().optional(),
}).superRefine((data, ctx) => {
  if (rolesRequiringDepartment.includes(data.jobTitle) && (!data.department || data.department.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Department is required for the selected role.`,
      path: ["department"],
    });
  }
});

type StaffFormData = z.infer<typeof staffSchema>;

// --- FIX: Use the correct type for React's state setter function ---
interface StaffRegistrationFormProps {
  setNotification: Dispatch<SetStateAction<Notification | null>>;
}

// --- FIX: Move staffRoles definition inside the component or keep it at the top level ---
const staffRoles = Object.values(Role).filter(
  role => ![Role.PATIENT, Role.BANNED, Role.USER].includes(role)
);

export function StaffRegistrationForm({ setNotification }: StaffRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      workEmail: '',
      password: '',
      contactPhone: '+880',
      jobTitle: undefined,
      department: '',
    },
  });
  
  const watchedJobTitle = form.watch('jobTitle');
  const isDepartmentRequired = rolesRequiringDepartment.includes(watchedJobTitle);

  useEffect(() => {
    if (!isDepartmentRequired) {
      form.setValue('department', '');
      form.clearErrors('department');
    }
  }, [isDepartmentRequired, form]);

  const generateAndCopyPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 14; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    form.setValue('password', password, { shouldValidate: true });
    navigator.clipboard.writeText(password);
    setNotification({ type: 'success', message: 'A secure password has been generated and copied to your clipboard.' });
    setTimeout(() => setNotification(null), 4000);
  };

  async function onSubmit(values: StaffFormData) {
    setIsSubmitting(true);
    setNotification(null);
    try {
      const payload = {
        ...values,
        department: isDepartmentRequired ? values.department : 'General',
      };
      await createStaff(payload);
      setNotification({
        type: 'success',
        message: `An account for ${values.firstName} ${values.lastName} has been created.`,
      });
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseData = error.response.data;
        const message = Array.isArray(responseData.message) ? responseData.message.join('. ') : responseData.message;
        setNotification({ type: 'error', message: message || 'An unexpected error occurred.' });
      } else {
        setNotification({ type: 'error', message: 'Failed to connect to the server.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Details</CardTitle>
        <CardDescription>Fill in the form to create a new staff account with system access.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="firstName" render={({ field }) => ( <FormItem> <FormLabel>First Name</FormLabel> <FormControl><Input placeholder="John" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="lastName" render={({ field }) => ( <FormItem> <FormLabel>Last Name</FormLabel> <FormControl><Input placeholder="Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            </div>
            <FormField control={form.control} name="workEmail" render={({ field }) => ( <FormItem> <FormLabel>Work Email</FormLabel> <FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="password" render={({ field }) => ( <FormItem> <div className="flex items-center justify-between"> <FormLabel>Password</FormLabel> <Button type="button" variant="link" size="sm" className="p-0 h-auto" onClick={generateAndCopyPassword}> <Sparkles className="mr-2 h-4 w-4" /> Generate & Copy </Button> </div> <div className="relative"> <FormControl><Input type={showPassword ? 'text' : 'password'} {...field} /></FormControl> <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}> {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} </Button> </div> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="contactPhone" render={({ field }) => ( <FormItem> <FormLabel>Contact Phone</FormLabel> <FormControl><Input placeholder="+8801712345678" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="jobTitle" render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title / Role</FormLabel>
                  <FormControl>
                    <select {...field} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select a role</option>
                      {staffRoles.map(role => (<option key={role} value={role}>{role}</option>))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="department" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Department
                    {!isDepartmentRequired && <span className="text-muted-foreground text-xs ml-2">(Optional)</span>}
                  </FormLabel>
                   <FormControl>
                    <select {...field} disabled={!isDepartmentRequired} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select a department</option>
                      {departments.map(dept => (<option key={dept.id} value={dept.title}>{dept.title}</option>))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...</> : 'Create Staff Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}