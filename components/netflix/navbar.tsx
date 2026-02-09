"use client"

import { Search, Bell, ChevronDown, Download } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function Navbar() {
  const { logo, profileColor, navLinks } = siteConfig.navbar

  // Derive mobile filters from navLinks
  const mobileFilters = [
    ...navLinks
      .filter((link) => ["TV Shows", "Movies"].includes(link.label))
      .map((link) => ({ label: link.label, hasDropdown: false })),
    { label: "Categories", hasDropdown: true },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-12 py-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <span
            className="text-netflix-red font-bold text-3xl tracking-wider select-none"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
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
              style={{ backgroundColor: profileColor }}
            >
              <span className="sr-only">Profile</span>
            </div>
            <ChevronDown className="w-4 h-4 text-foreground transition-transform group-hover:rotate-180" />
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex flex-col md:hidden px-4 pt-3 pb-2 bg-gradient-to-b from-black/95 via-black/70 to-transparent">
        {/* Top row: Greeting + icons */}
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-xl font-bold text-netflix-red tracking-wider select-none"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
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
