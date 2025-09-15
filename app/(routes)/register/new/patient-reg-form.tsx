// src/app/(routes)/register/new/_components/PatientRegistrationForm.tsx
'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react'; // Import Dispatch and SetStateAction
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Loader2, Search, UserPlus, X } from 'lucide-react';
import { createPatient, findStaffById } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { type Notification } from './page'; // Import the shared Notification type

type FoundStaff = {
  firstName: string;
  lastName: string;
  contactPhone: string;
};

const relationTypes = ['none', 'self', 'relative'] as const;

const patientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  contactPhone: z.string().min(10, 'A valid phone number is required'),
  bloodGroup: z.string().optional(),
  relationType: z.enum(relationTypes),
  staffId: z.string().optional(),
  relation: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.relationType === 'self' || data.relationType === 'relative') {
    if (!data.staffId || data.staffId.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Staff ID is required.", path: ["staffId"] });
    }
  }
  if (data.relationType === 'relative') {
    if (!data.relation || data.relation.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Relation to staff is required.", path: ["relation"] });
    }
  }
});

type PatientFormData = z.infer<typeof patientSchema>;

// --- FIX: Use the correct type for React's state setter function ---
interface PatientRegistrationFormProps {
  setNotification: Dispatch<SetStateAction<Notification | null>>;
}

