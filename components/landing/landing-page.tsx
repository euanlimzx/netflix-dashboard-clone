"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Highlighter } from "@/components/ui/highlighter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

        {/* Make your own button */}
        <button
          onClick={handleMakeYourOwnClick}
          className="mt-8 px-14 py-5 text-xl bg-black text-white font-medium rounded-full hover:bg-zinc-800 transition-colors"
        >
          make your own ♥
        </button>

        {/* Hero video - webm first, mp4 fallback */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="mt-8 w-full max-w-2xl rounded-xl overflow-hidden shadow-xl"
        >
          <source src="/gifs/main-video%20(1).webm" type="video/webm" />
          <source src="/gifs/main-video%20(1).mp4" type="video/mp4" />
        </video>

        {/* Subtitle */}
        <p className="mt-6 text-md md:text-lg text-zinc-500 text-center max-w-xl">
          Make your own Netflix-themed card 😉
        </p>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-sm text-zinc-400">
          Built with ❤️ by{" "}
          <a
            href="https://euanlimzx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors"
          >
            euanlimzx
          </a>
        </p>
      </footer>

      {/* Mobile confirmation modal */}
      <Dialog open={mobileModalOpen} onOpenChange={setMobileModalOpen}>
        <DialogContent className="rounded-none border-0 bg-black p-6 text-white max-w-[min(calc(100vw-2rem),360px)] [&>button:last-child]:hidden">
          <DialogHeader className="text-center">
            <DialogTitle className="text-white text-center">
              Editing experience is unoptimized for mobile
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 px-4">
            <button
              onClick={handleProceed}
              className="block w-full py-3 !bg-white !text-black font-medium !rounded-none border-0 text-center hover:bg-zinc-100 transition-colors"
            >
              Proceed?
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
