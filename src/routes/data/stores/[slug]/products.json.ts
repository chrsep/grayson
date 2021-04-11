import type { RequestHandler } from "@sveltejs/kit"
import { findStoreProductByStoreSlug } from "$lib/db"
import type { Product } from "$lib/domain"

export const get: RequestHandler = async ({ params }) => {
  const body: Product[] = await findStoreProductByStoreSlug(params.slug)
  return { body }
}
