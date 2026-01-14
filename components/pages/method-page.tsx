"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { Check } from "lucide-react"
import { getRoutes } from "@/lib/i18n/routes"
import Link from "next/link"

export function MethodPage() {
  const { t, locale } = useLanguage()
  const routes = getRoutes(locale)

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-32 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 rounded-full text-[9px] font-black uppercase tracking-widest mb-6">
              {t("pages.method.badge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-zinc-950 dark:text-zinc-50 mb-6">
              {t("pages.method.title")} <br />
              <span className="text-orange-600 dark:text-orange-500">
                {t("pages.method.titleHighlight")}
              </span>
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
              {t("pages.method.description")}
            </p>
          </div>

          <div className="space-y-32">
            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 font-bold text-xl mb-6 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                  {t("pages.method.step1.number")}
                </div>
                <h2 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 mb-6">
                  {t("pages.method.step1.title")}
                </h2>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                  {t("pages.method.step1.description")}
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-bold text-sm">
                      {t("pages.method.step1.points.distance")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-bold text-sm">
                      {t("pages.method.step1.points.schedule")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-bold text-sm">
                      {t("pages.method.step1.points.physical")}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] p-8 aspect-video flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-inner">
                <div className="text-zinc-400 dark:text-zinc-500 text-sm italic font-medium">
                  {t("pages.method.step1.visualization")}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 font-bold text-xl mb-6 border border-orange-200 dark:border-orange-800 shadow-sm">
                  {t("pages.method.step2.number")}
                </div>
                <h2 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 mb-6">
                  {t("pages.method.step2.title")}
                </h2>
                <p
                  className="text-lg text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: t("pages.method.step2.description"),
                  }}
                />
                <div className="p-6 bg-zinc-950 dark:bg-zinc-800 rounded-2xl border border-zinc-800 dark:border-zinc-700 shadow-xl">
                  <p className="text-zinc-100 dark:text-zinc-200 font-medium italic text-lg leading-relaxed">
                    &ldquo;{t("pages.method.step2.quote")}&rdquo;
                  </p>
                </div>
              </div>
              <div className="lg:order-1 bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] p-8 aspect-video flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-inner">
                <div className="text-zinc-400 dark:text-zinc-500 text-sm italic font-medium">
                  {t("pages.method.step2.visualization")}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 font-bold text-xl mb-6 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                  {t("pages.method.step3.number")}
                </div>
                <h2 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 mb-6">
                  {t("pages.method.step3.title")}
                </h2>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                  {t("pages.method.step3.description")}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl shadow-sm">
                    <span className="block text-orange-600 dark:text-orange-500 font-black mb-1 text-xs uppercase tracking-wider">
                      {t("pages.method.step3.focus.label")}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">
                      {t("pages.method.step3.focus.value")}
                    </span>
                  </div>
                  <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl shadow-sm">
                    <span className="block text-zinc-950 dark:text-zinc-50 font-black mb-1 text-xs uppercase tracking-wider">
                      {t("pages.method.step3.output.label")}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">
                      {t("pages.method.step3.output.value")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] p-8 aspect-video flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-inner">
                <div className="text-zinc-400 dark:text-zinc-500 text-sm italic font-medium">
                  {t("pages.method.step3.visualization")}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-32 p-16 bg-zinc-950 dark:bg-zinc-900 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
              {t("pages.method.cta.title")}
            </h2>
            <p className="text-zinc-400 dark:text-zinc-500 max-w-xl mx-auto mb-12 text-lg font-medium">
              {t("pages.method.cta.description")}
            </p>
            <Link
              href={routes.createSchedule}
              className="inline-block px-12 py-6 bg-orange-600 hover:bg-orange-700 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-orange-600/20 active:scale-95"
            >
              {t("pages.method.cta.button")}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
