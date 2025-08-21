import React from 'react';
import Link from 'next/link';
import { type HmsMenuItem } from '@/lib/menu';

interface NavbarAdminProps {
  menuItems: HmsMenuItem[];
  children?: React.ReactNode;
}

export function NavbarAdmin({ menuItems, children }: NavbarAdminProps) {
  return (
    <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
      {menuItems.map((item) => (
        !item.isSeparator && (
          <Link key={item.title} href={item.href} className="flex items-center gap-2 transition-colors text-muted-foreground hover:text-foreground">
            <item.Icon size={18} />
            {item.title}
          </Link>
        )
      ))}
      <div className="flex items-center space-x-4 pl-4">{children}</div>
    </nav>
  );
}