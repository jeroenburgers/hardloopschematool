"use client"

import * as React from "react"
import { useLanguage } from "./language-provider"
import { Logo } from "./logo"
import { getRoutes } from "@/lib/i18n/routes"
import { getMenuItems } from "./header/menu-items"
import { DesktopNavigation } from "./header/desktop-navigation"
import { MobileNavigation } from "./header/mobile-navigation"

export function Header() {
  const { t, locale } = useLanguage()
  const routes = getRoutes(locale)
  const [open, setOpen] = React.useState(false)

  // Get menu items configuration
  const menuItemsConfig = getMenuItems(locale)
  // Transform to include translated labels
  const menuItems = menuItemsConfig.map((item) => ({
    ...item,
    label: t(item.labelKey),
  }))

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-50 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <DesktopNavigation menuItems={menuItems} routes={routes} />

          {/* Mobile Navigation */}
          <MobileNavigation
            menuItems={menuItems}
            routes={routes}
            open={open}
            onOpenChange={setOpen}
          />
        </div>
      </div>
    </nav>
  )
}
