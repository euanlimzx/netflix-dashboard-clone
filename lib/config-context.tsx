"use client"

import { createContext, useContext, ReactNode } from "react"
import { siteConfig, getDefaultConfig } from "./config"
import type { SiteConfig } from "./config"

// Re-export for convenience
export type { SiteConfig }
export { getDefaultConfig }

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

/**
 * Checks if a config has any changes from the defaults
 * Only compares editable fields (navbar.logo, hero.*, shows[].*)
 */
export function hasChanges(config: SiteConfig): boolean {
  const defaults = getDefaultConfig()

  // Check navbar.logo
  if (config.navbar.logo !== defaults.navbar.logo) return true

  // Check hero fields
  if (config.hero.image !== defaults.hero.image) return true
  if (config.hero.title !== defaults.hero.title) return true
  if (config.hero.description !== defaults.hero.description) return true

  // Check shows
  if (config.shows.length !== defaults.shows.length) return true

  for (let i = 0; i < config.shows.length; i++) {
    const show = config.shows[i]
    const defaultShow = defaults.shows.find((s) => s.id === show.id)

    if (!defaultShow) return true // New show added

    if (show.title !== defaultShow.title) return true
    if (show.image !== defaultShow.image) return true
    if (show.headline !== defaultShow.headline) return true
    if (show.synopsis !== defaultShow.synopsis) return true
    if (show.mood !== defaultShow.mood) return true
    if (JSON.stringify(show.cast) !== JSON.stringify(defaultShow.cast)) return true
    if (JSON.stringify(show.genres) !== JSON.stringify(defaultShow.genres)) return true
  }

  return false
}

/**
 * Validates that required fields are filled
 * Returns an array of error messages, empty if valid
 */
export function validateConfig(config: SiteConfig): string[] {
  const errors: string[] = []

  if (!config.hero.title.trim()) {
    errors.push("Hero title is required")
  }

  if (!config.hero.description.trim()) {
    errors.push("Hero description is required")
  }

  config.shows.forEach((show, index) => {
    if (!show.title.trim()) {
      errors.push(`Show ${index + 1} title is required`)
    }
  })

  return errors
}
