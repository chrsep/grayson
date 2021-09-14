import useSWR from "swr"
import { Session } from "next-auth"
import axios from "redaxios"

const fetcher = (url: string) => axios.get(url).then(({ data }) => data)

const useGetUser = () => {
  return useSWR<Session | null>("/api/auth/session", fetcher)
}

export default useGetUser
