"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Highlighter } from "@/components/ui/highlighter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/components/ui/use-mobile";

export function LandingPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  const handleMakeYourOwnClick = () => {
    if (isMobile) {
      setMobileModalOpen(true);
    } else {
      router.push("/netflix/edit");
    }
  };

  const handleProceed = () => {
    setMobileModalOpen(false);
    router.push("/netflix/edit");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-16 md:py-24">
        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-start md:text-center text-zinc-900 tracking-tight leading-none max-w-4xl font-bold">
          your valentine's day card, made{" "}
          <Highlighter
            action="underline"
            color="#FF0000"
            strokeWidth={2}
            iterations={2}
          >
            creative.
          </Highlighter>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-zinc-500 text-center max-w-xl">
          netflix and chillin 😉
        </p>

        {/* Make your own button */}
        <button
          onClick={handleMakeYourOwnClick}
          className="mt-8 px-14 py-5 text-xl bg-black text-white font-medium rounded-full hover:bg-zinc-800 transition-colors"
        >
          make your own ♥
        </button>
      </div>

      {/* Mobile confirmation modal */}
      <Dialog open={mobileModalOpen} onOpenChange={setMobileModalOpen}>
        <DialogContent className="rounded-none border-0 bg-black p-6 text-white max-w-[min(calc(100vw-2rem),360px)] [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-white text-left">
              Editing experience is unoptimized for mobile
            </DialogTitle>
            <DialogDescription className="text-zinc-300 text-left mt-2">
              Proceed?
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={handleProceed}
            className="mt-4 w-full py-3 bg-white text-black font-medium rounded-none hover:bg-zinc-100 transition-colors"
          >
            Yes
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
