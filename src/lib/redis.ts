import Redis from "ioredis"

export const redis = new Redis(process.env.REDIS_URL)

export const findSessionByAccessToken = async (token: string): Promise<string> => {
  return redis.get(token)
}
