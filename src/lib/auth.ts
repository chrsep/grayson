import argon2 from "argon2/argon2.js"
import db, { insertSession } from "$lib/db"
import { serialize } from "$lib/cookie"
import type { CookieSerializeOptions } from "cookie"
import type { EndpointOutput } from "@sveltejs/kit"
import { badRequest, unauthorized } from "$lib/rest"

interface Credentials {
  email: string
  password: string
}

export const authenticate = async ({ email, password }: Credentials): Promise<EndpointOutput> => {
  const user = await db.user.findFirst({ where: { email } })
  if (!user) return unauthorized()

  if (await argon2.verify(user.password, password)) {
    return session(user.id)
  }

  return unauthorized()
}

export const register = async (user: {
  name: string
  password: string
  email: string
}): Promise<EndpointOutput> => {
  const password = await argon2.hash(user.password)
  const result = await db.user.create({
    data: { ...user, password }
  })

  return result.id !== null ? session(result.id) : badRequest()
}

export const createCookie = (name: string, value: string): string => {
  const cookieOptions: CookieSerializeOptions = {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "strict",
    secure: true
  }

  // disable protections for local dev
  if (import.meta.env.DEV) {
    cookieOptions.sameSite = "lax"
    cookieOptions.secure = false
  }

  return serialize(name, value, cookieOptions)
}

const session = async (userId: string) => {
  const token = await insertSession(userId)
  const cookie = createCookie("session", token)
  return {
    status: 200,
    headers: { "Set-Cookie": cookie },
    body: { message: "success" }
  }
}
