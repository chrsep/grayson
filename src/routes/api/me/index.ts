import type { RequestHandler } from "@sveltejs/kit"
import type { Locals } from "$lib/domain"
import { object, string } from "yup"
import { findUserById, updateUserById } from "$lib/db"
import { badRequest, unauthorized } from "$lib/rest"
import { isEmpty } from "lodash-es"

const PatchBody = object({
  name: string().optional(),
  email: string().optional()
})

export const patch: RequestHandler<Locals, string> = async ({ locals, body }) => {
  if (!locals.user) return unauthorized()

  const payload = await PatchBody.validate(await JSON.parse(body))
  if (isEmpty(payload)) {
    return badRequest("at least put something in your request")
  }

  const oldUser = findUserById(locals.user.id)
  const newUser = await updateUserById(locals.user.id, { ...oldUser, ...payload })

  return {
    status: 200,
    body: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  }
}
