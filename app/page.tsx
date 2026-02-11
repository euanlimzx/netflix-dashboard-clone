"use client"

import { useState, useCallback, useMemo } from "react"
import { Navbar } from "@/components/brands/netflix/navbar"
import { HeroSection } from "@/components/brands/netflix/hero-section"
import { ContentRow } from "@/components/brands/netflix/content-row"
import { BottomNav } from "@/components/brands/netflix/bottom-nav"
import { ShowModal } from "@/components/brands/netflix/show-modal"
import { NetflixIntro } from "@/components/brands/netflix/netflix-intro"
import { ConfigProvider } from "@/lib/config-context"
import { getBrandConfig } from "@/lib/brands"
import type { BrandConfig } from "@/lib/brands"

export default function Page() {
  // Use Netflix config for the root page
  const config = getBrandConfig("netflix")
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
        .filter((show): show is BrandConfig["shows"][0] => show !== undefined),
    }))
  }, [config.contentRows, config.shows])

  return (
    <ConfigProvider config={config}>
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
    </ConfigProvider>
  )
}
