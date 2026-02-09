"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/netflix/navbar"
import { HeroSection } from "@/components/netflix/hero-section"
import { ContentRow } from "@/components/netflix/content-row"
import { BottomNav } from "@/components/netflix/bottom-nav"
import { ShowModal } from "@/components/netflix/show-modal"
import { useConfig, SiteConfig } from "@/lib/config-context"

export default function Page() {
  const config = useConfig()
  const [selectedShow, setSelectedShow] = useState<SiteConfig["shows"][0] | null>(null)

  const handleCardClick = useCallback((id: number) => {
    const detail = config.shows.find((s) => s.id === id)
    if (detail) setSelectedShow(detail)
  }, [config.shows])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Content Rows - slightly overlapping the hero on desktop */}
      <div className="md:-mt-24 relative z-20 pt-4 md:pt-0">
        {config.contentRows.map((row) => (
          <ContentRow
            key={row.title}
            title={row.title}
            items={row.items}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {/* Footer spacer - extra on mobile for bottom nav */}
      <div className="h-24 md:h-20" />

      {/* Mobile Bottom Nav */}
      <BottomNav />

      {/* Show Detail Modal */}
      <ShowModal show={selectedShow} onClose={() => setSelectedShow(null)} />
    </main>
  )
}
