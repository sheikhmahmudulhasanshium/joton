"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { type LandingPageMenuItem } from "@/lib/menu";

interface NavbarProps {
  menuItems: LandingPageMenuItem[];
  // The children prop is no longer needed here
}

export function Navbar({ menuItems }: NavbarProps) {
  return (
    // The wrapper div has been removed to integrate into the new header layout
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item) =>
          item.children ? (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {item.children.map((child) => (
                    <ListItem key={child.title} href={child.href} title={child.title}>
                      {child.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.title}>
              <Link href={item.href} className={navigationMenuTriggerStyle()}>
                {item.title}
              </Link>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { href: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";