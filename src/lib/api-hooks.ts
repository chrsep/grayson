import { Product, Store } from "@prisma/client"
import useSWR from "swr"

export const useGetProduct = (id: string) => {
  return useSWR<Product>(`/api/products/${id}`)
}

export const useGetStore = (id: string) => {
  return useSWR<Store>(`/api/stores/${id}`)
}
