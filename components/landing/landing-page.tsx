import { LandingPreview } from "./landing-preview";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-16 md:py-24">
        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-start md:text-center text-zinc-900 tracking-tight leading-none max-w-4xl font-bold">
          your valentine's day card, made creative.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-zinc-500 text-center max-w-xl">
          netflix and chillin 😉
        </p>
      </div>

      {/* Preview Section */}
      <div className="px-4 pb-16 md:pb-24">
        <LandingPreview />
      </div>
    </div>
  );
}
