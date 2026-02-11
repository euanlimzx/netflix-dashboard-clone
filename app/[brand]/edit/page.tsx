"use client";

import { useState, useEffect } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { ConfigForm } from "@/components/editor/config-form";
import { PreviewFrame } from "@/components/editor/preview-frame";
import { CreateButton } from "@/components/editor/create-button";
import { ShareDialog } from "@/components/editor/share-dialog";
import { getDefaultConfig } from "@/lib/brands";
import { useBrand } from "@/lib/brand-context";
import { useIsMobile } from "@/hooks/use-mobile";
import type { BrandConfig } from "@/lib/brands";

type ViewportMode = "mobile" | "desktop";
type MobileView = "editor" | "preview";

export default function EditPage() {
  const brand = useBrand();
  const [config, setConfig] = useState<BrandConfig>(() =>
    getDefaultConfig(brand),
  );
  const [viewport, setViewport] = useState<ViewportMode>("mobile");
  const [shareUuid, setShareUuid] = useState<string | null>(null);
  const [sidebarOpenKey, setSidebarOpenKey] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<MobileView>("editor");
  const isBrowserMobile = useIsMobile();

  // When browser is desktop (not mobile): listen for preview clicks and open the matching sidebar section
  useEffect(() => {
    if (isBrowserMobile) return;
    function handleMessage(event: MessageEvent) {
      const data = event.data;
      if (data?.type !== "PREVIEW_CLICK") return;
      if (data.target === "navbar") {
        setSidebarOpenKey("navbar");
      } else if (data.target === "hero") {
        setSidebarOpenKey("hero");
      } else if (data.target === "show" && typeof data.showIndex === "number") {
        if (data.showIndex >= 0) {
          setSidebarOpenKey(`show-${data.showIndex}`);
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isBrowserMobile]);

  // Desktop layout: current two-panel editor + preview
  if (!isBrowserMobile) {
    return (
      <div className="h-screen flex bg-gray-50 text-gray-900 font-sans">
        {/* Left Panel - Config Form (Light Mode) */}
        <div className="w-[400px] flex-shrink-0 border-r border-gray-200 bg-white flex flex-col">
          <div className="flex-1 overflow-hidden">
            <ConfigForm
              config={config}
              onChange={setConfig}
              openSectionKey={sidebarOpenKey}
              onOpenSectionKeyChange={setSidebarOpenKey}
            />
          </div>
          <div className="p-6">
            <CreateButton
              config={config}
              brand={brand}
              onSuccess={setShareUuid}
            />
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex flex-1 flex-col bg-white px-6 pb-10 min-h-0">
          <div className="flex shrink-0 items-center justify-center py-4">
            <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setViewport("mobile")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  viewport === "mobile"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  viewport === "desktop"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Monitor className="h-4 w-4" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <PreviewFrame config={config} viewport={viewport} brand={brand} />
          </div>
        </div>

        {/* Share Dialog */}
        <ShareDialog
          uuid={shareUuid || ""}
          brand={brand}
          open={shareUuid !== null}
          onClose={() => setShareUuid(null)}
        />
      </div>
    );
  }

  // Mobile layout: single full-screen view (editor or preview) with floating toggle button
  return (
    <div className="relative h-screen bg-gray-50 text-gray-900 font-sans">
      {mobileView === "editor" ? (
        <div className="flex h-full flex-col bg-white">
          <div className="flex-1 overflow-auto">
            <ConfigForm
              config={config}
              onChange={setConfig}
              openSectionKey={sidebarOpenKey}
              onOpenSectionKeyChange={setSidebarOpenKey}
            />
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col overflow-hidden bg-white">
          <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
            <h2 className="text-sm font-medium text-gray-700">Preview</h2>
            <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setViewport("mobile")}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewport === "mobile"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Smartphone className="h-3 w-3" />
                Mobile
              </button>
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewport === "desktop"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Monitor className="h-3 w-3" />
                Desktop
              </button>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center p-3">
            {viewport === "desktop" ? (
              <div className="flex h-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-600">
                Landscape previews are not supported on mobile. Please switch
                back to the Mobile view.
              </div>
            ) : (
              <PreviewFrame config={config} viewport={viewport} brand={brand} />
            )}
          </div>
        </div>
      )}

      {/* Floating buttons */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
        <div className="pointer-events-auto flex w-full max-w-md gap-3">
          {mobileView === "editor" ? (
            <>
              <button
                type="button"
                className="flex-1 rounded-md border border-black bg-white px-4 py-3 text-base font-bold text-gray-900 shadow-lg shadow-black/20 tracking-[-0.02em]"
                style={{
                  fontFamily:
                    "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
                onClick={() => setMobileView("preview")}
              >
                Preview
              </button>
              <CreateButton
                config={config}
                brand={brand}
                onSuccess={setShareUuid}
                className="flex-1 rounded-md text-base py-3"
                label="Create"
              />
            </>
          ) : (
            <button
              type="button"
              className="flex-1 rounded-md bg-black px-4 py-3 text-base font-bold text-white shadow-lg shadow-black/50 tracking-[-0.02em]"
              style={{
                fontFamily:
                  "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
              onClick={() => setMobileView("editor")}
            >
              Back to editing
            </button>
          )}
        </div>
      </div>

      {/* Share Dialog */}
      <ShareDialog
        uuid={shareUuid || ""}
        brand={brand}
        open={shareUuid !== null}
        onClose={() => setShareUuid(null)}
      />
    </div>
  );
}
