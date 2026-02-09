"use client"

import { useState } from "react"
import { Monitor, Smartphone } from "lucide-react"
import { ConfigForm } from "@/components/editor/config-form"
import { PreviewFrame } from "@/components/editor/preview-frame"
import { CreateButton } from "@/components/editor/create-button"
import { ShareDialog } from "@/components/editor/share-dialog"
import { getDefaultConfig, SiteConfig } from "@/lib/config-context"

type ViewportMode = "mobile" | "desktop"

export default function EditPage() {
  const [config, setConfig] = useState<SiteConfig>(getDefaultConfig)
  const [viewport, setViewport] = useState<ViewportMode>("mobile")
  const [shareUuid, setShareUuid] = useState<string | null>(null)

  return (
    <div className="h-screen flex bg-zinc-950">
      {/* Left Panel - Config Form */}
      <div className="w-[400px] flex-shrink-0 border-r border-zinc-800 bg-zinc-900 flex flex-col">
        <div className="h-14 flex items-center justify-between px-6 border-b border-zinc-800">
          <h1 className="text-lg font-semibold text-foreground">
            Edit Configuration
          </h1>
          <CreateButton config={config} onSuccess={setShareUuid} />
        </div>
        <div className="flex-1 overflow-hidden">
          <ConfigForm config={config} onChange={setConfig} />
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 flex items-center justify-between px-6 border-b border-zinc-800">
          <h2 className="text-sm font-medium text-foreground/70">Preview</h2>

          {/* Viewport Toggle */}
          <div className="flex items-center gap-1 p-1 bg-zinc-800 rounded-lg">
            <button
              type="button"
              onClick={() => setViewport("mobile")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewport === "mobile"
                  ? "bg-zinc-700 text-foreground"
                  : "text-foreground/50 hover:text-foreground/70"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Mobile
            </button>
            <button
              type="button"
              onClick={() => setViewport("desktop")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewport === "desktop"
                  ? "bg-zinc-700 text-foreground"
                  : "text-foreground/50 hover:text-foreground/70"
              }`}
            >
              <Monitor className="w-4 h-4" />
              Desktop
            </button>
          </div>
        </div>
        <div className="flex-1 p-4">
          <PreviewFrame config={config} viewport={viewport} />
        </div>
      </div>

      {/* Share Dialog */}
      <ShareDialog
        uuid={shareUuid || ""}
        open={shareUuid !== null}
        onClose={() => setShareUuid(null)}
      />
    </div>
  )
}
