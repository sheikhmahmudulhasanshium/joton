'use client';

import { useState } from 'react';
import Image from 'next/image'; // Import the Next.js Image component
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Check, AlertTriangle } from 'lucide-react';

// ============================================================================
// DATA & TYPES (No changes here)
// ============================================================================

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Mode = 'donate' | 'receive';

export const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const orderedBloodTypes: BloodType[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export const figLocationsDonor: Record<BloodType, string> = {
  "A+": "/gif/BCV-1-2.gif", "B+": "/gif/BCV-3-4.gif", "O+": "/gif/BCV-5-6.gif", "AB+": "/gif/BCV-7-8.gif",
  "A-": "/gif/BCV-9-10.gif", "B-": "/gif/BCV-11-12.gif", "O-": "/gif/BCV-13-14.gif", "AB-": "/gif/BCV-15-16.gif",
};
export const figLocationsRecipient: Record<BloodType, string> = {
  "A+": "/gif/BCV-17-18.gif", "B+": "/gif/BCV-19-20.gif", "O+": "/gif/BCV-21-22.gif", "AB+": "/gif/BCV-23-24.gif",
  "A-": "/gif/BCV-25-26.gif", "B-": "/gif/BCV-27-28.gif", "O-": "/gif/BCV-29-30.gif", "AB-": "/gif/BCV-31-32.gif",
};

export const compatibilityData: Record<BloodType, { donate: BloodType[], receive: BloodType[] }> = {
  'O-': { donate: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], receive: ['O-'] },
  'O+': { donate: ['O+', 'A+', 'B+', 'AB+'], receive: ['O-', 'O+'] },
  'A-': { donate: ['A-', 'A+', 'AB-', 'AB+'], receive: ['O-', 'A-'] },
  'A+': { donate: ['A+', 'AB+'], receive: ['O-', 'O+', 'A-', 'A+'] },
  'B-': { donate: ['B-', 'B+', 'AB-', 'AB+'], receive: ['O-', 'B-'] },
  'B+': { donate: ['B+', 'AB+'], receive: ['O-', 'O+', 'B-', 'B+'] },
  'AB-': { donate: ['AB-', 'AB+'], receive: ['O-', 'A-', 'B-', 'AB-'] },
  'AB+': { donate: ['AB+'], receive: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] },
};


// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

const BCV = () => {
    const [mode, setMode] = useState<Mode>('donate');
    const [selectedType, setSelectedType] = useState<BloodType | null>(null);

    return (
        <main className="min-h-screen  flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl animate-fade-in"> {/* Increased max-width for the wider layout */}
                <CardContent className="flex flex-col items-center gap-6 p-4 pt-6 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">
                        Blood Type Compatibility
                    </h1>

                    <Tabs defaultValue="visualizer" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="visualizer">Interactive Visualizer</TabsTrigger>
                            <TabsTrigger value="table">Compatibility Table</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="visualizer" className="mt-6">
                            <div className="flex flex-col items-center gap-6">

                                {/* --- All controls on one responsive line --- */}
                                <div className="flex w-full max-w-2xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            size="lg"
                                            variant={mode === 'donate' ? 'default' : 'outline'}
                                            onClick={() => setMode('donate')}
                                        >
                                            Donor View
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant={mode === 'receive' ? 'default' : 'outline'}
                                            onClick={() => setMode('receive')}
                                        >
                                            Recipient View
                                        </Button>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="flex-1 justify-between text-lg py-6">
                                                {selectedType ? (
                                                    `Selected Blood Type: ${selectedType}`
                                                ) : (
                                                    <span className="flex items-center gap-2 text-yellow-600">
                                                        <AlertTriangle className="h-5 w-5" />
                                                        Select a Blood Type...
                                                    </span>
                                                )}
                                                <ChevronDown className="h-5 w-5 opacity-70" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                                            <DropdownMenuItem onSelect={() => setSelectedType(null)} className="text-lg text-muted-foreground">
                                                Clear Selection
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            {bloodTypes.map(type => (
                                                <DropdownMenuItem key={type} onSelect={() => setSelectedType(type)} className="text-lg">
                                                    {type}
                                                    {selectedType === type && <Check className="ml-auto h-4 w-4" />}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>


                                <div className="mt-6 w-full">
                                    <div className="rounded-lg border bg-[#fefefe] p-4 sm:p-6">
                                        <div className="relative w-full aspect-video overflow-hidden rounded-md">
                                            {selectedType ? (
                                                <Image
                                                    key={mode + selectedType}
                                                    src={mode === 'receive' ? figLocationsRecipient[selectedType] : figLocationsDonor[selectedType]}
                                                    alt={`Compatibility guide for blood type ${selectedType} in ${mode} mode.`}
                                                    fill
                                                    className="object-contain"
                                                    unoptimized // Important for GIFs to prevent optimization errors
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <p className="text-muted-foreground">
                                                        Please select a blood type to see the guide.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="table" className="mt-6">
                            <p className="text-center text-muted-foreground mb-6">
                                &ldquo;Universal Donors&rdquo; (O-) can give to everyone, and &ldquo;Universal Recipients&rdquo; (AB+) can receive from everyone.
                            </p>
                            <div className="w-full rounded-lg border">
                                <div className="relative w-full overflow-x-auto max-h-[60vh]">
                                    <table className="w-full caption-bottom text-sm">
                                        <thead className="[&_tr]:border-b">
                                            <tr className="sticky top-0 z-10 border-b bg-card transition-colors hover:bg-muted/50">
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Blood Type</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Can Donate To</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Can Receive From</th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {orderedBloodTypes.map((type) => (
                                                <tr key={type} className="border-b transition-colors hover:bg-muted/50">
                                                    <td className="p-4 align-middle font-medium">
                                                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-base font-semibold text-primary">
                                                            {type}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 align-middle text-muted-foreground">{compatibilityData[type].donate.join(', ')}</td>
                                                    <td className="p-4 align-middle text-muted-foreground">{compatibilityData[type].receive.join(', ')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </main>
    );
}
 
export default BCV;