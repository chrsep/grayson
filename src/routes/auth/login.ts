import { authenticate } from "$lib/auth"
import type { RequestHandler } from "@sveltejs/kit"
import { badRequest } from "$lib/rest"
import { object, string } from "yup"
import logger from "$lib/logger"

const Login = object({
  email: string().email().required(),
  password: string().required()
})

export const post: RequestHandler = async (req) => {
  const parsedBody = await JSON.parse(req?.body + "")

  try {
    const credentials = await Login.validate(parsedBody)
    return await authenticate(credentials)
  } catch (e) {
    logger.warn(e)
    return badRequest(e.message)
  }
}
