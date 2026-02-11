"use client"

import { Play, Info, Plus } from "lucide-react"
import Image from "next/image"
import { useConfig } from "@/lib/config-context"

interface HeroSectionProps {
  onEditorHeroClick?: () => void
}

export function HeroSection({ onEditorHeroClick }: HeroSectionProps) {
  const config = useConfig()
  const hero = config.hero

  return (
    <>
      {/* Desktop Hero */}
      <section
        className="relative w-full h-[85vh] min-h-[500px] hidden md:block"
        onClick={onEditorHeroClick}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={hero.image || "/placeholder.svg"}
            alt={hero.imageAlt}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-end h-full px-12 pb-40">
          <h1
            className={`text-7xl lg:text-8xl font-bold text-foreground mb-4 max-w-2xl leading-tight ${
              hero.titleFont === "bebas" ? "font-bebas tracking-[0.12em]" : "tracking-tight"
            }`}
            style={
              hero.titleFont === "default"
                ? { fontFamily: "'Georgia', serif", fontStyle: "italic" }
                : undefined
            }
          >
            {hero.title}
          </h1>

          <p className="text-base text-foreground/90 max-w-md leading-relaxed mb-6">
            {hero.description}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-8 py-2.5 bg-foreground text-background rounded font-semibold text-base hover:bg-foreground/80 transition-colors"
            >
              <Play className="w-5 h-5 fill-current" />
              {hero.playButtonLabel}
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-8 py-2.5 bg-foreground/30 text-foreground rounded font-semibold text-base hover:bg-foreground/20 transition-colors backdrop-blur-sm"
            >
              <Info className="w-5 h-5" />
              {hero.moreInfoButtonLabel}
            </button>
          </div>
        </div>

        {/* Bottom-right maturity rating */}
        <div className="absolute bottom-40 right-12 z-10 flex items-center gap-2">
          <button
            type="button"
            className="w-9 h-9 rounded-full border-2 border-foreground/50 flex items-center justify-center text-foreground/70 hover:border-foreground transition-colors"
            aria-label="Replay"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6" />
              <path d="M21.34 15.57a10 10 0 1 1-.57-8.38" />
            </svg>
          </button>
          <div className="border-l-2 border-foreground/50 pl-3 py-0.5">
            <span className="text-sm text-foreground/80 font-medium">
              {hero.maturityRating}
            </span>
          </div>
        </div>
      </section>

      {/* Mobile Hero */}
      <section
        className="relative w-full md:hidden pt-28 px-4 pb-4"
        onClick={onEditorHeroClick}
      >
        {/* Background tint */}
        <div className="absolute inset-0 bg-background" />

        {/* Portrait poster card */}
        <div className="relative z-10">
          <div className="relative w-full aspect-[2/3] max-w-[85%] mx-auto rounded-lg overflow-hidden shadow-2xl shadow-black/40">
            <Image
              src={hero.mobileImage || hero.image || "/placeholder.svg"}
              alt={hero.imageAlt}
              fill
              className="object-cover object-center"
              priority
            />

            {/* Bottom gradient for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Title and genre tags at the bottom of the poster */}
            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
              <h1
                className={`text-4xl font-extrabold text-foreground mb-2 text-center ${
                  hero.titleFont === "bebas" ? "font-bebas tracking-[0.12em]" : "tracking-widest"
                }`}
              >
                {hero.title}
              </h1>
              <p className="text-sm text-foreground/70 tracking-wide">
                {hero.genreTags.map((tag, i) => (
                  <span key={tag}>
                    {i > 0 && (
                      <span className="mx-2 text-netflix-red">{"•"}</span>
                    )}
                    {tag}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Action buttons below the poster */}
          <div className="flex items-center gap-3 mt-4 px-2">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-foreground text-background rounded font-semibold text-base"
            >
              <Play className="w-5 h-5 fill-current" />
              {hero.playButtonLabel}
            </button>

            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#333333] text-foreground rounded font-semibold text-base"
            >
              <Plus className="w-5 h-5" />
              {hero.myListButtonLabel}
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
