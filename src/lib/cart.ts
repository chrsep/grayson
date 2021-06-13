import { atom } from "jotai"

export const cart = atom<Array<{ productId: string; qty: number }>>([])
