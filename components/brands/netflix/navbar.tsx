"use client"

import { Search, Bell, ChevronDown, Download } from "lucide-react"
import { useConfig } from "@/lib/config-context"

interface NavbarProps {
  onEditorNavbarClick?: () => void
}

export function Navbar({ onEditorNavbarClick }: NavbarProps) {
  const config = useConfig()
  const { logo, navLinks } = config.navbar

  // Derive mobile filters from navLinks
  const mobileFilters = [
    ...navLinks
      .filter((link) => ["TV Shows", "Movies"].includes(link.label))
      .map((link) => ({ label: link.label, hasDropdown: false })),
    { label: "Categories", hasDropdown: true },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient overlay - behind content so logo and pills stay on top */}
      <div
        className="absolute inset-x-0 top-0 z-0 h-36 pointer-events-none bg-gradient-to-b from-black/80 via-black/50 to-transparent"
        aria-hidden
      />
      {/* Desktop Navbar */}
      <div
        className="relative z-10 hidden md:flex items-center justify-between px-12 py-3"
        onClick={onEditorNavbarClick}
      >
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <span className="text-netflix-red font-bold text-3xl tracking-[0.15em] select-none font-bebas">
            {logo}
          </span>

          <ul className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  className={`text-sm transition-colors hover:text-foreground/80 ${
                    link.active
                      ? "text-foreground font-semibold"
                      : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="text-foreground hover:text-foreground/80 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <span className="text-sm text-foreground hover:text-foreground/80 cursor-pointer transition-colors">
            Kids
          </span>

          <button
            type="button"
            className="text-foreground hover:text-foreground/80 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1 cursor-pointer group">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #e50914 0%, #831010 100%)" }}
            >
              <span className="sr-only">Profile</span>
            </div>
            <ChevronDown className="w-4 h-4 text-foreground transition-transform group-hover:rotate-180" />
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className="relative z-10 flex flex-col md:hidden px-4 pt-3 pb-2 bg-gradient-to-b from-black/95 via-black/70 to-transparent"
        onClick={onEditorNavbarClick}
      >
        {/* Top row: Greeting + icons */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-netflix-red tracking-[0.15em] select-none font-bebas">
            {logo}
          </h2>
          <div className="flex items-center gap-5">
            <button
              type="button"
              className="text-foreground"
              aria-label="Downloads"
            >
              <Download className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="text-foreground"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2">
          {mobileFilters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-foreground/30 text-sm text-foreground/90 bg-transparent hover:bg-foreground/10 transition-colors"
            >
              {filter.label}
              {filter.hasDropdown && <ChevronDown className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
