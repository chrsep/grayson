import { authenticate } from "$lib/auth"
import type { RequestHandler } from "@sveltejs/kit"
import { badRequest, noContent, unauthorized } from "$lib/rest"
import { object, string } from "yup"

const PostLoginBody = object({
  email: string().email().required(),
  password: string().required()
})

export const post: RequestHandler = async ({ body }) => {
  const parsedBody = await JSON.parse(body + "")

  try {
    const credentials = await PostLoginBody.validate(parsedBody)
    const isValid = await authenticate(credentials)

    if (isValid) return noContent()
  } catch (e) {
    return badRequest(e.message)
  }

  return unauthorized("Wrong password")
}
