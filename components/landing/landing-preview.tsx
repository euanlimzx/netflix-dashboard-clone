"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Smartphone, Monitor } from "lucide-react"
import { getBrandConfig } from "@/lib/brands"

type ViewportMode = "mobile" | "desktop"

export function LandingPreview() {
  const [viewport, setViewport] = useState<ViewportMode>("mobile")
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const isReadyRef = useRef(false)
  const config = getBrandConfig("netflix")

  const sendConfig = useCallback(() => {
    if (iframeRef.current?.contentWindow && isReadyRef.current) {
      iframeRef.current.contentWindow.postMessage(
        { type: "CONFIG_UPDATE", config, viewport },
        "*"
      )
    }
  }, [config, viewport])

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "PREVIEW_READY") {
        isReadyRef.current = true
        sendConfig()
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [sendConfig])

  useEffect(() => {
    const timer = setTimeout(() => sendConfig(), 100)
    return () => clearTimeout(timer)
  }, [viewport, sendConfig])

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Toggle - Light themed, pill-shaped */}
      <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-full shadow-sm">
        <button
          onClick={() => setViewport("mobile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewport === "mobile"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span className="hidden sm:inline">Mobile</span>
        </button>
        <button
          onClick={() => setViewport("desktop")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewport === "desktop"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span className="hidden sm:inline">Landscape</span>
        </button>
      </div>

      {/* Preview Container */}
      <div className="w-full max-w-5xl">
        <div
          className={`relative mx-auto transition-all duration-300 ${
            viewport === "mobile" ? "max-w-[280px] sm:max-w-[320px]" : "max-w-full"
          }`}
        >
          {viewport === "mobile" ? (
            <div className="relative bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-900 rounded-b-2xl z-10" />
              {/* Screen */}
              <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-[9/19.5]">
                <iframe
                  ref={iframeRef}
                  src="/netflix/preview"
                  className="w-full h-full border-0"
                  title="Preview"
                />
              </div>
            </div>
          ) : (
            <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-2xl">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-700">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-zinc-800 rounded-md px-3 py-1 text-xs text-zinc-400">
                    yourvalentine.app
                  </div>
                </div>
              </div>
              {/* Screen */}
              <div className="aspect-video">
                <iframe
                  ref={iframeRef}
                  src="/netflix/preview"
                  className="w-full h-full border-0"
                  title="Preview"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
