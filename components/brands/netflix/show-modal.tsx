"use client";

import { useEffect, useCallback } from "react";
import { X, Play, Plus, ThumbsUp, Volume2 } from "lucide-react";
import Image from "next/image";
import { useConfig } from "@/lib/config-context";

type ShowDetail = {
  id: number;
  title: string;
  image: string;
  tag?: string;
  matchPercent: number;
  year: number;
  rating: string;
  episodes: string;
  headline: string;
  synopsis: string;
  cast: string[];
  genres: string[];
  mood: string;
};

interface ShowModalProps {
  show: ShowDetail | null;
  onClose: () => void;
}

export function ShowModal({ show, onClose }: ShowModalProps) {
  const config = useConfig();
  const labels = config.modal;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, handleKeyDown]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        role="button"
        tabIndex={0}
        aria-label={labels.closeLabel}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-[95vw] md:max-w-[850px] bg-[#181818] rounded-lg overflow-hidden mt-4 md:mt-8 mb-8 z-10 shadow-2xl shadow-black/80 max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${show.title}`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-[#181818] flex items-center justify-center text-foreground hover:bg-[#2a2a2a] transition-colors"
          aria-label={labels.closeLabel}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Section */}
        <div className="relative w-full aspect-video md:aspect-[16/9]">
          <Image
            src={show.image || "/placeholder.svg"}
            alt={show.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 95vw, 850px"
          />

          {/* Gradient fade at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />

          {/* Title and N SERIES badge */}
          <div className="absolute bottom-16 md:bottom-20 left-6 md:left-10 z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-netflix-red font-bold text-lg tracking-wider">
                N
              </span>
              <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-foreground/90 uppercase">
                {labels.seriesBadgeLabel}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-wider uppercase">
              {show.title}
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-4 md:bottom-6 left-6 md:left-10 flex items-center gap-2 md:gap-3 z-10">
            <button
              type="button"
              className="flex items-center gap-2 px-5 md:px-8 py-1.5 md:py-2 bg-foreground text-background rounded font-semibold text-sm md:text-base hover:bg-foreground/80 transition-colors"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              {labels.playButtonLabel}
            </button>
            <button
              type="button"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-foreground/40 flex items-center justify-center text-foreground hover:border-foreground transition-colors bg-[#2a2a2a]/60"
              aria-label={labels.addToListLabel}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              type="button"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-foreground/40 flex items-center justify-center text-foreground hover:border-foreground transition-colors bg-[#2a2a2a]/60"
              aria-label={labels.likeLabel}
            >
              <ThumbsUp className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Volume icon - bottom right */}
          <div className="absolute bottom-4 md:bottom-6 right-6 md:right-10 z-10">
            <button
              type="button"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-foreground/40 flex items-center justify-center text-foreground/70 hover:border-foreground transition-colors"
              aria-label={labels.volumeLabel}
            >
              <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Content Metadata Section */}
        <div className="px-6 md:px-10 py-5 md:py-6 flex flex-col md:flex-row gap-6">
          {/* Left Column - Primary Info */}
          <div className="flex-1 min-w-0">
            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
              <span className="text-green-500 font-bold">
                {show.matchPercent}% Match
              </span>
              <span className="text-foreground/70">{show.year}</span>
              <span className="px-1.5 py-0.5 border border-foreground/40 text-foreground/70 text-xs rounded">
                {show.rating}
              </span>
              <span className="text-foreground/70">{show.episodes}</span>
              <span className="px-1.5 py-0.5 bg-foreground/20 text-foreground/80 text-[10px] md:text-xs rounded font-semibold">
                {labels.hdBadge}
              </span>
              <span className="text-foreground/50 text-xs flex items-center gap-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
                {labels.adBadge}
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-base md:text-lg font-bold text-foreground mb-3">
              {show.headline}
            </h3>

            {/* Synopsis */}
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
              {show.synopsis}
            </p>
          </div>

          {/* Right Column - Tags & Cast */}
          <div className="w-full md:w-[220px] flex-shrink-0 space-y-3 text-sm">
            <p className="text-foreground/60">
              <span className="text-foreground/40">{labels.castLabel} </span>
              <span className="text-foreground/80">
                {show.cast.slice(0, 3).join(", ")}
                {show.cast.length > 3 && (
                  <>
                    ,{" "}
                    <span className="italic text-foreground/50 cursor-pointer hover:underline">
                      {labels.moreLabel}
                    </span>
                  </>
                )}
              </span>
            </p>
            <p className="text-foreground/60">
              <span className="text-foreground/40">{labels.genresLabel} </span>
              <span className="text-foreground/80">
                {show.genres.join(", ")}
              </span>
            </p>
            <p className="text-foreground/60">
              <span className="text-foreground/40">{labels.moodLabel} </span>
              <span className="text-foreground/80">{show.mood}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
