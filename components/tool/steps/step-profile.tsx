import { CoachInsight } from "../coach-insight"
import type { ScheduleFormData } from "@/lib/types/schedule"

/**
 * Step Profile component
 * SOLAR: Autonomous Component - handles profile information independently
 */
interface StepProfileProps {
  formData: ScheduleFormData
  optionalNote: string
  genders: string[]
  ageGroups: string[]
  genderLabel: string
  ageGroupLabel: string
  profileSubtitle: string
  skipStepLabel: string
  onGenderChange: (gender: ScheduleFormData["gender"]) => void
  onAgeGroupChange: (ageGroup: string) => void
  onSkip: () => void
}

export function StepProfile({
  formData,
  optionalNote,
  genders,
  ageGroups,
  genderLabel,
  ageGroupLabel,
  profileSubtitle,
  skipStepLabel,
  onGenderChange,
  onAgeGroupChange,
  onSkip,
}: StepProfileProps) {
  return (
    <div className="grid grid-cols-1 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-zinc-950 rounded-[3.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000" />
        <div className="relative p-10 bg-white dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="max-w-md">
            <p className="text-zinc-400 dark:text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
              {profileSubtitle}
            </p>
          </div>
          <div className="w-full md:w-auto">
            <CoachInsight message={optionalNote} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="p-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-zinc-100 dark:border-zinc-800">
          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-600 rounded-full" /> {genderLabel}
          </label>
          <div className="flex flex-wrap gap-4">
            {genders.map((gender) => (
              <button
                key={gender}
                onClick={() => onGenderChange(gender as ScheduleFormData["gender"])}
                className={`flex-1 px-8 py-5 rounded-2xl border-4 font-black text-sm transition-all shadow-sm ${
                  formData.gender === gender
                    ? "bg-zinc-950 dark:bg-zinc-900 border-zinc-950 dark:border-zinc-800 text-white shadow-xl scale-105"
                    : "bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-95"
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        <div className="p-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-zinc-100 dark:border-zinc-800">
          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-zinc-950 dark:bg-zinc-600 rounded-full" /> {ageGroupLabel}
          </label>
          <div className="grid grid-cols-3 gap-4">
            {ageGroups.map((age) => (
              <button
                key={age}
                onClick={() => onAgeGroupChange(age)}
                className={`py-5 rounded-2xl border-4 font-black text-sm transition-all shadow-sm ${
                  formData.ageGroup === age
                    ? "bg-zinc-950 dark:bg-zinc-900 border-zinc-950 dark:border-zinc-800 text-white shadow-xl scale-105"
                    : "bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-95"
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={onSkip}
          className="px-8 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-950 dark:hover:text-zinc-50 transition-all rounded-full border-2 border-zinc-200 dark:border-zinc-700"
        >
          {skipStepLabel}
        </button>
      </div>
    </div>
  )
}
