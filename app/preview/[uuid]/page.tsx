import { notFound } from "next/navigation"
import { loadPreview } from "@/lib/preview-storage"
import { SavedPreviewClient } from "./client"

interface Props {
  params: Promise<{ uuid: string }>
}

export default async function SavedPreviewPage({ params }: Props) {
  const { uuid } = await params

  // Validate UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(uuid)) {
    notFound()
  }

  const config = await loadPreview(uuid)

  if (!config) {
    notFound()
  }

  return <SavedPreviewClient config={config} />
}
