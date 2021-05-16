import type { RequestHandler } from "@sveltejs/kit"
import { object, string } from "yup"
import { register, createCookie, createSession } from "$lib/auth"
import { badRequest, unauthorized } from "$lib/rest"
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
    const id = await register(user)
    if (id !== null) {
      const token = await createSession(id)
      const cookie = createCookie("session", token)
      return {
        status: 200,
        headers: { "Set-Cookie": cookie },
        body: { message: "success" }
      }
    }
  } catch (e) {
    if (e.code === "P2002") {
      return badRequest("Email is already registered")
    }
    logger.warn(e)
    return badRequest(e.message)
  }

  return unauthorized("Wrong password")
}
