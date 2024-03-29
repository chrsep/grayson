import create, { SetState } from "zustand"
import { persist } from "zustand/middleware"
import { LineItem } from "./domain"

interface CartState {
  storeIds: string[]
  items: LineItem[]

  setQty: (storeId: string, productId: string, qty: number) => void
  decrementQty: (storeId: string, productId: string) => void
  incrementQty: (storeId: string, productId: string) => void
  deleteItem: (productId: string) => void
  deleteByStoreId: (storeId: string) => void
  deleteAll: () => void
}

export const useCart = create(
  persist(
    (set: SetState<CartState>) => ({
      storeIds: [] as string[],
      items: [] as LineItem[],
      setQty(storeId: string, productId: string, amount: number) {
        return set(({ items }) => {
          const newItems = setQty(items, storeId, productId, amount)
          const storeIds = getUniqueStoreIds(newItems)

          return { storeIds, items: newItems }
        })
      },
      decrementQty(storeId: string, productId: string) {
        return set(({ items }) => {
          const newItems = changeQty(items, storeId, productId, -1)
          const storeIds = getUniqueStoreIds(newItems)

          return { storeIds, items: newItems }
        })
      },
      incrementQty(storeId: string, productId: string) {
        return set(({ items }) => {
          const newItems = changeQty(items, storeId, productId, 1)
          const storeIds = getUniqueStoreIds(newItems)

          return { storeIds, items: newItems }
        })
      },
      deleteItem: (productId: string) => {
        return set((state) => {
          const items = state.items.filter((lineItem) => lineItem.productId !== productId)
          const storeIds = getUniqueStoreIds(items)
          return { storeIds, items }
        })
      },
      deleteByStoreId: (storeId: string) => {
        return set((state) => {
          const items = state.items.filter((lineItem) => lineItem.storeId !== storeId)
          const storeIds = getUniqueStoreIds(items)
          return { storeIds, items }
        })
      },
      deleteAll: () => {
        return set(() => {
          return { storeIds: [], items: [] }
        })
      }
    }),
    { name: "cart" }
  )
)

const changeQty = (items: LineItem[], storeId: string, productId: string, amount: number) => {
  const newItems = [...items]
  const idx = newItems.findIndex((item) => item.productId === productId)
  const found = idx !== -1

  if (found && newItems[idx].qty + amount < 1) return items
  if (found) newItems[idx].qty += amount
  if (!found && amount > 0) newItems.push({ productId, storeId, qty: amount })

  return newItems
}

const setQty = (items: LineItem[], storeId: string, productId: string, newQty: number) => {
  const newItems = [...items]
  const idx = newItems.findIndex((item) => item.productId === productId)
  const found = idx !== -1

  if (newQty < 1) return items
  if (found) newItems[idx].qty = newQty
  if (!found && newQty > 0) newItems.push({ productId, storeId, qty: newQty })

  return newItems
}

const getUniqueStoreIds = (items: LineItem[]) => {
  return Array.from(new Set(items.map(({ storeId }) => storeId)))
}
