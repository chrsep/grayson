import argon2 from "argon2/argon2.js"
import db from "$lib/db"
import { serialize } from "$lib/cookie"
import type { User } from "$lib/domain"
import type { CookieSerializeOptions } from "cookie"
import { nanoid } from "nanoid"
import { redis } from "$lib/redis"

interface Credentials {
  email: string
  password: string
}

export const authenticate = async ({
  email,
  password
}: Credentials): Promise<null | Omit<User, "stores">> => {
  const user = await db.user.findFirst({ where: { email } })
  if (!user) return null

  if (await argon2.verify(user.password, password)) return user
  return null
}

export const register = async (user: {
  name: string
  password: string
  email: string
}): Promise<string | null> => {
  const password = await argon2.hash(user.password)
  const result = await db.user.create({
    data: { ...user, password }
  })

  if (result !== null) return result.id
  return null
}

export const createSession = async (userId: string): Promise<string> => {
  const session = nanoid(16)
  const ok = await redis.set(session, userId)
  if (!ok) throw Error("failed to save session")

  return session
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
