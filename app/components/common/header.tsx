// app/components/common/Header.tsx

"use client"; 

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, Siren } from 'lucide-react';
import Link from 'next/link';

// Import BOTH sets of menus and components
import { landingPageMenu, hmsMenu, contactInfo } from '@/lib/menu';
import { Navbar } from './navbar';
import { NavbarAdmin } from './navbar-admin';
import { ModeToggle } from './mode-toggle-button';
import { Sidebar } from './sidebar';
import { SidebarAdmin } from './sidebar-admin';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from './language-toggle-button';

// Define props to accept a variant
interface HeaderProps {
  variant: 'landing' | 'admin';
}

export function Header({ variant }: HeaderProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // A reusable button component for consistency
  const SignInButton = () => (
    <Button asChild>
      <Link href="/login">Sign In</Link>
    </Button>
  );

  return (
    <>
      <header className="sticky top-0 z-20 flex h-20 w-full items-center justify-between border-b border-border/40 bg-background/95 p-4 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
        
        {/* Left Section: Contains Logo and the Desktop Navigation */}
        <div className="flex items-center gap-6">
          <a href={variant === 'admin' ? '/dashboard' : '/'} aria-label="JOTON Home">
            <div className="lg:hidden">
              <Image src="/favicon-96x96.png" alt="JOTON Symbol" width={40} height={40} className="block dark:hidden text-foreground" />
              <Image src="/favicon.svg" alt="JOTON Symbol" width={40} height={40} className="hidden dark:block text-foreground" />
            </div>
            <div className="hidden lg:block xl:hidden">
              <Image src="/svg/integrated-logotype.svg" alt="JOTON Integrated Logotype" width={150} height={40} className="text-foreground" />
            </div>
            <div className="hidden xl:block">
              <Image src="/svg/primary-logotype.svg" alt="JOTON Primary Logotype" width={180} height={40} className="text-foreground" />
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex">
            {variant === 'landing' && <Navbar menuItems={landingPageMenu} />}
            {variant === 'admin' && <NavbarAdmin menuItems={hmsMenu} />}
          </div>
        </div>

        {/* Right Section: All Action Buttons */}
        <div className="flex items-center gap-2">
            {/* Desktop-only Action Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {variant === 'landing' && (
                <>
                  <Button variant="ghost" asChild className="hidden lg:flex text-sm">
                    {/* --- CHANGE: Using contactInfo.href --- */}
                    <Link href={contactInfo.hotline.href}>
                      <Siren className="mr-2 h-4 w-4 text-red-500 animate-pulse" />
                      24/7 Hotline: {contactInfo.hotline.number}
                    </Link>
                  </Button>
                  <SignInButton />
                </>
              )}
            </div>

            <LanguageToggle />
            <ModeToggle />

            {/* Mobile-only Hamburger Menu */}
            <div className="flex items-center lg:hidden">
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="ml-2" aria-label="Open menu">
                    <Menu size={24} />
                </Button>
            </div>
        </div>
      </header>

      {/* Conditional Sidebar Rendering */}
      {variant === 'landing' && <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} menuItems={landingPageMenu} />}
      {variant === 'admin' && <SidebarAdmin isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} menuItems={hmsMenu} />}
    </>
  );
}