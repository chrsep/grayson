import Redis from "ioredis"
import { nanoid } from "nanoid"

export const redis = new Redis(process.env.REDIS_URL)

export const findSessionByAccessToken = async (token: string): Promise<string> => {
  return redis.get(token)
}

export const createSession = async (userId: string): Promise<string> => {
  const session = nanoid(16)
  const ok = await redis.set(session, userId)
  if (!ok) throw Error("failed to save session")

  return session
}
