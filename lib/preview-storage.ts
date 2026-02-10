import { supabase } from "./supabase"
import { SiteConfig, getDefaultConfig } from "./config"

export interface SavedPreview {
  id: string
  config: Partial<SiteConfig>
  created_at: string
}

/**
 * Saves a preview config to the database
 * @returns The UUID of the saved preview
 */
export async function savePreview(config: SiteConfig): Promise<string> {
  // Only store the editable fields to keep payload small
  const editableConfig = {
    navbar: {
      logo: config.navbar.logo,
    },
    hero: {
      image: config.hero.image,
      mobileImage: config.hero.mobileImage,
      titleFont: config.hero.titleFont,
      title: config.hero.title,
      description: config.hero.description,
    },
    shows: config.shows.map((show) => ({
      id: show.id,
      title: show.title,
      image: show.image,
      headline: show.headline,
      synopsis: show.synopsis,
      cast: show.cast,
      genres: show.genres,
      mood: show.mood,
    })),
  }

  const { data, error } = await supabase
    .from("preview_configs")
    .insert({ config: editableConfig })
    .select("id")
    .single()

  if (error) {
    throw new Error(`Failed to save preview: ${error.message}`)
  }

  return data.id
}

/**
 * Loads a preview config from the database and merges with defaults
 * @returns The full SiteConfig or null if not found
 */
export async function loadPreview(uuid: string): Promise<SiteConfig | null> {
  const { data, error } = await supabase
    .from("preview_configs")
    .select("config")
    .eq("id", uuid)
    .single()

  if (error || !data) {
    return null
  }

  // Merge saved config with defaults
  const defaults = getDefaultConfig()
  const saved = data.config as Partial<SiteConfig>

  return mergeWithDefaults(saved, defaults)
}

/**
 * Merges a partial config with defaults
 */
function mergeWithDefaults(
  saved: Partial<SiteConfig>,
  defaults: SiteConfig
): SiteConfig {
  const merged = { ...defaults }

  // Merge navbar
  if (saved.navbar) {
    merged.navbar = { ...defaults.navbar, ...saved.navbar }
  }

  // Merge hero
  if (saved.hero) {
    merged.hero = { ...defaults.hero, ...saved.hero }
  }

  // Merge shows - match by ID and merge, keep defaults for unmatched
  if (saved.shows && Array.isArray(saved.shows)) {
    merged.shows = defaults.shows.map((defaultShow) => {
      const savedShow = saved.shows?.find((s) => s.id === defaultShow.id)
      if (savedShow) {
        return { ...defaultShow, ...savedShow }
      }
      return defaultShow
    })

    // Add any new shows that weren't in defaults
    const defaultIds = new Set(defaults.shows.map((s) => s.id))
    const newShows = saved.shows.filter((s) => !defaultIds.has(s.id))
    if (newShows.length > 0) {
      merged.shows = [...merged.shows, ...newShows] as SiteConfig["shows"]
    }
  }

  return merged
}
