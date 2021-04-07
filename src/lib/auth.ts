import argon2 from "argon2/argon2.js"
import db from "$lib/db"
import jwt from "jsonwebtoken"
import { now } from "$lib/time"
import { parse, serialize } from "$lib/cookie"
import type { User } from "$lib/domain"
import type { CookieSerializeOptions } from "cookie"

const { VITE_JWT_SECRET } = import.meta.env

interface Credentials {
  email: string
  password: string
}

export const authenticate = async ({
  email,
  password
}: Credentials): Promise<null | Omit<User, "stores">> => {
  const user = await db.user.findFirst({
    where: { email }
  })

  if (!user) return null

  const isValid = await argon2.verify(user.password, password)
  if (isValid) return user

  return null
}

export const createAccount = async (user: {
  name: string
  password: string
  email: string
}): Promise<string | null> => {
  const password = await argon2.hash(user.password)
  const newUser = await db.user.create({
    data: {
      ...user,
      password
    }
  })

  if (newUser !== null) return newUser.id

  return null
}

export const createSession = async (): Promise<string> => {
  const session = await db.session.create({
    data: {
      expires_at: now().add(7, "day").toISOString()
    }
  })

  return session.id
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
    cookieOptions.domain = import.meta.env.VITE_DEV_DOMAIN as string
  }

  return serialize(name, value, cookieOptions)
}

interface JWTToken {
  id: string
  access_token: string
}

export const createToken = (payload: JWTToken): string => {
  return jwt.sign(payload, VITE_JWT_SECRET as string)
}

export const parseSession = (cookie: string): JWTToken | false => {
  const cookies = parse(cookie || "")

  return cookies.session === undefined
    ? false
    : (jwt.verify(cookies.session, VITE_JWT_SECRET as string) as JWTToken)
}
