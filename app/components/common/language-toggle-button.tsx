// app/components/common/language-toggle.tsx

"use client"

import * as React from "react"
import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  // In a real application, you would use a library like 'next-i18next'
  // and its `useTranslation` hook to change the language.
  const setLanguage = (lang: string) => {
    console.log("Language changed to:", lang);
    // i18n.changeLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* These are placeholder items */}
        <DropdownMenuItem onClick={() => setLanguage("bn")}>
          বাংলা
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          English
        </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}