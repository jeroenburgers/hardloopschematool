"use client"

import { useLanguage } from "./language-provider"
import { Shield, Zap } from "lucide-react"
import Image from "next/image"

export function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 rounded-full text-[9px] font-black uppercase tracking-widest mb-6">
              {t("home.features.badge")}
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-zinc-950 dark:text-zinc-50 tracking-tighter leading-none mb-8">
              {t("home.features.title")} <br />
              <span className="text-orange-600 dark:text-orange-500 italic">
                {t("home.features.titleHighlight")}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl flex items-center justify-center shadow-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-zinc-900 dark:text-zinc-100 leading-none">
                  {t("home.features.bodyMonitoring.title")}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm leading-relaxed">
                  {t("home.features.bodyMonitoring.description")}
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-2xl flex items-center justify-center shadow-xl">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-zinc-900 dark:text-zinc-100 leading-none">
                  {t("home.features.smartPlanning.title")}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm leading-relaxed">
                  {t("home.features.smartPlanning.description")}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-[4rem] p-12 border-4 border-zinc-50 dark:border-zinc-700 shadow-2xl relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-600 rounded-[2.5rem] flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-orange-600/30">
              {t("home.testimonial.rating")}
            </div>
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-700 rounded-3xl overflow-hidden shadow-sm">
                <Image
                  src="https://i.pravatar.cc/150?u=sander"
                  alt={t("home.testimonial.name")}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-black text-zinc-950 dark:text-zinc-50 text-xl leading-none">
                  {t("home.testimonial.name")}
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-500 mt-2">
                  {t("home.testimonial.role")}
                </p>
              </div>
            </div>
            <p className="text-2xl font-bold text-zinc-700 dark:text-zinc-300 leading-snug italic tracking-tight">
              &ldquo;{t("home.testimonial.quote")}&rdquo;
            </p>
            <div className="mt-10 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-orange-500 text-xl">
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
