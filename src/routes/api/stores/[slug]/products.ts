import { array, number, object, string } from "yup"
import type { RequestHandler } from "@sveltejs/kit"
import type { Locals } from "$lib/domain"
import { insertProductToStore } from "$lib/db"
import logger from "$lib/logger"
import { badRequest, unauthorized } from "$lib/rest"

const PostBody = object({
  name: string().required(),
  description: string().optional(),
  price: number().required(),
  tags: array(string())
})

export const post: RequestHandler<Locals, string> = async ({ locals, body, params }) => {
  const { slug } = params
  if (!locals.user) {
    return unauthorized("you have no power here.")
  }

  try {
    const payload = await PostBody.validate(await JSON.parse(body))
    const product = await insertProductToStore(payload, slug)

    return {
      status: 201,
      body: product
    }
  } catch (e) {
    logger.warn(e)
    return badRequest("bad request")
  }
}
