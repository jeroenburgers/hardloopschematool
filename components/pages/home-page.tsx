"use client"

import Image from "next/image"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { BlueprintsSection } from "@/components/blueprints-section"
import { Footer } from "@/components/footer"

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=2500"
            alt="Runner on the road at sunset"
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950/90"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
          <Hero />
        </div>
      </div>
      <BlueprintsSection />
      <Footer />
    </div>
  )
}
