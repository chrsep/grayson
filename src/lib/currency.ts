export const toIDR = (price: number) => {
  return new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR"
  }).format(price)
}
