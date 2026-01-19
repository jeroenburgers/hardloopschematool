"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type MethodIllustrationVariant = "intake" | "logic" | "output"

interface MethodIllustrationProps {
  variant: MethodIllustrationVariant
  caption?: string
  className?: string
}

function SvgIntake() {
  return (
    <svg
      viewBox="0 0 640 360"
      role="img"
      aria-label="Intake illustration"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="rgb(244 244 245)" />
          <stop offset="1" stopColor="rgb(250 250 250)" />
        </linearGradient>
      </defs>
      <rect
        x="24"
        y="24"
        width="592"
        height="312"
        rx="28"
        fill="url(#g1)"
        stroke="rgb(228 228 231)"
      />

      <rect x="70" y="72" width="220" height="44" rx="14" fill="white" stroke="rgb(228 228 231)" />
      <rect x="70" y="132" width="300" height="44" rx="14" fill="white" stroke="rgb(228 228 231)" />
      <rect x="70" y="192" width="260" height="44" rx="14" fill="white" stroke="rgb(228 228 231)" />
      <rect x="70" y="252" width="180" height="44" rx="14" fill="white" stroke="rgb(228 228 231)" />

      <circle
        cx="490"
        cy="150"
        r="64"
        fill="rgb(234 88 12 / 0.10)"
        stroke="rgb(234 88 12 / 0.35)"
      />
      <path
        d="M460 150h60m-30-30v60"
        stroke="rgb(234 88 12)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M420 260c30-42 68-64 120-72"
        fill="none"
        stroke="rgb(113 113 122)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="10 10"
      />
    </svg>
  )
}

function SvgLogic() {
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label="Logic illustration" className="w-full h-full">
      <rect
        x="24"
        y="24"
        width="592"
        height="312"
        rx="28"
        fill="rgb(9 9 11 / 0.02)"
        stroke="rgb(228 228 231)"
      />

      <rect x="70" y="70" width="200" height="64" rx="18" fill="white" stroke="rgb(228 228 231)" />
      <rect x="370" y="70" width="200" height="64" rx="18" fill="white" stroke="rgb(228 228 231)" />

      <rect x="70" y="230" width="200" height="64" rx="18" fill="white" stroke="rgb(228 228 231)" />
      <rect
        x="370"
        y="230"
        width="200"
        height="64"
        rx="18"
        fill="white"
        stroke="rgb(228 228 231)"
      />

      <path d="M270 102h100" stroke="rgb(234 88 12)" strokeWidth="8" strokeLinecap="round" />
      <path
        d="M170 134v96"
        stroke="rgb(113 113 122)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="10 10"
      />
      <path
        d="M470 134v96"
        stroke="rgb(113 113 122)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="10 10"
      />

      <circle
        cx="320"
        cy="182"
        r="34"
        fill="rgb(234 88 12 / 0.10)"
        stroke="rgb(234 88 12 / 0.35)"
      />
      <path
        d="M306 182l10 10 18-26"
        fill="none"
        stroke="rgb(234 88 12)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SvgOutput() {
  return (
    <svg
      viewBox="0 0 640 360"
      role="img"
      aria-label="Output illustration"
      className="w-full h-full"
    >
      <rect
        x="24"
        y="24"
        width="592"
        height="312"
        rx="28"
        fill="rgb(16 185 129 / 0.06)"
        stroke="rgb(228 228 231)"
      />

      <rect x="70" y="72" width="500" height="210" rx="20" fill="white" stroke="rgb(228 228 231)" />

      <path d="M110 120h300" stroke="rgb(24 24 27)" strokeWidth="10" strokeLinecap="round" />
      <path d="M110 160h420" stroke="rgb(113 113 122)" strokeWidth="8" strokeLinecap="round" />
      <path d="M110 200h380" stroke="rgb(113 113 122)" strokeWidth="8" strokeLinecap="round" />

      <rect x="110" y="232" width="120" height="34" rx="12" fill="rgb(234 88 12 / 0.10)" />
      <rect x="244" y="232" width="120" height="34" rx="12" fill="rgb(9 9 11 / 0.06)" />
      <rect x="378" y="232" width="120" height="34" rx="12" fill="rgb(16 185 129 / 0.14)" />

      <circle cx="520" cy="118" r="26" fill="rgb(16 185 129 / 0.18)" />
      <path
        d="M508 118l8 8 18-22"
        fill="none"
        stroke="rgb(16 185 129)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MethodIllustration({ variant, caption, className }: MethodIllustrationProps) {
  const Illustration = React.useMemo(() => {
    if (variant === "intake") return SvgIntake
    if (variant === "logic") return SvgLogic
    return SvgOutput
  }, [variant])

  return (
    <figure
      className={cn(
        "bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] p-6 sm:p-8 border border-zinc-200/70 dark:border-zinc-800/70",
        className,
      )}
    >
      <div className="aspect-video w-full overflow-hidden rounded-[2.25rem] bg-white dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70">
        <Illustration />
      </div>
      {caption ? (
        <figcaption className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
