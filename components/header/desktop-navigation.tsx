"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "../language-provider"
import { ModeToggle } from "../mode-toggle"
import { getRoutes } from "@/lib/i18n/routes"

interface MenuItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface DesktopNavigationProps {
  menuItems: MenuItem[]
  routes: ReturnType<typeof getRoutes>
}

export function DesktopNavigation({ menuItems, routes }: DesktopNavigationProps) {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
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
        {/* <div className="relative flex-shrink-0">
          <LanguageToggle />
        </div> */}

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
  )
}
