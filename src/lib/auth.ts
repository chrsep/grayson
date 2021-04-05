import argon2 from "argon2/argon2.js"
import db from "$lib/db"
import jwt from "jsonwebtoken"
import { now } from "$lib/time"
import { serialize } from "$lib/cookie"

interface Credentials {
  email: string
  password: string
}

export const authenticate = async ({ email, password }: Credentials) => {
  const user = await db.user.findFirst({
    where: { email }
  })

  if (!user) return false

  const isValid = await argon2.verify(user.password, password)
  if (isValid) return user

  return false
}

export const createAccount = async (user: { name: string; password: string; email: string }) => {
  const password = await argon2.hash(user.password)
  return await db.user.create({
    data: {
      ...user,
      password
    }
  })
}

export const createToken = (payload) => {
  return jwt.sign(payload, import.meta.env.VITE_JWT_SECRET as string)
}

export const createSession = async () => {
  const session = await db.session.create({
    data: {
      expires_at: now().add(7, "day").toISOString()
    }
  })

  return session.id
}

export const createCookie = (name: string, value: string) => {
  return serialize(name, value, {
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24
  })
}
