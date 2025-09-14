// src/components/common/Header.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, Siren } from 'lucide-react';
import Link from 'next/link';
import { landingPageMenu, hmsMenu, contactInfo } from '@/lib/menu';
import { Navbar } from './navbar';
import { NavbarAdmin } from './navbar-admin';
import { Sidebar } from './sidebar';
import { SidebarAdmin } from './sidebar-admin';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/use-auth';
import { LanguageToggle } from './language-toggle-button';
import { ModeToggle } from './mode-toggle-button';

interface HeaderProps {
  variant: 'landing' | 'admin';
}

export function Header({ variant }: HeaderProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading, logout } = useAuth();

  const AuthButton = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (isLoading) {
      return (
        <div
          className={`h-10 animate-pulse rounded-md bg-muted ${
            isMobile ? 'w-full' : 'w-24'
          }`}
        />
      );
    }

    if (isAuthenticated) {
      return (
        <Button
          onClick={logout}
          variant="outline"
          className={isMobile ? 'w-full' : ''}
        >
          Sign Out
        </Button>
      );
    }

    return (
      <Button asChild className={isMobile ? 'w-full' : ''}>
        <Link href="/log-in">Sign In</Link>
      </Button>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex h-20 w-full items-center justify-between border-b border-border/40 bg-background/95 p-4 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center gap-6">
          <a href={isAuthenticated ? '/dashboard' : '/'} aria-label="JOTON Home">
            <div className="lg:hidden">
              <Image
                src="/favicon-96x96.png"
                alt="JOTON Symbol"
                width={40}
                height={40}
                className="block dark:hidden text-foreground"
              />
              <Image
                src="/favicon.svg"
                alt="JOTON Symbol"
                width={40}
                height={40}
                className="hidden dark:block text-foreground"
              />
            </div>
            <div className="hidden lg:block xl:hidden">
              <Image
                src="/svg/integrated-logotype.svg"
                alt="JOTON Integrated Logotype"
                width={150}
                height={40}
                className="text-foreground"
              />
            </div>
            <div className="hidden xl:block">
              <Image
                src="/svg/primary-logotype.svg"
                alt="JOTON Primary Logotype"
                width={180}
                height={40}
                className="text-foreground"
              />
            </div>
          </a>

          <div className="hidden lg:flex">
            {variant === 'admin' && isAuthenticated && (
              <NavbarAdmin menuItems={hmsMenu} />
            )}
            {variant === 'landing' && <Navbar menuItems={landingPageMenu} />}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            {variant === 'landing' && !isAuthenticated && (
              <Button variant="ghost" asChild className="text-sm">
                <Link href={contactInfo.hotline.href}>
                  <Siren className="mr-2 h-4 w-4 text-red-500 animate-pulse" />
                  24/7 Hotline
                </Link>
              </Button>
            )}
            <AuthButton />
          </div>

          <LanguageToggle />
          <ModeToggle />

          <div className="flex items-center lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="ml-2"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </header>

      {variant === 'landing' && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={landingPageMenu}
        >
          <div className="pt-4 border-t">
            <AuthButton isMobile={true} />
          </div>
        </Sidebar>
      )}
      {variant === 'admin' && (
        <SidebarAdmin
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={hmsMenu}
        >
          <div className="pt-4 border-t">
            <AuthButton isMobile={true} />
          </div>
        </SidebarAdmin>
      )}
    </>
  );
}