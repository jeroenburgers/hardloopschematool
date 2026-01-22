"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  ArrowLeft,
  Target,
  User,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Activity,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  List,
  Zap,
  Heart,
  Play,
} from "lucide-react"
import type { RunningSchedule, TrainingDay } from "@/lib/types/schedule"
import { useLanguage } from "@/components/language-provider"
import { getRoutes } from "@/lib/i18n/routes"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface ExampleSchedulePageProps {
  schedule: RunningSchedule
}

const intensityColors: Record<string, string> = {
  "Zeer licht": "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  Licht: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  Matig: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  Zwaar: "bg-orange-200 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
}

function formatDate(dateString?: string): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })
}

function hasWorkoutContent(day: TrainingDay): boolean {
  if (!day.workoutDetails) return false
  const { warmup, interval, mainBody, strides, cooldown } = day.workoutDetails
  return !!(warmup || interval || mainBody || strides || cooldown)
}

function InteractiveWeekView({ schedule }: { schedule: RunningSchedule }) {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)
  const currentWeek = schedule.weeks[currentWeekIndex]

  const handlePrevWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    }
  }

  const handleNextWeek = () => {
    if (currentWeekIndex < schedule.weeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    }
  }

  // Smart pagination logic
  const totalWeeks = schedule.weeks.length
  const maxVisible = 7 // Maximum number of week buttons to show
  const getWeekNumbers = () => {
    if (totalWeeks <= maxVisible) {
      // Show all weeks if they fit
      return schedule.weeks.map((_, idx) => idx)
    }

    const pages: (number | "ellipsis")[] = []
    const current = currentWeekIndex
    const showEllipsis = totalWeeks > maxVisible

    if (current < 3) {
      // Show first pages
      for (let i = 0; i < Math.min(5, totalWeeks); i++) {
        pages.push(i)
      }
      if (totalWeeks > 5) {
        pages.push("ellipsis")
        pages.push(totalWeeks - 1)
      }
    } else if (current > totalWeeks - 4) {
      // Show last pages
      pages.push(0)
      if (totalWeeks > 5) {
        pages.push("ellipsis")
      }
      for (let i = Math.max(0, totalWeeks - 5); i < totalWeeks; i++) {
        pages.push(i)
      }
    } else {
      // Show middle pages
      pages.push(0)
      pages.push("ellipsis")
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push("ellipsis")
      pages.push(totalWeeks - 1)
    }

    return pages
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Week Navigation */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 mb-6 sm:mb-8">
        <button
          onClick={handlePrevWeek}
          disabled={currentWeekIndex === 0}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all ${
            currentWeekIndex === 0
              ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
              : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 hover:border-orange-500 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20"
          }`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Vorige</span>
        </button>

        {/* Week Selector */}
        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
          {getWeekNumbers().map((item, idx) => {
            if (item === "ellipsis") {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 text-zinc-400 dark:text-zinc-600">
                  ...
                </span>
              )
            }
            const weekNum = schedule.weeks[item].weekNumber
            return (
              <button
                key={weekNum}
                onClick={() => {
                  setCurrentWeekIndex(item)
                }}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-bold text-xs sm:text-sm transition-all ${
                  item === currentWeekIndex
                    ? "bg-orange-600 text-white shadow-lg"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {weekNum}
              </button>
            )
          })}
        </div>

        <button
          onClick={handleNextWeek}
          disabled={currentWeekIndex === schedule.weeks.length - 1}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all ${
            currentWeekIndex === schedule.weeks.length - 1
              ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
              : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 hover:border-orange-500 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20"
          }`}
        >
          <span className="hidden sm:inline">Volgende</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Current Week Display */}
      <div className="bg-white dark:bg-zinc-900/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-zinc-200 dark:border-zinc-800 shadow-lg">
        {/* Week Header */}
        <div className="mb-6 sm:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b-2 border-zinc-200 dark:border-zinc-800">
            {/* Week Number and Focus */}
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="relative flex-shrink-0">
                <span className="text-5xl sm:text-7xl lg:text-8xl font-black text-zinc-200 dark:text-zinc-800 tracking-tighter leading-none">
                  {String(currentWeek.weekNumber).padStart(2, "0")}
                </span>
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-orange-600 rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-orange-600 mb-1 sm:mb-2">
                  Week {currentWeek.weekNumber} • Trainingsfase
                </div>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-zinc-950 dark:text-zinc-50 leading-tight">
                  {currentWeek.focus}
                </h3>
              </div>
            </div>

            {/* Week Summary Stats */}
            <div className="flex gap-3 sm:gap-6 lg:gap-8 flex-shrink-0 mt-4 lg:mt-0">
              <div className="text-center lg:text-right min-w-[60px] sm:min-w-[80px]">
                <div className="text-[10px] sm:text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1 sm:mb-2">
                  Afstand
                </div>
                <div className="text-lg sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
                  {currentWeek.weekSummary.totalDistance}
                </div>
              </div>
              <div className="w-px bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="text-center lg:text-right min-w-[70px] sm:min-w-[100px]">
                <div className="text-[10px] sm:text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1 sm:mb-2">
                  Duur
                </div>
                <div className="text-lg sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
                  {currentWeek.weekSummary.totalDuration}
                </div>
              </div>
              <div className="w-px bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="text-center lg:text-right min-w-[50px] sm:min-w-[60px]">
                <div className="text-[10px] sm:text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1 sm:mb-2">
                  Dagen
                </div>
                <div className="text-lg sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
                  {currentWeek.weekSummary.trainingDays}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Training Days List */}
        <div className="space-y-4 sm:space-y-6">
          {currentWeek.days.map((day, idx) => {
            const intensityColor =
              intensityColors[day.intensity] ||
              "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"

            return (
              <div
                key={idx}
                className="bg-zinc-50 dark:bg-zinc-900/30 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-zinc-200 dark:border-zinc-800"
              >
                {/* Day Header */}
                <div
                  className={
                    hasWorkoutContent(day)
                      ? "pb-6 border-b border-zinc-200 dark:border-zinc-800"
                      : ""
                  }
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                          <span className="text-lg font-black text-zinc-950 dark:text-zinc-50">
                            {day.type}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${intensityColor}`}
                          >
                            {day.intensity}
                          </span>
                        </div>
                        {day.date && (
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                            {day.day} • {formatDate(day.date)}
                          </div>
                        )}
                        {!day.date && day.day && (
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                            {day.day}
                          </div>
                        )}
                        {day.description && (
                          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-1">
                            {day.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                        <span className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                          {day.distance}
                        </span>
                      </div>
                      <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700"></div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                        <span className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                          {day.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workout Details - Always Visible */}
                {day.workoutDetails && <WorkoutDetailsCard day={day} />}

                {/* Technical Data Footer */}
                {day.workoutDetails?.technicalData && (
                  <div className="mt-4 pt-4">
                    <TechnicalDataFooter technicalData={day.workoutDetails.technicalData} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ListScheduleView({ schedule }: { schedule: RunningSchedule }) {
  return (
    <div className="space-y-12 sm:space-y-20">
      {schedule.weeks.map((week) => (
        <div key={week.weekNumber} className="relative">
          {/* Week Header */}
          <div className="mb-6 sm:mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b-2 border-zinc-200 dark:border-zinc-800">
              {/* Week Number and Focus */}
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="relative flex-shrink-0">
                  <span className="text-5xl sm:text-7xl lg:text-8xl font-black text-zinc-200 dark:text-zinc-800 tracking-tighter leading-none">
                    {String(week.weekNumber).padStart(2, "0")}
                  </span>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-orange-600 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-orange-600 mb-1 sm:mb-2">
                    Week {week.weekNumber} • Trainingsfase
                  </div>
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-zinc-950 dark:text-zinc-50 leading-tight">
                    {week.focus}
                  </h3>
                </div>
              </div>

              {/* Week Summary Stats */}
              <div className="flex gap-3 sm:gap-6 lg:gap-8 flex-shrink-0 mt-4 lg:mt-0">
                <div className="text-center lg:text-right min-w-[60px] sm:min-w-[80px]">
                  <div className="text-[10px] sm:text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1 sm:mb-2">
                    Afstand
                  </div>
                  <div className="text-lg sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
                    {week.weekSummary.totalDistance}
                  </div>
                </div>
                <div className="w-px bg-zinc-200 dark:bg-zinc-800"></div>
                <div className="text-center lg:text-right min-w-[70px] sm:min-w-[100px]">
                  <div className="text-[10px] sm:text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1 sm:mb-2">
                    Duur
                  </div>
                  <div className="text-lg sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
                    {week.weekSummary.totalDuration}
                  </div>
                </div>
                <div className="w-px bg-zinc-200 dark:bg-zinc-800"></div>
                <div className="text-center lg:text-right min-w-[50px] sm:min-w-[60px]">
                  <div className="text-[10px] sm:text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1 sm:mb-2">
                    Dagen
                  </div>
                  <div className="text-lg sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
                    {week.weekSummary.trainingDays}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Training Days List */}
          <div className="space-y-4 sm:space-y-6">
            {week.days.map((day, idx) => {
              const intensityColor =
                intensityColors[day.intensity] ||
                "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"

              return (
                <div
                  key={idx}
                  className="bg-zinc-50 dark:bg-zinc-900/30 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-zinc-200 dark:border-zinc-800"
                >
                  {/* Day Header */}
                  <div
                    className={
                      hasWorkoutContent(day)
                        ? "pb-6 border-b border-zinc-200 dark:border-zinc-800"
                        : ""
                    }
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                            <span className="text-lg font-black text-zinc-950 dark:text-zinc-50">
                              {day.type}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${intensityColor}`}
                            >
                              {day.intensity}
                            </span>
                          </div>
                          {day.date && (
                            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                              {day.day} • {formatDate(day.date)}
                            </div>
                          )}
                          {!day.date && day.day && (
                            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                              {day.day}
                            </div>
                          )}
                          {day.description && (
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-1">
                              {day.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-zinc-400" />
                          <span className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                            {day.distance}
                          </span>
                        </div>
                        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-zinc-400" />
                          <span className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                            {day.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workout Details */}
                  {day.workoutDetails && <WorkoutDetailsCard day={day} />}

                  {/* Technical Data Footer */}
                  {day.workoutDetails?.technicalData && (
                    <div className="">
                      <TechnicalDataFooter technicalData={day.workoutDetails.technicalData} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function WorkoutDetailsCard({ day }: { day: TrainingDay }) {
  if (!day.workoutDetails) return null

  const { warmup, interval, mainBody, strides, cooldown } = day.workoutDetails

  // Check if there's any content to display
  const hasContent = warmup || interval || mainBody || strides || cooldown
  if (!hasContent) return null

  // Determine which is the last item
  const items = [
    warmup && "warmup",
    interval && "interval",
    mainBody && "mainBody",
    strides && "strides",
    cooldown && "cooldown",
  ].filter(Boolean)
  const lastItem = items[items.length - 1]

  const getRpeColor = (rpe: number) => {
    if (rpe <= 3) return "bg-green-500"
    if (rpe <= 5) return "bg-yellow-500"
    if (rpe <= 7) return "bg-orange-500"
    return "bg-orange-600"
  }

  return (
    <div className="pt-6">
      <div className="space-y-0">
        {/* Warmup */}
        {warmup && (
          <div
            className={`flex items-start gap-4 pt-4 ${lastItem === "warmup" ? "pb-0" : "pb-4 border-b border-zinc-200 dark:border-zinc-800"} first:pt-0`}
          >
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2">
                Warming-up
              </div>
              <p className="text-sm text-zinc-900 dark:text-zinc-100 mb-3 leading-relaxed">
                {warmup.description}
              </p>
              {(warmup.duration || warmup.distance) && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-300">
                  {warmup.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span className="font-medium">{warmup.duration}</span>
                    </div>
                  )}
                  {warmup.distance && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span className="font-medium">{warmup.distance}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Interval */}
        {interval && (
          <div
            className={`flex items-start gap-4 pt-4 ${lastItem === "interval" ? "pb-0" : "pb-4 border-b border-zinc-200 dark:border-zinc-800"} first:pt-0`}
          >
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2">
                Interval
              </div>
              <div className="text-base font-black text-zinc-950 dark:text-zinc-50 mb-3">
                {interval.reps} × {interval.durationPerRep || interval.distancePerRep || "rep"}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-300">
                <span>
                  <span className="font-semibold">Tempo:</span> {interval.targetPace}
                </span>
                <span>•</span>
                <span>
                  <span className="font-semibold">Herstel:</span> {interval.recovery}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Body */}
        {mainBody && (
          <div
            className={`flex items-start gap-4 pt-4 ${lastItem === "mainBody" ? "pb-0" : "pb-4 border-b border-zinc-200 dark:border-zinc-800"} first:pt-0`}
          >
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2">
                Hoofdgedeelte
              </div>
              <p className="text-sm text-zinc-900 dark:text-zinc-100 mb-3 leading-relaxed">
                {mainBody.description}
              </p>
              {(mainBody.duration || mainBody.distance || mainBody.targetPace) && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-300">
                  {mainBody.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span className="font-medium">{mainBody.duration}</span>
                    </div>
                  )}
                  {mainBody.distance && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span className="font-medium">{mainBody.distance}</span>
                    </div>
                  )}
                  {mainBody.targetPace && (
                    <div>
                      <span className="font-semibold">Tempo:</span> {mainBody.targetPace}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Strides */}
        {strides && (
          <div
            className={`flex items-start gap-4 pt-4 ${lastItem === "strides" ? "pb-0" : "pb-4 border-b border-zinc-200 dark:border-zinc-800"} first:pt-0`}
          >
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2">
                Strides
              </div>
              <div className="text-sm text-zinc-900 dark:text-zinc-100">
                <span className="font-black">{strides.count}</span> × {strides.description}
              </div>
            </div>
          </div>
        )}

        {/* Cooldown */}
        {cooldown && (
          <div
            className={`flex items-start gap-4 pt-4 ${lastItem === "cooldown" ? "pb-0" : "pb-4 border-b border-zinc-200 dark:border-zinc-800"} first:pt-0`}
          >
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2">
                Cooling-down
              </div>
              <p className="text-sm text-zinc-900 dark:text-zinc-100 mb-3 leading-relaxed">
                {cooldown.description}
              </p>
              {(cooldown.duration || cooldown.distance) && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-300">
                  {cooldown.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span className="font-medium">{cooldown.duration}</span>
                    </div>
                  )}
                  {cooldown.distance && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span className="font-medium">{cooldown.distance}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TechnicalDataFooter({
  technicalData,
}: {
  technicalData: { rpe: number; trainingEffect: string; surface?: string }
}) {
  const getRpeColor = (rpe: number) => {
    if (rpe <= 3) return "bg-green-500"
    if (rpe <= 5) return "bg-yellow-500"
    if (rpe <= 7) return "bg-orange-500"
    return "bg-orange-600"
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400">
      <span className="font-medium">RPE {technicalData.rpe}/10</span>
      <span>•</span>
      <span>{technicalData.trainingEffect}</span>
      {technicalData.surface && (
        <>
          <span>•</span>
          <span>{technicalData.surface}</span>
        </>
      )}
      <div className="ml-auto flex items-center gap-1.5">
        <div className="w-12 h-0.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${getRpeColor(technicalData.rpe)} transition-all duration-500 rounded-full`}
            style={{ width: `${(technicalData.rpe / 10) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

function InteractiveHero({
  schedule,
  createScheduleHref,
  seoH1,
}: {
  schedule: RunningSchedule
  createScheduleHref: string
  seoH1: string
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const steps = [
    {
      id: "title",
      icon: Sparkles,
      title: seoH1, // Use SEO-friendly H1 term
      content: schedule.overview,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "summary",
      icon: Target,
      title: "Schema Details",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4 md:mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/20">
            <div className="text-[9px] sm:text-[10px] md:text-xs font-black text-white/70 uppercase tracking-widest mb-1.5 sm:mb-2">
              Doel
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-black text-white break-words">
              {schedule.summary.goal}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/20">
            <div className="text-[9px] sm:text-[10px] md:text-xs font-black text-white/70 uppercase tracking-widest mb-1.5 sm:mb-2">
              Afstand
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-black text-white break-words">
              {schedule.summary.targetDistance}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/20">
            <div className="text-[9px] sm:text-[10px] md:text-xs font-black text-white/70 uppercase tracking-widest mb-1.5 sm:mb-2">
              Duur
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-black text-white break-words">
              {schedule.summary.duration}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/20">
            <div className="text-[9px] sm:text-[10px] md:text-xs font-black text-white/70 uppercase tracking-widest mb-1.5 sm:mb-2">
              Methode
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-black text-white break-words">
              {schedule.summary.trainingMethod}
            </div>
          </div>
        </div>
      ),
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "profile",
      icon: User,
      title: "Lopersprofiel",
      content: (
        <div className="space-y-2.5 sm:space-y-3 md:space-y-4 mt-3 sm:mt-4 md:mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/20">
            <div className="text-[10px] sm:text-xs md:text-sm font-bold text-white/80 mb-1.5 sm:mb-2">
              Ervaring
            </div>
            <div className="text-xs sm:text-sm md:text-base text-white leading-relaxed break-words">
              {schedule.runnerProfile.experience}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/20">
            <div className="text-[10px] sm:text-xs md:text-sm font-bold text-white/80 mb-1.5 sm:mb-2">
              Motivatie
            </div>
            <div className="text-xs sm:text-sm md:text-base text-white leading-relaxed break-words">
              {schedule.runnerProfile.motivation}
            </div>
          </div>
        </div>
      ),
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "strategy",
      icon: TrendingUp,
      title: "Coach Strategie",
      content: (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/20 mt-3 sm:mt-4 md:mt-6">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white leading-relaxed break-words">
            {schedule.summary.coachStrategy}
          </p>
        </div>
      ),
      color: "from-purple-500 to-purple-600",
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1 && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0 && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="relative mb-16 sm:mb-20 lg:mb-24 rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=2500"
          alt="Runner on the road"
          fill
          className="object-cover scale-105 transition-transform duration-1000"
          priority
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentStepData.color} opacity-90 transition-opacity duration-500`}
        ></div>
        <div className="absolute inset-0 bg-zinc-950/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex flex-col">
        {/* Progress Dots */}
        <div className="absolute top-3 sm:top-4 md:top-6 lg:top-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setTimeout(() => {
                    setCurrentStep(idx)
                    setIsAnimating(false)
                  }, 300)
                }
              }}
              className={`transition-all duration-300 ${
                idx === currentStep
                  ? "w-8 sm:w-12 h-1.5 sm:h-2 bg-white rounded-full"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 rounded-full hover:bg-white/60"
              }`}
              aria-label={`Ga naar stap ${idx + 1}`}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-start sm:items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-24 md:pt-16 lg:pt-20 pb-16 sm:pb-20 md:pb-16 lg:pb-20">
          <div
            className={`w-full max-w-6xl xl:max-w-7xl transition-all duration-500 min-h-[280px] sm:min-h-[320px] md:min-h-[400px] flex flex-col justify-start sm:justify-center ${
              isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs font-black text-white/70 uppercase tracking-widest">
                Stap {currentStep + 1} van {steps.length}
              </div>
            </div>

            {currentStep === 0 ? (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black tracking-tighter leading-[0.95] mb-3 sm:mb-4 md:mb-6 text-white break-words">
                {currentStepData.title}
              </h1>
            ) : (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black tracking-tighter leading-[0.95] mb-3 sm:mb-4 md:mb-6 text-white break-words">
                {currentStepData.title}
              </h2>
            )}

            {typeof currentStepData.content === "string" ? (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 font-medium leading-relaxed break-words">
                {currentStepData.content}
              </p>
            ) : (
              <div className="overflow-x-auto flex-1">{currentStepData.content}</div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-0 right-0 z-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between max-w-6xl xl:max-w-7xl mx-auto gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0 || isAnimating}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all flex-shrink-0 ${
                currentStep === 0 || isAnimating
                  ? "bg-white/10 text-white/30 cursor-not-allowed"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Vorige</span>
            </button>

            <div className="flex gap-1.5 sm:gap-2 flex-1 justify-center">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setTimeout(() => {
                        setCurrentStep(idx)
                        setIsAnimating(false)
                      }, 300)
                    }
                  }}
                  className={`h-2 sm:h-2.5 rounded-full transition-all ${
                    idx === currentStep
                      ? "bg-white w-8 sm:w-12"
                      : "bg-white/40 hover:bg-white/60 w-2 sm:w-2.5"
                  }`}
                  aria-label={`Ga naar stap ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1 || isAnimating}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all flex-shrink-0 ${
                currentStep === steps.length - 1 || isAnimating
                  ? "bg-white/10 text-white/30 cursor-not-allowed"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"
              }`}
            >
              <span className="hidden sm:inline">Volgende</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExampleSchedulePage({ schedule }: ExampleSchedulePageProps) {
  const { locale } = useLanguage()
  const routes = getRoutes(locale)
  const createScheduleHref = `/${routes.createSchedule}`
  const [viewMode, setViewMode] = useState<"interactive" | "list">("interactive")

  // Determine SEO-friendly H1 text based on schedule
  const targetDistance = schedule.summary.targetDistance.toLowerCase()
  const is5km = targetDistance.includes("5") || schedule.summary.goal.toLowerCase().includes("5")
  const is10km = targetDistance.includes("10") || schedule.summary.goal.toLowerCase().includes("10")
  const seoH1 = is5km
    ? "5km Hardloopschema"
    : is10km
      ? "10km Hardloopschema"
      : `${schedule.summary.targetDistance} Hardloopschema`

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <div className="mb-8 sm:mb-12">
            <Link
              href="/voorbeeldschemas"
              className="inline-flex items-center gap-3 text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 font-black uppercase tracking-widest text-[10px] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voorbeeldschema&apos;s
            </Link>
          </div>

          {/* Interactive Hero Wizard */}
          <InteractiveHero
            schedule={schedule}
            createScheduleHref={createScheduleHref}
            seoH1={seoH1}
          />

          {/* Weeks Section - Interactive or List View */}
          <section className="mt-12 sm:mt-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="flex items-center gap-2 sm:gap-3">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 dark:text-zinc-50">
                  Trainingsschema
                </h2>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 sm:gap-2 bg-zinc-100 dark:bg-zinc-900 rounded-xl sm:rounded-2xl p-1 sm:p-1.5">
                <button
                  onClick={() => setViewMode("interactive")}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    viewMode === "interactive"
                      ? "bg-white dark:bg-zinc-800 text-orange-600 shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Interactief</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    viewMode === "list"
                      ? "bg-white dark:bg-zinc-800 text-orange-600 shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Lijst</span>
                </button>
              </div>
            </div>

            {viewMode === "interactive" ? (
              <InteractiveWeekView schedule={schedule} />
            ) : (
              <ListScheduleView schedule={schedule} />
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
