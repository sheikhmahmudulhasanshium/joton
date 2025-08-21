// app/components/common/sidebar.tsx

"use client";

// --- FIX #1: Corrected the import statement ---
import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown } from 'lucide-react';
import { type LandingPageMenuItem } from '@/lib/menu';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: LandingPageMenuItem[];
  children?: React.ReactNode; 
}

export function Sidebar({ isOpen, onClose, menuItems, children }: SidebarProps) {
  // --- FIX #2: Corrected the function call from `aState` to `useState` ---
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <aside className={`fixed top-0 left-0 h-full w-72 bg-background p-4 z-50 flex flex-col transition-transform lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-accent"><X size={24} /></button>
        </div>
        
        {/* Scrollable navigation area */}
        <div className="flex-1 overflow-y-auto pr-2">
            <nav className="flex flex-col">
            {menuItems.map((item) => (
                <div key={item.title} className="py-2 border-b border-border">
                {item.children ? (
                    // Accordion button for items with children
                    <>
                    <button
                        onClick={() => toggleMenu(item.title)}
                        className="w-full flex justify-between items-center text-lg p-2 rounded-md hover:bg-accent"
                    >
                        <span>{item.title}</span>
                        <ChevronDown className={cn("transition-transform duration-300", { "rotate-180": openMenu === item.title })} size={20} />
                    </button>
                    {/* Collapsible submenu */}
                    <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", {
                        'max-h-screen mt-2': openMenu === item.title,
                        'max-h-0': openMenu !== item.title
                    })}>
                        <div className="pl-4 flex flex-col space-y-1 border-l-2 ml-2">
                        {item.children.map((child) => (
                            <Link key={child.title} href={child.href} className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md" onClick={onClose}>
                            {child.title}
                            </Link>
                        ))}
                        </div>
                    </div>
                    </>
                ) : (
                    // Simple link for items without children
                    <Link href={item.href} className="text-lg p-2 block rounded-md hover:bg-accent" onClick={onClose}>{item.title}</Link>
                )}
                </div>
            ))}
            </nav>
        </div>
        
        <div className="mt-auto pt-4">{children}</div>
      </aside>
    </>
  );
}