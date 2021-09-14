import useSWR from "swr"
import { Session } from "next-auth"
import { useContext } from "react"
import { SessionContext } from "@lib/session"
import axios from "redaxios"

const fetcher = (url: string) => axios.get(url).then(({ data }) => data)

const useGetUser = () => {
  const fallbackData = useContext(SessionContext)

  return useSWR<Session | null>("/api/auth/session", fetcher, { fallbackData })
}

export default useGetUser
