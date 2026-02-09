"use client"

import { useState, useCallback, useMemo } from "react"
import { Navbar } from "@/components/netflix/navbar"
import { HeroSection } from "@/components/netflix/hero-section"
import { ContentRow } from "@/components/netflix/content-row"
import { BottomNav } from "@/components/netflix/bottom-nav"
import { ShowModal } from "@/components/netflix/show-modal"
import { NetflixIntro } from "@/components/netflix/netflix-intro"
import { ConfigProvider, SiteConfig } from "@/lib/config-context"

interface Props {
  config: SiteConfig
}

export function SavedPreviewClient({ config }: Props) {
  const [selectedShowId, setSelectedShowId] = useState<number | null>(null)

  // Derive show data from config
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
    <ConfigProvider config={config}>
      <NetflixIntro />
      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />

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

        <div className="h-24 md:h-20" />
        <BottomNav />
        <ShowModal show={selectedShow} onClose={() => setSelectedShowId(null)} />
      </main>
    </ConfigProvider>
  )
}
