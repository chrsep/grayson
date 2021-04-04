import argon2 from "argon2/argon2.js"
import db from "$lib/db"

interface Credentials {
  email: string
  password: string
}

export const authenticate = async ({ email, password }: Credentials) => {
  const user = await db.user.findFirst({
    where: { email }
  })

  if (!user) return false

  return await argon2.verify(user.password, password)
}
