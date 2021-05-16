import type { RequestHandler } from "@sveltejs/kit"
import type { Locals } from "$lib/domain"
import { object, string } from "yup"
import { findStoreBySlugAndUserEmail, updateStoreBySlug } from "$lib/db"
import { badRequest, unauthorized } from "$lib/rest"
import { isEmpty, isNil } from "lodash-es"

const PatchBody = object({
  name: string().optional(),
  description: string().optional(),
  address: string().optional(),
  phone: string().optional()
})

export const patch: RequestHandler<Locals, string> = async ({ params, locals, body }) => {
  const { slug } = params
  const { user } = locals
  if (!user) return unauthorized()

  const oldStore = findStoreBySlugAndUserEmail(slug, user.email)
  if (isNil(oldStore)) {
    return unauthorized()
  }

  const newStore = await PatchBody.validate(await JSON.parse(body))
  if (isEmpty(newStore)) {
    return badRequest("at least put something in your request")
  }

  const store = await updateStoreBySlug(slug, { ...oldStore, ...newStore })
  return {
    status: 200,
    body: store
  }
}
