"use client";

import { useRef, useEffect, forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import type { BrandConfig } from "@/lib/brands";
import { ImageUpload } from "./image-upload";

interface ConfigFormProps {
  config: BrandConfig;
  onChange: (config: BrandConfig) => void;
  openSectionKey?: string | null;
  onOpenSectionKeyChange?: (key: string | null) => void;
}

// Collapsible section component (controlled by openSectionKey when provided)
const Section = forwardRef<
  HTMLDivElement,
  {
    title: string;
    sectionKey: string;
    openSectionKey: string | null;
    onOpenSectionKeyChange: (key: string | null) => void;
    isOpenOverride?: boolean;
    onToggleOverride?: () => void;
    children: React.ReactNode;
  }
>(function Section(
  {
    title,
    sectionKey,
    openSectionKey,
    onOpenSectionKeyChange,
    isOpenOverride,
    onToggleOverride,
    children,
  },
  ref,
) {
  const isOpen = isOpenOverride ?? openSectionKey === sectionKey;
  const handleToggle = () => {
    if (onToggleOverride) {
      onToggleOverride();
    } else {
      onOpenSectionKeyChange(openSectionKey === sectionKey ? null : sectionKey);
    }
  };

  return (
    <div ref={ref} className="bg-white">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <span
          className="font-bold text-gray-900 text-[22px] tracking-[-0.02em]"
          style={{
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-900 transition-transform ${
            isOpen ? "" : "-rotate-90"
          }`}
        />
      </button>
      {isOpen && <div className="px-6 pb-6 space-y-4 bg-white">{children}</div>}
    </div>
  );
});

// Reusable input components
function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-base font-medium text-gray-600 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-base font-medium text-gray-600 mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 resize-none"
      />
    </div>
  );
}

// Collapsible show item component (controlled by openSectionKey)
const ShowItem = forwardRef<
  HTMLDivElement,
  {
    show: BrandConfig["shows"][0];
    index: number;
    itemKey: string;
    openSectionKey: string | null;
    onOpenSectionKeyChange: (key: string | null) => void;
    onUpdate: (
      index: number,
      updates: Partial<BrandConfig["shows"][0]>,
    ) => void;
  }
>(function ShowItem(
  { show, index, itemKey, openSectionKey, onOpenSectionKeyChange, onUpdate },
  ref,
) {
  const isOpen = openSectionKey === itemKey;

  return (
    <div ref={ref} className="bg-white">
      <button
        type="button"
        onClick={() => onOpenSectionKeyChange(isOpen ? null : itemKey)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <span
          className="font-bold text-gray-900 text-[19px] tracking-[-0.02em]"
          style={{
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          Show {index + 1}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-900 transition-transform ${
            isOpen ? "" : "-rotate-90"
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 space-y-4 bg-white">
          <TextInput
            label="Title"
            value={show.title}
            onChange={(v) => onUpdate(index, { title: v })}
          />

          <ImageUpload
            label="Show Image"
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
                cast: v
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />

          <TextInput
            label="Genres (comma-separated)"
            value={show.genres.join(", ")}
            onChange={(v) =>
              onUpdate(index, {
                genres: v
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
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
  );
});

export function ConfigForm({
  config,
  onChange,
  openSectionKey = null,
  onOpenSectionKeyChange = () => {},
}: ConfigFormProps) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const fullscreenMessageRef = useRef<HTMLDivElement>(null);
  const showsDatabaseRef = useRef<HTMLDivElement>(null);
  const showItemRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  // Scroll the opened section into view when openSectionKey changes
  useEffect(() => {
    if (!openSectionKey) return;
    if (openSectionKey === "navbar") {
      navbarRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    } else if (openSectionKey === "hero") {
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else if (openSectionKey === "fullscreen-message") {
      fullscreenMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    } else if (openSectionKey.startsWith("show-")) {
      const index = parseInt(openSectionKey.replace("show-", ""), 10);
      if (!Number.isNaN(index)) {
        showItemRefs.current.get(index)?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [openSectionKey]);
  // Helper to update nested config
  const update = <K extends keyof BrandConfig>(
    section: K,
    updates: Partial<BrandConfig[K]>,
  ) => {
    onChange({
      ...config,
      [section]: { ...config[section], ...updates },
    });
  };

  const updateShow = (
    index: number,
    updates: Partial<BrandConfig["shows"][0]>,
  ) => {
    const newShows = [...config.shows];
    newShows[index] = { ...newShows[index], ...updates };
    onChange({ ...config, shows: newShows });
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Navbar Section - Only Logo */}
      <Section
        ref={navbarRef}
        title="Navbar"
        sectionKey="navbar"
        openSectionKey={openSectionKey}
        onOpenSectionKeyChange={onOpenSectionKeyChange}
      >
        <TextInput
          label="Logo Text"
          value={config.navbar.logo}
          onChange={(v) => update("navbar", { logo: v })}
        />
      </Section>

      {/* Hero Section - Limited Fields */}
      <Section
        ref={heroRef}
        title="Main Section"
        sectionKey="hero"
        openSectionKey={openSectionKey}
        onOpenSectionKeyChange={onOpenSectionKeyChange}
      >
        <ImageUpload
          label="Main Image (Desktop)"
          value={config.hero.image}
          onChange={(v) => update("hero", { image: v })}
        />
        <ImageUpload
          label="Main Image (Mobile)"
          value={config.hero.mobileImage}
          onChange={(v) => update("hero", { mobileImage: v })}
        />
        <div>
          <label className="block text-base font-medium text-gray-600 mb-1.5">
            Title Font
          </label>
          <select
            value={config.hero.titleFont ?? "default"}
            onChange={(e) =>
              update("hero", {
                titleFont: e.target.value as "default" | "bebas" | "sf-pro",
              })
            }
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
          >
            <option value="default">Default (Georgia serif)</option>
            <option value="bebas">Bebas Neue</option>
            <option value="sf-pro">Inter (SF-style)</option>
          </select>
        </div>
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
          label="Play button label"
          value={config.hero.playButtonLabel}
          onChange={(v) => update("hero", { playButtonLabel: v })}
          placeholder="Play"
        />
        <TextInput
          label="My List button label"
          value={config.hero.myListButtonLabel}
          onChange={(v) => update("hero", { myListButtonLabel: v })}
          placeholder="My List"
        />
        <TextInput
          label="Genre tags for mobile (comma-separated)"
          value={config.hero.genreTags.join(", ")}
          onChange={(v) =>
            update("hero", {
              genreTags: v
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          placeholder="Comedy, Family, Heartwarming"
        />
      </Section>

      {/* Fullscreen Play Message */}
      <Section
        ref={fullscreenMessageRef}
        title="Long Message"
        sectionKey="fullscreen-message"
        openSectionKey={openSectionKey}
        onOpenSectionKeyChange={onOpenSectionKeyChange}
      >
        <TextArea
          label="Message shown after you click the play button"
          value={config.modal.fullscreenMessage ?? "Hello"}
          onChange={(v) => update("modal", { fullscreenMessage: v })}
          rows={4}
          placeholder="Hello"
        />
      </Section>

      {/* Shows Database Section - Limited Fields */}
      <Section
        ref={showsDatabaseRef}
        title="Shows Database"
        sectionKey="shows-database"
        openSectionKey={openSectionKey}
        onOpenSectionKeyChange={onOpenSectionKeyChange}
        isOpenOverride={
          openSectionKey === "shows-database" ||
          (openSectionKey !== null && openSectionKey.startsWith("show-"))
        }
        onToggleOverride={() =>
          onOpenSectionKeyChange(
            openSectionKey === "shows-database" ||
              (openSectionKey !== null && openSectionKey.startsWith("show-"))
              ? null
              : "shows-database",
          )
        }
      >
        <div className="space-y-4">
          {config.shows.map((show, index) => (
            <ShowItem
              key={show.id}
              ref={(el) => {
                showItemRefs.current.set(index, el);
              }}
              show={show}
              index={index}
              itemKey={`show-${index}`}
              openSectionKey={openSectionKey}
              onOpenSectionKeyChange={onOpenSectionKeyChange}
              onUpdate={updateShow}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
