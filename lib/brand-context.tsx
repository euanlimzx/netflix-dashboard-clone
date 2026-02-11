"use client"

import { createContext, useContext, ReactNode } from "react"
import type { Brand } from "./brands"

const BrandContext = createContext<Brand | null>(null)

export function useBrand(): Brand {
  const context = useContext(BrandContext)
  if (!context) {
    throw new Error("useBrand must be used within a BrandProvider")
  }
  return context
}

export function BrandProvider({
  brand,
  children,
}: {
  brand: Brand
  children: ReactNode
}) {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>
}
