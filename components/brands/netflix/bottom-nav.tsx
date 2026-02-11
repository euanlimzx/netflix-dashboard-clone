"use client"

import { Home, Clapperboard } from "lucide-react"
import { useConfig } from "@/lib/config-context"

const iconMap = {
  Home,
  Clapperboard,
} as const

export function BottomNav() {
  const config = useConfig()
  const { items } = config.bottomNav

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#111111] border-t border-foreground/10">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom,8px)]">
        {items.map((item) => {
          const Icon = item.iconName ? iconMap[item.iconName] : null
          return (
            <button
              key={item.label}
              type="button"
              className="flex flex-col items-center gap-1 px-4 py-1"
            >
              {item.avatar ? (
                <div
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #e50914 0%, #831010 100%)" }}
                >
                  <span className="sr-only">Profile</span>
                </div>
              ) : Icon ? (
                <Icon
                  className={`w-6 h-6 ${
                    item.active ? "text-foreground" : "text-foreground/50"
                  }`}
                  fill={item.active ? "currentColor" : "none"}
                />
              ) : null}
              <span
                className={`text-[10px] ${
                  item.active
                    ? "text-foreground font-medium"
                    : "text-foreground/50"
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
