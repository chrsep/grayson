import useSWR from "swr"

export const useGetUser = (productSlug: string) => {
  return useSWR(`/api/products/${productSlug}`)
}
