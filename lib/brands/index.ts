import { netflixConfig } from "./netflix"
import type { BrandConfig, Brand } from "./types"

export { VALID_BRANDS, isValidBrand } from "./types"
export type { Brand, BrandConfig, ShowDetail } from "./types"

// ─── Brand Config Registry ───────────────────────────────

const brandConfigs: Record<Brand, BrandConfig> = {
  netflix: netflixConfig,
}

/**
 * Get the config for a specific brand
 */
export function getBrandConfig(brand: Brand): BrandConfig {
  return brandConfigs[brand]
}

/**
 * Get a mutable deep copy of the brand config (for editing)
 */
export function getDefaultConfig(brand: Brand): BrandConfig {
  return JSON.parse(JSON.stringify(brandConfigs[brand]))
}

/**
 * Get default config for the editor with all images cleared (empty strings).
 * Use when you want the edit form to start with no images.
 */
export function getDefaultConfigForEditing(brand: Brand): BrandConfig {
  const config = getDefaultConfig(brand)
  config.hero.image = ""
  config.hero.mobileImage = ""
  config.shows.forEach((show) => {
    show.image = ""
  })
  return config
}

/**
 * Look up a show by id within a brand's config
 */
export function getShowById(brand: Brand, id: number) {
  return brandConfigs[brand].shows.find((s) => s.id === id)
}
