"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "./language-provider"
import Image from "next/image"
import { Badge } from "./ui/badge"
import { useActiveRunners } from "@/hooks/use-active-runners"
import { getRoutes } from "@/lib/i18n/routes"
import type { Goal } from "@/lib/types/schedule"

/**
 * Map select value to Goal type
 */
function mapSelectValueToGoal(value: string): Goal {
  const goalMap: Record<string, Goal> = {
    "5k": "5 kilometer",
    "10k": "10 kilometer",
    "15k": "15 kilometer",
    "10m": "10 mijl (16,1 kilometer)",
    halfMarathon: "Halve marathon (21,1 kilometer)",
    "30k": "30 kilometer",
    marathon: "Marathon (42,2 kilometer)",
    fitness: "Conditie / Gezondheid",
  }
  return goalMap[value] || "5 kilometer"
}

export function Hero() {
  const { t, locale } = useLanguage()
  const router = useRouter()
  const routes = getRoutes(locale)
  const { emoji, message, isReady } = useActiveRunners()
  const [selectedGoal, setSelectedGoal] = useState<string>("5k")

  const handleStart = () => {
    const goal = mapSelectValueToGoal(selectedGoal)
    // Store goal in sessionStorage instead of URL
    if (typeof window !== "undefined") {
      sessionStorage.setItem("initialGoal", goal)
    }
    router.push(routes.createSchedule)
  }

  return (
    <div className="flex flex-col items-center">
      <Badge variant="dark" size="lg" className="mb-8 shadow-xl">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
        </span>
        <span>{t("hero.badge")}</span>
      </Badge>
      <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 text-centerdrop-shadow-2xl">
        {t("hero.title")} <br />
        <span className="text-orange-500 italic">{t("hero.titleHighlight")}</span>
      </h1>
      <p className="text-lg md:text-xl text-zinc-300 dark:text-zinc-400 font-medium leading-relaxed mb-12 text-center">
        {t("hero.description")}
      </p>
      <div className="w-full max-w-lg relative">
        <div className="absolute -top-4 -right-4 bg-orange-600 text-white text-[9px] font-black px-3 py-1 rounded-full z-20 shadow-lg uppercase tracking-widest">
          {t("hero.form.price")}
        </div>
        <div className="p-3 bg-white dark:bg-zinc-800 rounded-[2.5rem] shadow-2xl flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full px-6 py-2">
            <label className="block text-left text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">
              {t("hero.form.label")}
            </label>
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full bg-transparent text-lg font-black text-zinc-950 dark:text-zinc-50 outline-none appearance-none cursor-pointer hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
            >
              <option value="5k">{t("hero.form.options.5k")}</option>
              <option value="10k">{t("hero.form.options.10k")}</option>
              <option value="15k">{t("hero.form.options.15k")}</option>
              <option value="10m">{t("hero.form.options.10m")}</option>
              <option value="halfMarathon">{t("hero.form.options.halfMarathon")}</option>
              <option value="30k">{t("hero.form.options.30k")}</option>
              <option value="marathon">{t("hero.form.options.marathon")}</option>
              <option value="fitness">{t("hero.form.options.fitness")}</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleStart}
            className="w-full sm:w-auto px-12 py-5 bg-orange-600 text-white rounded-3xl font-black text-sm uppercase tracking-[0.1em] hover:bg-orange-700 hover:scale-[1.02] transition-all shadow-xl active:scale-95"
          >
            {t("hero.form.button")}
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          <span className="flex items-center gap-2">{t("hero.features.professional")}</span>
          <span className="flex items-center gap-2">{t("hero.features.proven")}</span>
        </div>
        {isReady && (
          <div className="flex items-center gap-3 px-6 py-3 bg-zinc-900/50 dark:bg-zinc-800/50 backdrop-blur-md rounded-2xl border border-white/5 dark:border-zinc-700/50 shadow-inner">
            <div className="flex -space-x-2 flex-shrink-0">
              <div className="w-6 h-6 rounded-full border-2 border-zinc-900 dark:border-zinc-800 bg-zinc-800 dark:bg-zinc-700 overflow-hidden">
                <Image
                  src="https://i.pravatar.cc/100?u=123"
                  alt="User"
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-zinc-900 dark:border-zinc-800 bg-zinc-800 dark:bg-zinc-700 overflow-hidden">
                <Image
                  src="https://i.pravatar.cc/100?u=246"
                  alt="User"
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-zinc-900 dark:border-zinc-800 bg-zinc-800 dark:bg-zinc-700 overflow-hidden">
                <Image
                  src="https://i.pravatar.cc/100?u=369"
                  alt="User"
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-[11px] font-black text-orange-500 uppercase tracking-widest animate-pulse whitespace-nowrap">
              {emoji} {message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
