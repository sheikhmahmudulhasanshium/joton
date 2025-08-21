// app/components/common/sidebar-admin.tsx

import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { type HmsMenuItem } from '@/lib/menu';

interface SidebarAdminProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: HmsMenuItem[];
  children?: React.ReactNode;
}

export function SidebarAdmin({ isOpen, onClose, menuItems, children }: SidebarAdminProps) {
  return (
    <>
      {/* --- CHANGE: Increased z-index from z-30 to z-40 --- */}
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      
      {/* --- CHANGE: Increased z-index from z-40 to z-50 --- */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-background p-4 z-50 flex flex-col transform transition-transform lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-semibold">Admin Menu</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-accent"><X size={24} /></button>
        </div>
        
        {/* Scrollable navigation area */}
        <div className="flex-1 overflow-y-auto pr-2">
            <nav className="flex flex-col space-y-1">
            {menuItems.map((item) => (
                <React.Fragment key={item.title}>
                <Link href={item.href} className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent" onClick={onClose}>
                    <item.Icon size={20} />
                    <span>{item.title}</span>
                </Link>
                {item.isSeparator && <hr className="my-2 border-border" />}
                </React.Fragment>
            ))}
            </nav>
        </div>
        <div className="mt-auto pt-4 border-t border-border">{children}</div>
      </aside>
    </>
  );
}