"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type ContentItem = {
  id: number;
  title: string;
  image: string;
  tag?: string;
};

interface ContentRowProps {
  title: string;
  items: readonly ContentItem[] | ContentItem[];
  onCardClick?: (id: number) => void;
}

export function ContentRow({ title, items, onCardClick }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative px-4 md:px-12 mb-6 md:mb-8">
      <h2 className="text-base md:text-xl font-semibold text-foreground mb-2 md:mb-3">
        {title}
      </h2>

      <div className="group/row relative">
        {/* Left Arrow - desktop only */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-background/60 hover:bg-background/80 items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity rounded-r hidden md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {items.map((item) => (
            <ContentCard key={item.id} item={item} onClick={onCardClick} />
          ))}
        </div>

        {/* Right Arrow - desktop only */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-background/60 hover:bg-background/80 items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity rounded-l hidden md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </div>
  );
}

function ContentCard({
  item,
  onClick,
}: {
  item: ContentItem;
  onClick?: (id: number) => void;
}) {
  const tag = item.tag;

  return (
    <button
      type="button"
      onClick={() => onClick?.(item.id)}
      className="relative flex-shrink-0 w-[140px] md:w-[220px] lg:w-[260px] group/card cursor-pointer text-left"
      aria-label={`View details for ${item.title}`}
    >
      <div className="relative aspect-video rounded overflow-hidden transition-transform duration-300 md:group-hover/card:scale-105 md:group-hover/card:z-10 md:group-hover/card:shadow-xl md:group-hover/card:shadow-black/50">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 140px, (max-width: 1024px) 220px, 260px"
        />
        {/* Hover overlay - desktop only */}
        <div className="absolute inset-0 bg-black/0 md:group-hover/card:bg-black/10 transition-colors" />
      </div>

      {/* Tag badges */}
      {tag && (
        <div className="absolute bottom-1.5 md:bottom-2 left-1.5 md:left-2 flex gap-1">
          {tag.includes("New Season") && (
            <span className="px-1.5 md:px-2 py-0.5 text-[9px] md:text-xs font-bold bg-netflix-red text-foreground rounded-sm">
              New Season
            </span>
          )}
          {tag.includes("Coming Soon") && (
            <span className="px-1.5 md:px-2 py-0.5 text-[9px] md:text-xs font-bold bg-netflix-gray text-foreground rounded-sm">
              Coming Soon
            </span>
          )}
        </div>
      )}
    </button>
  );
}
