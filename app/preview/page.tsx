"use client"

import { useState, useEffect, useCallback } from "react"
import { Navbar } from "@/components/netflix/navbar"
import { HeroSection } from "@/components/netflix/hero-section"
import { ContentRow } from "@/components/netflix/content-row"
import { BottomNav } from "@/components/netflix/bottom-nav"
import { ShowModal } from "@/components/netflix/show-modal"
import { ConfigProvider, getDefaultConfig, SiteConfig } from "@/lib/config-context"

export default function PreviewPage() {
  const [config, setConfig] = useState<SiteConfig>(getDefaultConfig)
  const [selectedShow, setSelectedShow] = useState<SiteConfig["shows"][0] | null>(null)

  // Listen for config updates from parent window (editor)
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Validate message origin in production
      if (event.data?.type === "CONFIG_UPDATE" && event.data?.config) {
        setConfig(event.data.config)
      }
    }

    window.addEventListener("message", handleMessage)

    // Notify parent that preview is ready
    window.parent.postMessage({ type: "PREVIEW_READY" }, "*")

    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const handleCardClick = useCallback(
    (id: number) => {
      const detail = config.shows.find((s) => s.id === id)
      if (detail) setSelectedShow(detail)
    },
    [config.shows]
  )

  return (
    <ConfigProvider config={config}>
      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />

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

        <div className="h-24 md:h-20" />
        <BottomNav />
        <ShowModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      </main>
    </ConfigProvider>
  )
}
