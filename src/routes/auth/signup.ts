import type { RequestHandler } from "@sveltejs/kit"
import { object, string } from "yup"
import { register } from "$lib/auth"
import { badRequest } from "$lib/rest"
import logger from "$lib/logger"

const SignUp = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required()
})

export const post: RequestHandler = async (req) => {
  const parsedBody = await JSON.parse(req?.body + "")
  const user = await SignUp.validate(parsedBody)

  try {
    return await register(user)
  } catch (e) {
    if (e.code === "P2002") {
      return badRequest("Email is already registered")
    }
    logger.warn(e)
    return badRequest(e.message)
  }
}
