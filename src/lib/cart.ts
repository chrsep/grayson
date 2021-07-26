import create from "zustand"

export const useCart = create(() => ({
  lineItems: []
}))
