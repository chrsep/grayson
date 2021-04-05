import { authenticate, createToken } from "$lib/auth"
import type { RequestHandler } from "@sveltejs/kit"
import { badRequest, noContent, unauthorized } from "$lib/rest"
import { object, string } from "yup"
import { v4 as uuidv4 } from "uuid"
import { serialize } from "$lib/cookie"

const Login = object({
  email: string().email().required(),
  password: string().required()
})

export const post: RequestHandler = async ({ body }) => {
  const parsedBody = await JSON.parse(body + "")

  try {
    const credentials = await Login.validate(parsedBody)
    const user = await authenticate(credentials)
    const access_token = uuidv4()

    if (user) {
      const token = createToken({
        id: user.id,
        access_token
      })
      const sessionCookie = serialize("session", token, {
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24
      })
      return {
        status: 200,
        headers: {
          "Set-Cookie": sessionCookie
        },
        body: { message: "success" }
      }
    }
  } catch (e) {
    return badRequest(e.message)
  }

  return unauthorized("Wrong password")
}
