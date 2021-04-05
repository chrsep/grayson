import argon2 from "argon2/argon2.js"
import db from "$lib/db"
import jwt from "jsonwebtoken"

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
