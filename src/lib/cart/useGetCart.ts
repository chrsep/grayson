import { GetResponseBody } from "@api/me/cart"
import useSWR from "swr"

const getCart = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error()

  return res.json()
}

const useGetCart = () => {
  return useSWR<GetResponseBody>("/api/me/cart", getCart)
}

export default useGetCart
