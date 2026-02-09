"use client"

import { useState, useCallback, useMemo } from "react"
import { Navbar } from "@/components/netflix/navbar"
import { HeroSection } from "@/components/netflix/hero-section"
import { ContentRow } from "@/components/netflix/content-row"
import { BottomNav } from "@/components/netflix/bottom-nav"
import { ShowModal } from "@/components/netflix/show-modal"
import { NetflixIntro } from "@/components/netflix/netflix-intro"
import { useConfig, SiteConfig } from "@/lib/config-context"

export default function Page() {
  const config = useConfig()
  const [selectedShowId, setSelectedShowId] = useState<number | null>(null)

  // Derive show data from current config
  const selectedShow = selectedShowId
    ? config.shows.find((s) => s.id === selectedShowId) ?? null
    : null

  const handleCardClick = useCallback((id: number) => {
    setSelectedShowId(id)
  }, [])

  // Resolve show IDs to show data for each content row
  const resolvedRows = useMemo(() => {
    return config.contentRows.map((row) => ({
      title: row.title,
      items: row.showIds
        .map((id) => config.shows.find((s) => s.id === id))
        .filter((show): show is SiteConfig["shows"][0] => show !== undefined),
    }))
  }, [config.contentRows, config.shows])

  return (
    <>
      <NetflixIntro />
      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />

      {/* Content Rows - slightly overlapping the hero on desktop */}
      <div className="md:-mt-24 relative z-20 pt-4 md:pt-0">
        {resolvedRows.map((row) => (
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
      <ShowModal show={selectedShow} onClose={() => setSelectedShowId(null)} />
      </main>
    </>
  )
}
