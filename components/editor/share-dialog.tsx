"use client"

import { useState } from "react"
import { Check, Copy, ExternalLink, X } from "lucide-react"
import { toast } from "sonner"
import type { Brand } from "@/lib/brands"

interface ShareDialogProps {
  uuid: string
  brand: Brand
  open: boolean
  onClose: () => void
}

export function ShareDialog({ uuid, brand, open, onClose }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  if (!open) return null

  const previewUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${brand}/preview/${uuid}`
    : `/${brand}/preview/${uuid}`

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
      <div className="relative z-10 w-full max-w-md mx-4 bg-white border border-gray-200 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Preview Created!
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          <p className="text-sm text-gray-600">
            Your preview is ready! Share this link with anyone to show them your customized version.
          </p>

          {/* URL input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={previewUrl}
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-900 font-mono truncate focus:outline-none focus:ring-2 focus:ring-netflix-red"
              onClick={(e) => e.currentTarget.select()}
            />
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center w-10 h-10 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors"
              title="Copy link"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleOpenInNewTab}
            className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-black/90 rounded-md text-sm font-medium text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open Preview
          </button>
        </div>
      </div>
    </div>
  )
}
