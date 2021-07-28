import useSWR from "swr"

export const useGetProduct = (id: string) => {
  return useSWR(`/api/products/${id}`)
}

export const useGetStore = (id: string) => {
  return useSWR(`/api/stores/${id}`)
}
