"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { getRoutes } from "@/lib/i18n/routes"
import { Zap } from "lucide-react"

export function Footer() {
  const { t, locale } = useLanguage()
  const routes = getRoutes(locale)
  const appName = t("common.appName")

  // Split appName on "Tool" or "tool" to highlight the last part
  const toolRegex = /(.*?)([Tt]ool)$/
  const match = appName.match(toolRegex)

  const renderText = () => {
    if (match) {
      const beforeTool = match[1]
      const toolPart = match[2]
      return (
        <>
          {beforeTool}
          <span className="text-orange-600">{toolPart}</span>
        </>
      )
    }
    return appName
  }

  const navItems = [
    { href: "/", label: t("footer.navigation.home") },
    { href: routes.method, label: t("footer.navigation.method") },
    { href: routes.trainingTypes, label: t("footer.navigation.trainingTypes") },
    { href: routes.examples, label: t("footer.navigation.examples") },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-zinc-950 text-gray-400 dark:text-zinc-500 py-16 border-t border-gray-800 dark:border-zinc-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="currentColor" strokeWidth={2} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">{renderText()}</span>
            </div>
            <p className="max-w-sm text-gray-400 dark:text-zinc-500 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white dark:text-zinc-100 font-bold mb-6">
              {t("footer.navigation.title")}
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 dark:border-zinc-800 text-center text-xs">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
