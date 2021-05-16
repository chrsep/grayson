import type { RequestHandler } from "@sveltejs/kit"
import type { Locals, Product } from "$lib/domain"
import { findAllProducts, findProductById } from "$lib/db"

export const get: RequestHandler<Locals, string> = async ({ params }) => {
  const product = await findProductById(params.slug)

  return {
    status: 200,
    body: product
  }
}
