import type { RequestHandler } from "@sveltejs/kit"
import { findStoreProductByStoreSlug } from "$lib/db"

export const get: RequestHandler = async ({ params }) => {
  const body = await findStoreProductByStoreSlug(params.slug)
  return { body }
}
