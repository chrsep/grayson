import { Product, ProductImage } from "@prisma/client"

export interface LineItem {
  storeId: string
  productId: string
  qty: number
}

export interface ProductWithImages extends Product {
  images: ProductImage[]
}
