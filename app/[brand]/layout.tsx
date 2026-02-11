import { notFound } from "next/navigation"
import { isValidBrand } from "@/lib/brands"
import { BrandProvider } from "@/lib/brand-context"

interface Props {
  params: Promise<{ brand: string }>
  children: React.ReactNode
}

export default async function BrandLayout({ params, children }: Props) {
  const { brand } = await params

  // Validate brand parameter
  if (!isValidBrand(brand)) {
    notFound()
  }

  return <BrandProvider brand={brand}>{children}</BrandProvider>
}
