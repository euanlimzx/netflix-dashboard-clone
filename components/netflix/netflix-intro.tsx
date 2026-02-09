"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function NetflixIntro() {
  const isMobile = useIsMobile();
  const [showAnimation, setShowAnimation] = useState(true);
  const [checkMobile, setCheckMobile] = useState(false);

  useEffect(() => {
    // Delay mobile check by 0.5s
    const mobileCheckTimer = setTimeout(() => {
      setCheckMobile(true);
    }, 300);

    // Hide animation after 4 seconds (animation duration + buffer)
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(mobileCheckTimer);
    };
  }, []);

  // Skip animation on mobile after 0.5s delay - render page directly
  if ((checkMobile && isMobile) || !showAnimation) {
    return null;
  }

  // Helper function to generate fur spans
  const renderFurSpans = () => {
    return Array.from({ length: 31 }, (_, i) => (
      <span key={i + 1} className={`fur-${i + 1}`}></span>
    ));
  };

  // Helper function to generate lamp spans
  const renderLampSpans = () => {
    return Array.from({ length: 28 }, (_, i) => (
      <span key={i + 1} className={`lamp-${i + 1}`}></span>
    ));
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="netflix-intro-container">
        <div className="netflixintro" data-letter="N">
          <div className="helper-1">
            <div className="effect-brush">{renderFurSpans()}</div>
            <div className="effect-lumieres">{renderLampSpans()}</div>
          </div>
          <div className="helper-2">
            <div className="effect-brush">{renderFurSpans()}</div>
          </div>
          <div className="helper-3">
            <div className="effect-brush">{renderFurSpans()}</div>
          </div>
          <div className="helper-4">
            <div className="effect-brush">{renderFurSpans()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
