"use client"

import { createContext, useContext, ReactNode } from "react"
import { siteConfig } from "./config"

// Fully mutable version of the config type for editing
export type SiteConfig = {
  navbar: {
    logo: string
    profileColor: string
    navLinks: Array<{ label: string; active: boolean }>
  }
  hero: {
    image: string
    imageAlt: string
    title: string
    description: string
    genreTags: string[]
    maturityRating: string
    playButtonLabel: string
    moreInfoButtonLabel: string
    myListButtonLabel: string
  }
  bottomNav: {
    items: Array<{
      label: string
      iconName: "Home" | "Clapperboard" | null
      active: boolean
      avatar: boolean
    }>
  }
  contentRows: Array<{
    title: string
    items: Array<{
      id: number
      title: string
      image: string
      tag?: string
    }>
  }>
  modal: {
    seriesBadgeLabel: string
    playButtonLabel: string
    addToListLabel: string
    likeLabel: string
    volumeLabel: string
    closeLabel: string
    castLabel: string
    genresLabel: string
    moodLabel: string
    moreLabel: string
    hdBadge: string
    adBadge: string
  }
  shows: Array<{
    id: number
    title: string
    image: string
    tag?: string
    matchPercent: number
    year: number
    rating: string
    episodes: string
    headline: string
    synopsis: string
    cast: string[]
    genres: string[]
    mood: string
  }>
}

// Deep clone helper
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// Create a mutable copy of the default config for use as initial editor state
export function getDefaultConfig(): SiteConfig {
  return deepClone(siteConfig) as unknown as SiteConfig
}

// Context for providing config to components
const ConfigContext = createContext<SiteConfig | null>(null)

// Hook to get config - falls back to siteConfig if no context provided
export function useConfig(): SiteConfig {
  const context = useContext(ConfigContext)
  return context ?? (siteConfig as unknown as SiteConfig)
}

// Provider component for wrapping preview with custom config
export function ConfigProvider({
  config,
  children,
}: {
  config: SiteConfig
  children: ReactNode
}) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}
