import type { RequestHandler } from "@sveltejs/kit"
import { findStoreBySlug } from "$lib/db"
import type { Store } from "$lib/domain"

export const get: RequestHandler = async ({ params }) => {
  const store: Store = await findStoreBySlug(params.slug)

  return {
    body: store
  }
}
