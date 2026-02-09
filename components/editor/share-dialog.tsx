"use client"

import { useState } from "react"
import { Check, Copy, ExternalLink, X } from "lucide-react"
import { toast } from "sonner"

interface ShareDialogProps {
  uuid: string
  open: boolean
  onClose: () => void
}

export function ShareDialog({ uuid, open, onClose }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  if (!open) return null

  const previewUrl = typeof window !== "undefined"
    ? `${window.location.origin}/preview/${uuid}`
    : `/preview/${uuid}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(previewUrl)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Failed to copy link")
    }
  }

  const handleOpenInNewTab = () => {
    window.open(previewUrl, "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-foreground">
            Preview Created!
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-foreground/60" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          <p className="text-sm text-foreground/70">
            Your preview is ready! Share this link with anyone to show them your customized version.
          </p>

          {/* URL input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={previewUrl}
              className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-foreground font-mono truncate focus:outline-none focus:ring-2 focus:ring-netflix-red"
              onClick={(e) => e.currentTarget.select()}
            />
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center w-10 h-10 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md transition-colors"
              title="Copy link"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-foreground/70" />
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleOpenInNewTab}
            className="flex items-center gap-2 px-4 py-2 bg-netflix-red hover:bg-netflix-red/90 rounded-md text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open Preview
          </button>
        </div>
      </div>
    </div>
  )
}
