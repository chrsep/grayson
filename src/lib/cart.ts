import create from "zustand"
import { persist } from "zustand/middleware"

interface LineItem {
  storeId: string
  productId: string
  qty: number
}

interface CartState {
  lineItems: LineItem[]
  addItem: (lineItem: LineItem) => void
  removeItem: (productId: string) => void
}

const stateCreator = persist<CartState>(
  (set) => ({
    lineItems: [],
    addItem(lineItem: LineItem) {
      return set(({ lineItems }) => {
        const idx = lineItems.findIndex(
          ({ storeId, productId }) =>
            storeId === lineItem.storeId && productId === lineItem.productId
        )

        if (idx !== -1) {
          return { lineItems: [...lineItems, lineItem] }
        }

        const newLineItems = [...lineItems]
        newLineItems[idx].qty += 1
        return { lineItems: newLineItems }
      })
    },
    removeItem: (productId: string) => {
      return set(({ lineItems }) => {
        return {
          lineItems: lineItems.filter((lineItem) => {
            return lineItem.productId !== productId
          })
        }
      })
    }
  }),
  { name: "cart" }
)

export const useCart = create(stateCreator)
