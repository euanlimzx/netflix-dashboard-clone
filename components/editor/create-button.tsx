"use client"

import { useState } from "react"
import { Loader2, Sparkles } from "lucide-react"
import { hasChanges, validateConfig } from "@/lib/config-context"
import { savePreview } from "@/lib/preview-storage"
import { toast } from "sonner"
import type { Brand, BrandConfig } from "@/lib/brands"

interface CreateButtonProps {
  config: BrandConfig
  brand: Brand
  onSuccess: (uuid: string) => void
}

export function CreateButton({ config, brand, onSuccess }: CreateButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async () => {
    // Validate required fields
    const errors = validateConfig(config)
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error))
      return
    }

    // Check if there are any changes
    if (!hasChanges(config, brand)) {
      toast.error("No changes to save", {
        description: "Make some changes before creating a preview.",
      })
      return
    }

    setIsLoading(true)

    try {
      const uuid = await savePreview(config, brand)
      toast.success("Preview created!")
      onSuccess(uuid)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create preview"
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCreate}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-netflix-red hover:bg-netflix-red/90 disabled:bg-netflix-red/50 rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Creating...
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          Create
        </>
      )}
    </button>
  )
}
