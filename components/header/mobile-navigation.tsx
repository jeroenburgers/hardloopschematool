"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, ArrowRight } from "lucide-react"
import { useLanguage } from "../language-provider"
import { LanguageToggle } from "../language-toggle"
import { ModeToggle } from "../mode-toggle"
import { Logo } from "../logo"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { getRoutes } from "@/lib/i18n/routes"

interface MenuItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface MobileNavigationProps {
  menuItems: MenuItem[]
  routes: ReturnType<typeof getRoutes>
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNavigation({ menuItems, routes, open, onOpenChange }: MobileNavigationProps) {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <div className="md:hidden flex items-center gap-2 flex-shrink-0">
      <div className="flex items-center gap-1.5">
        <LanguageToggle />
        <ModeToggle />
      </div>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <button
            className="relative p-2 -mr-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors flex-shrink-0"
            aria-label={open ? t("header.closeMenu") : t("header.openMenu")}
          >
            <svg
              className={`w-6 h-6 transition-all duration-200 ${
                open ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <X
              className={`absolute inset-0 m-auto w-6 h-6 transition-all duration-200 ${
                open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
              }`}
            />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[380px] p-0 overflow-hidden [&>button]:hidden !data-[state=closed]:slide-out-to-right !data-[state=open]:slide-in-from-right"
        >
          <div className="flex flex-col h-full">
            {/* Header with gradient */}
            <div className="relative px-4 sm:px-6 pt-8 pb-6 bg-gradient-to-br from-orange-50 via-white to-orange-50/50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => onOpenChange(false)}
                  className="p-2 -mr-2 rounded-full hover:bg-white/50 dark:hover:bg-zinc-700/50 transition-colors"
                  aria-label={t("header.closeMenu")}
                >
                  <X className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <div className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => onOpenChange(false)}
                      className={`group relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 ${
                        isActive
                          ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                          : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-orange-600 dark:hover:text-orange-500"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 group-hover:text-orange-600 dark:group-hover:text-orange-500"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div
                          className={`text-sm font-bold uppercase tracking-wider ${
                            isActive ? "text-white" : "text-zinc-900 dark:text-zinc-100"
                          }`}
                        >
                          {item.label}
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-5 h-5 transition-transform ${
                          isActive
                            ? "text-white"
                            : "text-zinc-400 dark:text-zinc-500 group-hover:translate-x-1 group-hover:text-orange-600 dark:group-hover:text-orange-500"
                        }`}
                      />
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Footer with CTA and controls */}
            <div className="px-4 pb-6 pt-4 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex flex-col gap-3">
                {/* Controls */}
                <div className="flex items-center justify-center gap-3 pb-3">
                  <LanguageToggle />
                  <ModeToggle />
                </div>
                {/* CTA Button */}
                <Link
                  href={routes.createSchedule}
                  onClick={() => onOpenChange(false)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30 active:scale-95"
                >
                  {t("header.nav.createSchedule")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