export function PatientRegistrationForm({ setNotification }: PatientRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState<'initial' | 'search' | 'form'>('initial');
  const [searchIdInput, setSearchIdInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundStaff, setFoundStaff] = useState<FoundStaff | null>(null);

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      contactPhone: '+880',
      bloodGroup: '',
      relationType: 'none',
      staffId: '',
      relation: '',
    },
  });

  const relationValue = form.watch('relation');

  useEffect(() => {
    if (foundStaff) {
      if (relationValue === 'Self') {
        form.setValue('firstName', foundStaff.firstName);
        form.setValue('lastName', foundStaff.lastName);
        form.setValue('contactPhone', foundStaff.contactPhone);
      } else {
        form.setValue('firstName', '');
        form.setValue('lastName', '');
        form.setValue('contactPhone', '+880');
      }
    }
  }, [relationValue, foundStaff, form]);

  const handleStaffSearch = async () => {
    if (!searchIdInput) return;
    setIsSearching(true);
    setNotification(null);
    try {
      const { data } = await findStaffById(searchIdInput);
      setFoundStaff(data);
      form.setValue('staffId', searchIdInput.toUpperCase());
      form.setValue('relation', 'Self');
      form.setValue('relationType', 'self');
      setFormStep('form');
    } catch (error) {
      setNotification({ type: 'error', message: `Staff with ID "${searchIdInput}" not found.` });
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const resetFormAndFlow = () => {
    setFormStep('initial');
    setFoundStaff(null);
    setSearchIdInput('');
    form.reset();
  };

  async function onSubmit(values: PatientFormData) {
    setIsSubmitting(true);
    setNotification(null);
    try {
      const payload: Partial<PatientFormData> & { isStaffRelative?: boolean } = { ...values };
      payload.isStaffRelative = values.relationType !== 'none';
      if (values.relationType === 'none') {
        delete payload.staffId;
        delete payload.relation;
      }
      delete payload.relationType;

      await createPatient(payload);
      setNotification({
        type: 'success',
        message: `A profile for ${values.firstName} ${values.lastName} has been created.`,
      });
      resetFormAndFlow();
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

  const isAutoFilled = !!foundStaff;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Details</CardTitle>
        <CardDescription>Fill in the form to register a new patient profile in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {formStep === 'initial' && (
            <div className="space-y-4 text-center border p-6 rounded-lg">
              <FormLabel className="text-base">Is this patient a staff member or their relative?</FormLabel>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button onClick={() => setFormStep('search')}><Search className="mr-2 h-4 w-4"/> Yes, Search by Staff ID</Button>
                <Button variant="secondary" onClick={() => { form.setValue('relationType', 'none'); setFormStep('form'); }}><UserPlus className="mr-2 h-4 w-4"/> No, Register New Patient</Button>
              </div>
            </div>
          )}
          {formStep === 'search' && (
            <div className="space-y-4 border p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <FormLabel>Find Staff Member by ID</FormLabel>
                <Button variant="link" size="sm" onClick={resetFormAndFlow}>Start Over</Button>
              </div>
              <div className="flex items-end gap-2">
                <div className='flex-1'>
                  <Input 
                    placeholder="EMP-00001" 
                    value={searchIdInput}
                    onChange={(e) => setSearchIdInput(e.target.value.toUpperCase())}
                  />
                </div>
                <Button onClick={handleStaffSearch} disabled={isSearching || !searchIdInput}>
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Find'}
                </Button>
              </div>
            </div>
          )}
          {formStep === 'form' && (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {foundStaff && (
                <div className="space-y-3 rounded-md border p-4 bg-secondary/50">
                  <div className="flex items-center justify-between">
                    <FormLabel>Found Staff: <span className="font-bold">{foundStaff.firstName} {foundStaff.lastName}</span></FormLabel>
                    <Button variant="link" size="sm" onClick={resetFormAndFlow} className="h-auto p-0">
                      <X className="mr-1 h-3 w-3" /> Clear & Start Over
                    </Button>
                  </div>
                  <FormField
                    control={form.control}
                    name="relation"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Who is the patient?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex items-center gap-6"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="Self" /></FormControl>
                              <FormLabel className="font-normal">The staff member themselves</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="Relative" /></FormControl>
                              <FormLabel className="font-normal">A relative</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="firstName" render={({ field }) => ( <FormItem> <FormLabel>Patient&apos;s First Name</FormLabel> <FormControl><Input placeholder="Jane" {...field} readOnly={isAutoFilled && relationValue === 'Self'} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="lastName" render={({ field }) => ( <FormItem> <FormLabel>Patient&apos;s Last Name</FormLabel> <FormControl><Input placeholder="Smith" {...field} readOnly={isAutoFilled && relationValue === 'Self'} /></FormControl> <FormMessage /> </FormItem> )} />
              </div>
              <FormField control={form.control} name="dateOfBirth" render={({ field }) => ( <FormItem> <FormLabel>Date of Birth</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="contactPhone" render={({ field }) => ( <FormItem> <FormLabel>Contact Phone</FormLabel> <FormControl><Input placeholder="+8801712345678" {...field} readOnly={isAutoFilled && relationValue === 'Self'} /></FormControl> <FormMessage /> </FormItem> )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="gender" render={({ field }) => ( <FormItem> <FormLabel>Gender</FormLabel> <FormControl> <select {...field} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"> <option value="" disabled>Select gender</option> <option value="Male">Male</option> <option value="Female">Female</option> <option value="Other">Other</option> </select> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="bloodGroup" render={({ field }) => ( <FormItem> <FormLabel>Blood Group (Optional)</FormLabel> <FormControl> <select {...field} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"> <option value="">Select blood group</option> {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => ( <option key={group} value={group}>{group}</option> ))} </select> </FormControl> <FormMessage /> </FormItem> )} />
              </div>
              {isAutoFilled && relationValue === 'Relative' && (
                <div className="space-y-4 rounded-md border p-4">
                  <FormField control={form.control} name="staffId" render={({ field }) => ( <FormItem> <FormLabel>Relative&apos;s Staff ID</FormLabel> <FormControl><Input {...field} readOnly /></FormControl> <FormMessage /> </FormItem> )} />
                  <FormField control={form.control} name="relation" render={({ field }) => ( <FormItem> <FormLabel>Relation to Staff</FormLabel> <FormControl><Input placeholder="Spouse, Son, Sibling..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                </div>
              )}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {(formStep === 'form' && !foundStaff) && <Button type="button" variant="outline" onClick={resetFormAndFlow}>Back</Button>}
                <Button type="submit" className="w-full flex-1" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Profile...</> : 'Create Patient Profile'}
                </Button>
              </div>
            </form>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}