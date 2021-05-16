import type { RequestHandler } from "@sveltejs/kit"
import type { Locals, Product } from "$lib/domain"
import { findAllProducts } from "$lib/db"

export const get: RequestHandler<Locals, string> = async ({ query }) => {
  const tags = query.get("tags")
  const products = await findAllProducts(tags)

  return {
    status: 200,
    body: products
  }
}
