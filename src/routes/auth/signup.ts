import type { RequestHandler } from "@sveltejs/kit"
import { object, string } from "yup"
import { createAccount, createCookie, createSession, createToken } from "$lib/auth"
import { badRequest, unauthorized } from "$lib/rest"
import logger from "$lib/logger"

const SignUp = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required()
})

export const post: RequestHandler = async (req) => {
  const parsedBody = await JSON.parse(req?.body + "")

  try {
    const user = await SignUp.validate(parsedBody)

    const id = await createAccount(user)

    if (id !== null) {
      const access_token = await createSession()
      const token = createToken({ id, access_token })
      const sessionCookie = createCookie("session", token)
      return {
        status: 200,
        headers: { "Set-Cookie": sessionCookie },
        body: { message: "success" }
      }
    }
  } catch (e) {
    if (e.code === "P2002") {
      return badRequest("Email is already registered")
    }
    logger.log(e)
    return badRequest(e.message)
  }

  return unauthorized("Wrong password")
}
