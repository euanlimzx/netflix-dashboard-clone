"use client"

import { createContext, useContext, ReactNode } from "react"
import { getDefaultConfig } from "./brands"
import type { Brand, BrandConfig } from "./brands"

// Re-export for convenience
export type { BrandConfig }

// Context for providing config to components
const ConfigContext = createContext<BrandConfig | null>(null)

// Hook to get config - throws if no context provided
export function useConfig(): BrandConfig {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider")
  }
  return context
}

// Provider component for wrapping preview with custom config
export function ConfigProvider({
  config,
  children,
}: {
  config: BrandConfig
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
export function hasChanges(config: BrandConfig, brand: Brand): boolean {
  const defaults = getDefaultConfig(brand)

  // Check navbar.logo
  if (config.navbar.logo !== defaults.navbar.logo) return true

  // Check hero fields
  if (config.hero.image !== defaults.hero.image) return true
  if (config.hero.titleFont !== defaults.hero.titleFont) return true
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
export function validateConfig(config: BrandConfig): string[] {
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
