import db from "$lib/db"
import type { Locals } from "$lib/domain"
import type { RequestHandler } from "@sveltejs/kit"
import { string, object } from "yup"
import { generateUniqueSlug } from "$lib/domain"

const PostBody = object({
  name: string().required(),
  description: string(),
  address: string().required(),
  phone: string().required()
})

export const post: RequestHandler<Locals, string> = async ({ locals, body }) => {
  if (!locals.user) {
    return {
      status: 400,
      body: {
        message: "you don't have permission to access this api"
      }
    }
  }

  const { name, address, phone, description } = await PostBody.validate(await JSON.parse(body))

  const store = await db.store.create({
    data: {
      name,
      address,
      phone,
      description,
      slug: generateUniqueSlug(name),
      users: {
        connect: {
          email: locals.user.email
        }
      },
      owner: {
        connect: {
          email: locals.user.email
        }
      }
    }
  })

  return {
    status: 201,
    body: store
  }
}

export const get: RequestHandler<Locals, string> = async ({ locals }) => {
  if (!locals.user) {
    return {
      status: 401,
      body: []
    }
  }

  const stores = await db.store.findMany({
    where: {
      users: {
        some: {
          email: locals.user.email
        }
      }
    }
  })

  return {
    status: 200,
    body: stores
  }
}
