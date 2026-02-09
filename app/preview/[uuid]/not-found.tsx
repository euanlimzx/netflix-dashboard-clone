import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-netflix-red mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Preview Not Found
        </h2>
        <p className="text-foreground/70 mb-8">
          This preview doesn&apos;t exist or may have been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/edit"
            className="px-6 py-3 bg-netflix-red hover:bg-netflix-red/90 rounded-md font-medium transition-colors"
          >
            Create Your Own
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-md font-medium transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
