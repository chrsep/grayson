import type { RequestHandler } from "@sveltejs/kit"
import type { Context } from "$lib/domain"
import { object, string } from "yup"
import db, { findStoreBySlugAndUserEmail, updateStoreBySlug } from "$lib/db"
import { badRequest, unauthorized } from "$lib/rest"
import { isEmpty, isNil } from "lodash-es"

const PatchBody = object({
  name: string().optional(),
  description: string().optional(),
  address: string().optional(),
  phone: string().optional()
})

export const patch: RequestHandler<Context, string> = async ({ params, context, body }) => {
  const { slug } = params
  const { user } = context
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

  return { status: 200, body: store }
}
