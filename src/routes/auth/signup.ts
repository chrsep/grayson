import type { RequestHandler } from "@sveltejs/kit"
import { object, string } from "yup"
import { createAccount } from "$lib/auth"
import { badRequest, noContent, unauthorized } from "$lib/rest"

const SignUp = object({
  name: string(),
  email: string().email().required(),
  password: string().required()
})

export const post: RequestHandler = async ({ body }) => {
  const parsedBody = await JSON.parse(body + "")

  try {
    const user = await SignUp.validate(parsedBody)
    const newUser = await createAccount(user)

    if (newUser) return noContent()
  } catch (e) {
    if (e.code === "P2002") {
      return badRequest("Email is already registered")
    }
    return badRequest(e)
  }

  return unauthorized("Wrong password")
}
