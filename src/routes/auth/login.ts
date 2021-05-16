import { authenticate, createCookie, createSession } from "$lib/auth"
import type { RequestHandler } from "@sveltejs/kit"
import { badRequest, unauthorized } from "$lib/rest"
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
    const user = await authenticate(credentials)

    if (user !== null) {
      const token = await createSession(user.id)
      const sessionCookie = createCookie("session", token)

      return {
        status: 200,
        headers: { "Set-Cookie": sessionCookie },
        body: { message: "success" }
      }
    }

    return unauthorized("Wrong password")
  } catch (e) {
    logger.warn(e)
    return badRequest(e.message)
  }
}
