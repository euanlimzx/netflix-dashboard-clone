"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, X, RefreshCw, AlertCircle } from "lucide-react"
import { storage, validateFile, StorageError } from "@/lib/storage"
import { toast } from "sonner"

interface ImageUploadProps {
  label: string
  value: string
  onChange: (url: string) => void
  className?: string
}

type LoadingPhase = null | "uploading" | "loading-preview"

export function ImageUpload({ label, value, onChange, className }: ImageUploadProps) {
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const pendingLoadedUrlRef = useRef<string | null>(null)

  const isUploading = loadingPhase !== null

  const handleFile = useCallback(async (file: File) => {
    setError(null)

    // Validate file before upload
    try {
      validateFile(file)
    } catch (err) {
      if (err instanceof StorageError) {
        setError(err.message)
        toast.error(err.message)
      }
      return
    }

    setLoadingPhase("uploading")
    const previousUrl = value && value.includes("supabase") ? value : null

    try {
      const url = await storage.upload(file)
      onChange(url)
      pendingLoadedUrlRef.current = url
      toast.success("Image uploaded successfully")
      setLoadingPhase("loading-preview")

      // Delete previous image in background — don't block UI
      if (previousUrl) {
        storage.delete(previousUrl).catch(() => {
          // Ignore delete errors; old image may be orphaned
        })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed"
      setError(message)
      toast.error(message)
      setLoadingPhase(null)
    }
  }, [value, onChange])

  const handleImageLoad = useCallback(() => {
    if (pendingLoadedUrlRef.current && value === pendingLoadedUrlRef.current) {
      pendingLoadedUrlRef.current = null
      setLoadingPhase(null)
    }
  }, [value])

  const handleImageError = useCallback(() => {
    if (pendingLoadedUrlRef.current && value === pendingLoadedUrlRef.current) {
      pendingLoadedUrlRef.current = null
      setLoadingPhase(null)
    }
  }, [value])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
    // Reset input so the same file can be selected again
    e.target.value = ""
  }, [handleFile])

  const handleRemove = useCallback(async () => {
    if (value && value.includes("supabase")) {
      await storage.delete(value).catch(() => {
        // Ignore delete errors
      })
    }
    onChange("")
    setError(null)
  }, [value, onChange])

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const hasImage = value && value.length > 0

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground/70 mb-1.5">
        {label}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.heic,.heif"
        onChange={handleInputChange}
        className="hidden"
      />

      {hasImage ? (
        // Image preview with remove/replace buttons
        <div className="relative group">
          <div className="relative aspect-video w-full overflow-hidden rounded-md border border-zinc-700 bg-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

            {/* Loading overlay when replacing image — high z-index so always on top */}
            {isUploading && (
              <div className="absolute inset-0 z-50 bg-black/70 flex flex-col items-center justify-center gap-2 isolate">
                <RefreshCw className="w-8 h-8 text-foreground/50 animate-spin" />
                <span className="text-sm text-foreground/50">
                  {loadingPhase === "uploading" ? "Uploading..." : "Loading preview..."}
                </span>
              </div>
            )}

            {/* Overlay with buttons (behind loading overlay) */}
            {!isUploading && (
            <div className="absolute inset-0 z-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleClick}
                disabled={isUploading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isUploading ? "animate-spin" : ""}`} />
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={isUploading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                Remove
              </button>
            </div>
            )}
          </div>
        </div>
      ) : (
        // Upload zone
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative flex flex-col items-center justify-center gap-2
            aspect-video w-full rounded-md border-2 border-dashed
            cursor-pointer transition-colors
            ${isDragging
              ? "border-netflix-red bg-netflix-red/10"
              : error
                ? "border-red-500 bg-red-500/10"
                : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/50 hover:bg-zinc-800"
            }
            ${isUploading ? "pointer-events-none opacity-50" : ""}
          `}
        >
          {isUploading ? (
            <>
              <RefreshCw className="w-8 h-8 text-foreground/50 animate-spin" />
              <span className="text-sm text-foreground/50">
                {loadingPhase === "uploading" ? "Uploading..." : "Loading preview..."}
              </span>
            </>
          ) : error ? (
            <>
              <AlertCircle className="w-8 h-8 text-red-500" />
              <span className="text-sm text-red-500 text-center px-4">{error}</span>
              <span className="text-xs text-foreground/40">Click to try again</span>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-foreground/50" />
              <span className="text-sm text-foreground/50">
                {isDragging ? "Drop image here" : "Click or drag to upload"}
              </span>
              <span className="text-xs text-foreground/40">Max 5MB</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
