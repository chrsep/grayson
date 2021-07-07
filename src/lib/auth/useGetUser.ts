import useSWR from "swr"
import { Session } from "next-auth"

const useGetUser = () => {
  return useSWR<Session>("/api/auth/session", async (url) => {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error()
    }
    return res.json()
  })
}

export default useGetUser
