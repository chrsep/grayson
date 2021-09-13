import { Store } from "@prisma/client"
import useSWR from "swr"
import axios from "redaxios"
import { LineItem, ProductWithImages } from "@lib/domain"

const fetcher = (...args: [string]) => fetch(...args).then((res) => res.json())

export const useGetProduct = (id: string) => {
  return useSWR<ProductWithImages>(`/api/products/${id}`, fetcher)
}

export const useGetStore = (id: string) => {
  return useSWR<Store>(`/api/stores/${id}`, fetcher)
}

/** Create whatsapp link containing the message of items in cart. */
export const useGetCartDetails = (lineItems: LineItem[]) => {
  const { data, error } = useSWR([`/api/cart`, lineItems], fetchWhatsappLink)

  return {
    whatsappLink: data?.whatsappLink,
    total: data?.total,
    isLoading: !error && !data,
    isError: error
  }
}

const fetchWhatsappLink = async (url: string, lineItems: LineItem[]) => {
  const result = await axios.post<{ whatsappLink: string; total: number }>(url, lineItems)
  return result.data
}
