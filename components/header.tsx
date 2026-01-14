"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, BookOpen, Activity, FileText, ArrowRight } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { LanguageToggle } from "./language-toggle"
import { Logo } from "./logo"
import { useLanguage } from "./language-provider"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { getRoutes } from "@/lib/i18n/routes"

export function Header() {
  const { t, locale } = useLanguage()
  const routes = getRoutes(locale)
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const menuItems = [
    { href: routes.method, label: t("header.nav.method"), icon: BookOpen },
    { href: routes.trainingTypes, label: t("header.nav.trainingTypes"), icon: Activity },
    { href: routes.examples, label: t("header.nav.examples"), icon: FileText },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-50 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation - Show from md breakpoint */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0">
            {/* Menu Items */}
            <div className="flex items-center gap-4 lg:gap-6">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                      isActive
                        ? "text-orange-600 dark:text-orange-500"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 lg:gap-4 ml-2">
              {/* Language Toggle */}
              <div className="relative flex-shrink-0">
                <LanguageToggle />
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex-shrink-0">
                <ModeToggle />
              </div>

              {/* CTA Button */}
              <Link
                href={routes.createSchedule}
                className="px-4 lg:px-6 py-2.5 bg-orange-600 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 active:scale-95 whitespace-nowrap flex-shrink-0"
              >
                {t("header.nav.createSchedule")}
              </Link>
            </div>
          </div>

          {/* Mobile Navigation - Show below md breakpoint */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <LanguageToggle />
              <ModeToggle />
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="relative p-2 -mr-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors flex-shrink-0"
                  aria-label={open ? "Close menu" : "Open menu"}
                >
                  <Menu
                    className={`w-6 h-6 transition-all duration-200 ${
                      open ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
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
                        onClick={() => setOpen(false)}
                        className="p-2 -mr-2 rounded-full hover:bg-white/50 dark:hover:bg-zinc-700/50 transition-colors"
                        aria-label="Close menu"
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
                            onClick={() => setOpen(false)}
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
                        onClick={() => setOpen(false)}
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
        </div>
      </div>
    </nav>
  )
}
