import type { RequestHandler } from "@sveltejs/kit"
import { findStoreBySlug, findStoreProductByStoreSlug } from "$lib/db"
import type { Product, Store } from "$lib/domain"

export const get: RequestHandler = async ({ params }) => {
  const products: Product[] = await findStoreProductByStoreSlug(params.slug)

  return {
    body: products
  }
}
