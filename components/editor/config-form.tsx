"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
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
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
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
        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent"
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

// Collapsible show item component
function ShowItem({
  show,
  index,
  onUpdate,
}: {
  show: SiteConfig["shows"][0]
  index: number
  onUpdate: (index: number, updates: Partial<SiteConfig["shows"][0]>) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
      >
        <span className="font-medium text-foreground">Show {index + 1}</span>
        <ChevronDown
          className={`w-4 h-4 text-foreground/60 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 space-y-4">
          <TextInput
            label="Title"
            value={show.title}
            onChange={(v) => onUpdate(index, { title: v })}
          />

          <TextInput
            label="Image URL"
            value={show.image}
            onChange={(v) => onUpdate(index, { image: v })}
          />

          <TextInput
            label="Headline"
            value={show.headline}
            onChange={(v) => onUpdate(index, { headline: v })}
          />

          <TextArea
            label="Synopsis"
            value={show.synopsis}
            onChange={(v) => onUpdate(index, { synopsis: v })}
            rows={2}
          />

          <TextInput
            label="Cast (comma-separated)"
            value={show.cast.join(", ")}
            onChange={(v) =>
              onUpdate(index, {
                cast: v.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
          />

          <TextInput
            label="Genres (comma-separated)"
            value={show.genres.join(", ")}
            onChange={(v) =>
              onUpdate(index, {
                genres: v.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
          />

          <TextInput
            label="Mood"
            value={show.mood}
            onChange={(v) => onUpdate(index, { mood: v })}
          />
        </div>
      )}
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

  const updateShow = (
    index: number,
    updates: Partial<SiteConfig["shows"][0]>
  ) => {
    const newShows = [...config.shows]
    newShows[index] = { ...newShows[index], ...updates }
    onChange({ ...config, shows: newShows })
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Navbar Section - Only Logo */}
      <Section title="Navbar" defaultOpen>
        <TextInput
          label="Logo Text"
          value={config.navbar.logo}
          onChange={(v) => update("navbar", { logo: v })}
        />
      </Section>

      {/* Hero Section - Limited Fields */}
      <Section title="Hero Section" defaultOpen>
        <TextInput
          label="Image URL"
          value={config.hero.image}
          onChange={(v) => update("hero", { image: v })}
          placeholder="/images/hero-bg.jpg"
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
      </Section>

      {/* Shows Database Section - Limited Fields */}
      <Section title="Shows Database">
        <div className="space-y-4">
          {config.shows.map((show, index) => (
            <ShowItem
              key={show.id}
              show={show}
              index={index}
              onUpdate={updateShow}
            />
          ))}
        </div>
      </Section>
    </div>
  )
}
