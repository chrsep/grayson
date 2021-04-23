import type { RequestHandler } from "@sveltejs/kit"
import type { Context, Product } from "$lib/domain"
import { findAllProducts, findProductById } from "$lib/db"

export const get: RequestHandler<Context, string> = async ({ params }) => {
  const product: Product = await findProductById(params.slug)

  return {
    status: 200,
    body: product
  }
}
