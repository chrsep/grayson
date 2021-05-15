import type { RequestHandler } from "@sveltejs/kit"
import type { Context, Product } from "$lib/domain"
import { findAllProducts } from "$lib/db"

export const get: RequestHandler<Context, string> = async ({ query }) => {
  const tags = query.get("tags")
  const products: Product[] = await findAllProducts(tags)

  return {
    status: 200,
    body: products
  }
}
