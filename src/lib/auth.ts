import argon2 from "argon2/argon2.js"
import db from "$lib/db"
import jwt from "jsonwebtoken"
import { now } from "$lib/time"
import { parse, serialize } from "$lib/cookie"

const { VITE_JWT_SECRET } = import.meta.env

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
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: import.meta.env.PROD,
    path: "/"
  })
}

interface JWTToken {
  id: string
  access_token: string
}

export const createToken = (payload: JWTToken) => {
  return jwt.sign(payload, VITE_JWT_SECRET as string)
}

export const parseSession = (cookie: string): JWTToken | false => {
  const cookies = parse(cookie || "")

  return cookies.session === undefined
    ? false
    : (jwt.verify(cookies.session, VITE_JWT_SECRET as string) as JWTToken)
}
