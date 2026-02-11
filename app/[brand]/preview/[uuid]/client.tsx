"use client";

import { useState, useCallback, useMemo } from "react";
import { Navbar } from "@/components/brands/netflix/navbar";
import { HeroSection } from "@/components/brands/netflix/hero-section";
import { ContentRow } from "@/components/brands/netflix/content-row";
import { BottomNav } from "@/components/brands/netflix/bottom-nav";
import { ShowModal } from "@/components/brands/netflix/show-modal";
import { FullscreenPlayerOverlay } from "@/components/brands/netflix/fullscreen-player-overlay";
import { NetflixIntro } from "@/components/brands/netflix/netflix-intro";
import { ConfigProvider } from "@/lib/config-context";
import type { BrandConfig } from "@/lib/brands";

interface Props {
  config: BrandConfig;
}

export function SavedPreviewClient({ config }: Props) {
  const [selectedShowId, setSelectedShowId] = useState<number | null>(null);
  const [fullscreenPlayerOpen, setFullscreenPlayerOpen] = useState(false);

  // Derive show data from config
  const selectedShow = selectedShowId
    ? (config.shows.find((s) => s.id === selectedShowId) ?? null)
    : null;

  const handleCardClick = useCallback((id: number) => {
    setSelectedShowId(id);
  }, []);

  // Resolve show IDs to show data for each content row
  const resolvedRows = useMemo(() => {
    return config.contentRows.map((row) => ({
      title: row.title,
      items: row.showIds
        .map((id) => config.shows.find((s) => s.id === id))
        .filter((show): show is BrandConfig["shows"][0] => show !== undefined),
    }));
  }, [config.contentRows, config.shows]);

  return (
    <ConfigProvider config={config}>
      <NetflixIntro />
      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection onPlayClick={() => setFullscreenPlayerOpen(true)} />

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
        <ShowModal
          show={selectedShow}
          onClose={() => setSelectedShowId(null)}
          onPlayClick={() => {
            setSelectedShowId(null);
            setFullscreenPlayerOpen(true);
          }}
        />
        <FullscreenPlayerOverlay
          open={fullscreenPlayerOpen}
          onClose={() => setFullscreenPlayerOpen(false)}
        />
      </main>
    </ConfigProvider>
  );
}
