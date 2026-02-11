import { notFound } from "next/navigation"
import { loadPreview } from "@/lib/preview-storage"
import { isValidBrand } from "@/lib/brands"
import { SavedPreviewClient } from "./client"

interface Props {
  params: Promise<{ brand: string; uuid: string }>
}

export default async function SavedPreviewPage({ params }: Props) {
  const { brand, uuid } = await params

  // Validate brand
  if (!isValidBrand(brand)) {
    notFound()
  }

  // Validate UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(uuid)) {
    notFound()
  }

  // Load preview with brand validation
  const config = await loadPreview(uuid, brand)

  if (!config) {
    notFound()
  }

  return <SavedPreviewClient config={config} />
}
