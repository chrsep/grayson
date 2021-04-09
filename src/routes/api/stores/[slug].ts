import type { RequestHandler } from "@sveltejs/kit"
import type { Context } from "$lib/domain"
import { object, string } from "yup"
import db from "$lib/db"
import { badRequest, unauthorized } from "$lib/rest"

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

  const oldStore = await db.store.findFirst({
    where: { slug, owner: { email: user.email } }
  })
  if (oldStore === null) return unauthorized()

  const newStore = await PatchBody.validate(await JSON.parse(body))
  if (!newStore.name && !newStore.address && !newStore.phone && !newStore.description) {
    return badRequest("at least put something in your request")
  }

  const store = await db.store.update({
    where: { slug },
    data: { ...oldStore, ...newStore }
  })

  return { status: 200, body: store }
}
