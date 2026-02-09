"use client"

import { useState } from "react"
import { ChevronDown, Plus, Trash2 } from "lucide-react"
import { SiteConfig } from "@/lib/config-context"

interface ConfigFormProps {
  config: SiteConfig
  onChange: (config: SiteConfig) => void
}

// Collapsible section component
function Section({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
      >
        <span className="font-medium text-foreground">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-foreground/60 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="p-4 space-y-4">{children}</div>}
    </div>
  )
}

// Reusable input components
function TextInput({
  label,
  value,
  onChange,
  placeholder,
  mono,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  mono?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/70 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent ${
          mono ? "font-mono text-sm" : ""
        }`}
      />
    </div>
  )
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  rows?: number
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/70 mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent resize-none"
      />
    </div>
  )
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/70 mb-1.5">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent"
      />
    </div>
  )
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/70 mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent"
        />
      </div>
    </div>
  )
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-netflix-red focus:ring-netflix-red focus:ring-offset-0"
      />
      <span className="text-sm text-foreground/70">{label}</span>
    </label>
  )
}

function SelectInput({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string | null
  options: { value: string | null; label: string }[]
  onChange: (value: string | null) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/70 mb-1.5">
        {label}
      </label>
      <select
        value={value ?? "null"}
        onChange={(e) =>
          onChange(e.target.value === "null" ? null : e.target.value)
        }
        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent"
      >
        {options.map((opt) => (
          <option key={opt.value ?? "null"} value={opt.value ?? "null"}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function ConfigForm({ config, onChange }: ConfigFormProps) {
  // Helper to update nested config
  const update = <K extends keyof SiteConfig>(
    section: K,
    updates: Partial<SiteConfig[K]>
  ) => {
    onChange({
      ...config,
      [section]: { ...config[section], ...updates },
    })
  }

  const updateNavLink = (
    index: number,
    updates: Partial<SiteConfig["navbar"]["navLinks"][0]>
  ) => {
    const newLinks = [...config.navbar.navLinks]
    newLinks[index] = { ...newLinks[index], ...updates }
    update("navbar", { navLinks: newLinks })
  }

  const addNavLink = () => {
    update("navbar", {
      navLinks: [...config.navbar.navLinks, { label: "New Link", active: false }],
    })
  }

  const removeNavLink = (index: number) => {
    update("navbar", {
      navLinks: config.navbar.navLinks.filter((_, i) => i !== index),
    })
  }

  const updateBottomNavItem = (
    index: number,
    updates: Partial<SiteConfig["bottomNav"]["items"][0]>
  ) => {
    const newItems = [...config.bottomNav.items]
    newItems[index] = { ...newItems[index], ...updates }
    update("bottomNav", { items: newItems })
  }

  const updateContentRow = (
    rowIndex: number,
    updates: Partial<SiteConfig["contentRows"][0]>
  ) => {
    const newRows = [...config.contentRows]
    newRows[rowIndex] = { ...newRows[rowIndex], ...updates }
    onChange({ ...config, contentRows: newRows })
  }

  const updateContentRowItem = (
    rowIndex: number,
    itemIndex: number,
    updates: Partial<SiteConfig["contentRows"][0]["items"][0]>
  ) => {
    const newRows = [...config.contentRows]
    const newItems = [...newRows[rowIndex].items]
    newItems[itemIndex] = { ...newItems[itemIndex], ...updates }
    newRows[rowIndex] = { ...newRows[rowIndex], items: newItems }
    onChange({ ...config, contentRows: newRows })
  }

  const addContentRow = () => {
    onChange({
      ...config,
      contentRows: [
        ...config.contentRows,
        { title: "New Row", items: [] },
      ],
    })
  }

  const removeContentRow = (index: number) => {
    onChange({
      ...config,
      contentRows: config.contentRows.filter((_, i) => i !== index),
    })
  }

  const addContentRowItem = (rowIndex: number) => {
    const newRows = [...config.contentRows]
    const maxId = Math.max(...config.shows.map((s) => s.id), 0)
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      items: [
        ...newRows[rowIndex].items,
        { id: maxId + 1, title: "New Item", image: "/images/card-reba.jpg" },
      ],
    }
    onChange({ ...config, contentRows: newRows })
  }

  const removeContentRowItem = (rowIndex: number, itemIndex: number) => {
    const newRows = [...config.contentRows]
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      items: newRows[rowIndex].items.filter((_, i) => i !== itemIndex),
    }
    onChange({ ...config, contentRows: newRows })
  }

  const updateShow = (
    index: number,
    updates: Partial<SiteConfig["shows"][0]>
  ) => {
    const newShows = [...config.shows]
    newShows[index] = { ...newShows[index], ...updates }
    onChange({ ...config, shows: newShows })
  }

  const addShow = () => {
    const maxId = Math.max(...config.shows.map((s) => s.id), 0)
    onChange({
      ...config,
      shows: [
        ...config.shows,
        {
          id: maxId + 1,
          title: "New Show",
          image: "/images/card-reba.jpg",
          matchPercent: 90,
          year: 2024,
          rating: "TV-14",
          episodes: "1 Season",
          headline: "A New Show",
          synopsis: "Description of the show...",
          cast: ["Actor 1", "Actor 2"],
          genres: ["Drama"],
          mood: "Exciting",
        },
      ],
    })
  }

  const removeShow = (index: number) => {
    onChange({
      ...config,
      shows: config.shows.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Navbar Section */}
      <Section title="Navbar" defaultOpen>
        <TextInput
          label="Logo Text"
          value={config.navbar.logo}
          onChange={(v) => update("navbar", { logo: v })}
        />
        <ColorInput
          label="Profile Color"
          value={config.navbar.profileColor}
          onChange={(v) => update("navbar", { profileColor: v })}
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground/70">
              Nav Links
            </span>
            <button
              type="button"
              onClick={addNavLink}
              className="flex items-center gap-1 text-xs text-netflix-red hover:text-netflix-red/80"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {config.navbar.navLinks.map((link, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded"
              >
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateNavLink(i, { label: e.target.value })}
                  className="flex-1 px-2 py-1 bg-zinc-700 border border-zinc-600 rounded text-sm text-foreground"
                />
                <Checkbox
                  label="Active"
                  checked={link.active}
                  onChange={(v) => updateNavLink(i, { active: v })}
                />
                <button
                  type="button"
                  onClick={() => removeNavLink(i)}
                  className="p-1 text-foreground/40 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Hero Section */}
      <Section title="Hero Section" defaultOpen>
        <TextInput
          label="Image URL"
          value={config.hero.image}
          onChange={(v) => update("hero", { image: v })}
          placeholder="/images/hero-bg.jpg"
        />
        <TextInput
          label="Image Alt Text"
          value={config.hero.imageAlt}
          onChange={(v) => update("hero", { imageAlt: v })}
        />
        <TextInput
          label="Title"
          value={config.hero.title}
          onChange={(v) => update("hero", { title: v })}
        />
        <TextArea
          label="Description"
          value={config.hero.description}
          onChange={(v) => update("hero", { description: v })}
        />
        <TextInput
          label="Genre Tags (comma-separated)"
          value={config.hero.genreTags.join(", ")}
          onChange={(v) =>
            update("hero", {
              genreTags: v.split(",").map((s) => s.trim()).filter(Boolean),
            })
          }
          placeholder="Comedy, Drama, Action"
        />
        <TextInput
          label="Maturity Rating"
          value={config.hero.maturityRating}
          onChange={(v) => update("hero", { maturityRating: v })}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Play Button"
            value={config.hero.playButtonLabel}
            onChange={(v) => update("hero", { playButtonLabel: v })}
          />
          <TextInput
            label="More Info Button"
            value={config.hero.moreInfoButtonLabel}
            onChange={(v) => update("hero", { moreInfoButtonLabel: v })}
          />
        </div>
        <TextInput
          label="My List Button"
          value={config.hero.myListButtonLabel}
          onChange={(v) => update("hero", { myListButtonLabel: v })}
        />
      </Section>

      {/* Bottom Navigation Section */}
      <Section title="Bottom Navigation">
        <div className="space-y-3">
          {config.bottomNav.items.map((item, i) => (
            <div key={i} className="p-3 bg-zinc-800/50 rounded-lg space-y-3">
              <TextInput
                label="Label"
                value={item.label}
                onChange={(v) => updateBottomNavItem(i, { label: v })}
              />
              <SelectInput
                label="Icon"
                value={item.iconName}
                options={[
                  { value: "Home", label: "Home" },
                  { value: "Clapperboard", label: "Clapperboard" },
                  { value: null, label: "None" },
                ]}
                onChange={(v) =>
                  updateBottomNavItem(i, {
                    iconName: v as "Home" | "Clapperboard" | null,
                  })
                }
              />
              <div className="flex gap-4">
                <Checkbox
                  label="Active"
                  checked={item.active}
                  onChange={(v) => updateBottomNavItem(i, { active: v })}
                />
                <Checkbox
                  label="Show Avatar"
                  checked={item.avatar}
                  onChange={(v) => updateBottomNavItem(i, { avatar: v })}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Content Rows Section */}
      <Section title="Content Rows">
        <div className="space-y-4">
          {config.contentRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="p-3 bg-zinc-800/50 rounded-lg space-y-3"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={row.title}
                  onChange={(e) =>
                    updateContentRow(rowIndex, { title: e.target.value })
                  }
                  className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded text-foreground font-medium"
                  placeholder="Row Title"
                />
                <button
                  type="button"
                  onClick={() => removeContentRow(rowIndex)}
                  className="p-2 text-foreground/40 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground/50">Items</span>
                  <button
                    type="button"
                    onClick={() => addContentRowItem(rowIndex)}
                    className="flex items-center gap-1 text-xs text-netflix-red hover:text-netflix-red/80"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                </div>
                {row.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center gap-2 p-2 bg-zinc-700/50 rounded"
                  >
                    <input
                      type="number"
                      value={item.id}
                      onChange={(e) =>
                        updateContentRowItem(rowIndex, itemIndex, {
                          id: Number(e.target.value),
                        })
                      }
                      className="w-16 px-2 py-1 bg-zinc-600 border border-zinc-500 rounded text-xs text-foreground"
                      placeholder="ID"
                    />
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateContentRowItem(rowIndex, itemIndex, {
                          title: e.target.value,
                        })
                      }
                      className="flex-1 px-2 py-1 bg-zinc-600 border border-zinc-500 rounded text-xs text-foreground"
                      placeholder="Title"
                    />
                    <button
                      type="button"
                      onClick={() => removeContentRowItem(rowIndex, itemIndex)}
                      className="p-1 text-foreground/40 hover:text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addContentRow}
            className="w-full py-2 border border-dashed border-zinc-700 rounded-lg text-sm text-foreground/60 hover:border-netflix-red hover:text-netflix-red transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-1" /> Add Row
          </button>
        </div>
      </Section>

      {/* Modal Labels Section */}
      <Section title="Modal Labels">
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Series Badge"
            value={config.modal.seriesBadgeLabel}
            onChange={(v) => update("modal", { seriesBadgeLabel: v })}
          />
          <TextInput
            label="Play Button"
            value={config.modal.playButtonLabel}
            onChange={(v) => update("modal", { playButtonLabel: v })}
          />
          <TextInput
            label="Add to List"
            value={config.modal.addToListLabel}
            onChange={(v) => update("modal", { addToListLabel: v })}
          />
          <TextInput
            label="Like"
            value={config.modal.likeLabel}
            onChange={(v) => update("modal", { likeLabel: v })}
          />
          <TextInput
            label="Volume"
            value={config.modal.volumeLabel}
            onChange={(v) => update("modal", { volumeLabel: v })}
          />
          <TextInput
            label="Close"
            value={config.modal.closeLabel}
            onChange={(v) => update("modal", { closeLabel: v })}
          />
          <TextInput
            label="Cast Label"
            value={config.modal.castLabel}
            onChange={(v) => update("modal", { castLabel: v })}
          />
          <TextInput
            label="Genres Label"
            value={config.modal.genresLabel}
            onChange={(v) => update("modal", { genresLabel: v })}
          />
          <TextInput
            label="Mood Label"
            value={config.modal.moodLabel}
            onChange={(v) => update("modal", { moodLabel: v })}
          />
          <TextInput
            label="More Label"
            value={config.modal.moreLabel}
            onChange={(v) => update("modal", { moreLabel: v })}
          />
          <TextInput
            label="HD Badge"
            value={config.modal.hdBadge}
            onChange={(v) => update("modal", { hdBadge: v })}
          />
          <TextInput
            label="AD Badge"
            value={config.modal.adBadge}
            onChange={(v) => update("modal", { adBadge: v })}
          />
        </div>
      </Section>

      {/* Shows Database Section */}
      <Section title="Shows Database">
        <div className="space-y-4">
          {config.shows.map((show, index) => (
            <div
              key={show.id}
              className="p-3 bg-zinc-800/50 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  #{show.id} - {show.title}
                </span>
                <button
                  type="button"
                  onClick={() => removeShow(index)}
                  className="p-1 text-foreground/40 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <NumberInput
                  label="ID"
                  value={show.id}
                  onChange={(v) => updateShow(index, { id: v })}
                />
                <TextInput
                  label="Title"
                  value={show.title}
                  onChange={(v) => updateShow(index, { title: v })}
                />
              </div>

              <TextInput
                label="Image URL"
                value={show.image}
                onChange={(v) => updateShow(index, { image: v })}
              />

              <TextInput
                label="Tag (optional)"
                value={show.tag || ""}
                onChange={(v) =>
                  updateShow(index, { tag: v || undefined })
                }
                placeholder="New Season Coming Soon"
              />

              <div className="grid grid-cols-3 gap-3">
                <NumberInput
                  label="Match %"
                  value={show.matchPercent}
                  onChange={(v) => updateShow(index, { matchPercent: v })}
                />
                <NumberInput
                  label="Year"
                  value={show.year}
                  onChange={(v) => updateShow(index, { year: v })}
                />
                <TextInput
                  label="Rating"
                  value={show.rating}
                  onChange={(v) => updateShow(index, { rating: v })}
                />
              </div>

              <TextInput
                label="Episodes"
                value={show.episodes}
                onChange={(v) => updateShow(index, { episodes: v })}
              />

              <TextInput
                label="Headline"
                value={show.headline}
                onChange={(v) => updateShow(index, { headline: v })}
              />

              <TextArea
                label="Synopsis"
                value={show.synopsis}
                onChange={(v) => updateShow(index, { synopsis: v })}
                rows={2}
              />

              <TextInput
                label="Cast (comma-separated)"
                value={show.cast.join(", ")}
                onChange={(v) =>
                  updateShow(index, {
                    cast: v.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
              />

              <TextInput
                label="Genres (comma-separated)"
                value={show.genres.join(", ")}
                onChange={(v) =>
                  updateShow(index, {
                    genres: v.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
              />

              <TextInput
                label="Mood"
                value={show.mood}
                onChange={(v) => updateShow(index, { mood: v })}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addShow}
            className="w-full py-2 border border-dashed border-zinc-700 rounded-lg text-sm text-foreground/60 hover:border-netflix-red hover:text-netflix-red transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-1" /> Add Show
          </button>
        </div>
      </Section>
    </div>
  )
}
