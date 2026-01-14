"use client"

import * as React from "react"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Locale } from "@/lib/i18n"

const languageConfig: Record<
  Locale,
  {
    flag: string
    name: string
    code: string
  }
> = {
  nl: { flag: "🇳🇱", name: "Nederlands", code: "nl" },
  en: { flag: "🇬🇧", name: "English", code: "en" },
  de: { flag: "🇩🇪", name: "Deutsch", code: "de" },
}

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-auto min-w-[3.5rem] px-2.5 flex items-center justify-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
          aria-label={t("language.select")}
        >
          <span className="text-sm leading-none">{languageConfig[locale].flag}</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter leading-none">
            {languageConfig[locale].code}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(languageConfig) as Locale[]).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLocale(lang)}
            className="flex items-center gap-2"
          >
            <span className="text-lg">{languageConfig[lang].flag}</span>
            <span>{languageConfig[lang].name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
