/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Button from "@components/Button"
import Icon from "@components/Icon"
import { useCart } from "@lib/cart"
import { useGetCartDetails, useGetProduct, useGetStore } from "@lib/api-hooks"
import Image from "next/image"
import { toIDR } from "@lib/currency"
import StoreSelector from "@components/StoreSelector"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const CartSlideOver: FC<Props> = ({ open, setOpen }) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog
      as="div"
      static
      className="overflow-hidden fixed inset-0 z-40"
      open={open}
      onClose={setOpen}
    >
      <div className="overflow-hidden absolute inset-0">
        <Overlay />
        <CartPanel onClose={() => setOpen(false)} />
      </div>
    </Dialog>
  </Transition.Root>
)

const CartPanel: FC<{
  onClose: () => void
}> = ({ onClose }) => {
  const storeIds = useCart(({ storeIds }) => storeIds)
  const [selectedStore, setSelectedStore] = useState(storeIds[0])

  return (
    <div className="flex fixed inset-y-0 right-0 max-w-full">
      <Transition.Child
        as={Fragment}
        enter="transform transition ease-in-out duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-200"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="w-screen max-w-md">
          <div className="flex relative flex-col h-full bg-white divide-y divide-gray-200 shadow-xl">
            <div className="flex overflow-y-auto flex-col flex-1 pb-4 min-h-0">
              <div className="flex flex-shrink-0 items-center px-4 sm:px-6 pt-4 sm:pt-6">
                <Dialog.Title className="text-lg text-gray-900">Catatan belanja</Dialog.Title>
                <div className="flex items-center ml-auto h-7">
                  <Button variant="icon" onClick={onClose}>
                    <span className="sr-only">Close panel</span>
                    <Icon src="/icons/x.svg" color="bg-gray-700" />
                  </Button>
                </div>
              </div>
              {storeIds.length > 0 && (
                <div className="p-4 md:p-6 !pt-3 border-b">
                  <StoreSelector
                    selected={selectedStore}
                    storeIds={storeIds}
                    onChange={setSelectedStore}
                  />
                </div>
              )}

              {selectedStore && <StoreLineItems storeId={selectedStore} />}
            </div>
          </div>
        </div>
      </Transition.Child>
    </div>
  )
}

const StoreLineItems: FC<{
  storeId: string
}> = ({ storeId }) => {
  const { data } = useGetStore(storeId)
  const items = useCart(({ items }) => items)
  const itemsByStore = items.filter((store) => store.storeId === storeId)
  const deleteByStoreId = useCart(({ deleteByStoreId }) => deleteByStoreId)

  const { isLoading, whatsappLink, total } = useGetCartDetails(items)

  return (
    <div className="overflow-auto px-4 md:px-6 pb-[180px]">
      {itemsByStore.map(({ productId, qty }) => (
        <ProductData key={productId} productId={productId} qty={qty} />
      ))}

      <div className="absolute right-0 bottom-0 left-0 p-4 md:p-6 bg-white border-t">
        <div className="flex justify-between font-ui text-gray-900">
          <p>Subtotal</p>
          <p>{total && !isLoading ? `${toIDR(total)}` : `loading`}</p>
        </div>

        <p className="mt-1 mb-4 md:mb-6 text-sm text-gray-500">
          Hubungi penjual untuk melanjutkan pesanan.
        </p>

        {data?.whatsapp && (
          <a href={whatsappLink} className="w-full">
            <Button className="w-full" disabled={isLoading}>
              <Icon src="/icons/brand-whatsapp.svg" className="mr-2 !bg-white" />
              Kirim Pesan
            </Button>
          </a>
        )}

        <Button
          variant="secondary"
          className="mt-2 mr-3 ml-auto w-full text-gray-600 hover:text-red-700"
          onClick={() => deleteByStoreId(storeId)}
        >
          Hapus semua
        </Button>
      </div>
    </div>
  )
}

const ProductData: FC<{
  productId: string
  qty: number
}> = ({ productId, qty }) => {
  const setQty = useCart(({ setQty }) => setQty)
  const deleteItem = useCart(({ deleteItem }) => deleteItem)
  const { data, error } = useGetProduct(productId)

  if (error) return <div />

  if (!data) return <div>Loading</div>

  return (
    <div className=" flex py-4 md:py-6 border-t first:border-t-0 border-gray-200 transform">
      <div className="flex-shrink-0 w-16 sm:w-24 h-16 sm:h-24 rounded-lg border">
        {data && data.images[0] && (
          <Image
            width={150}
            height={150}
            src={data.images[0].url}
            className="object-cover object-center w-full h-full rounded-lg"
          />
        )}
      </div>

      <div className="flex flex-col flex-1 ml-3">
        <div className="flex items-baseline">
          <p className="font-ui text-gray-900">{data.name}</p>
          <p className=" block ml-auto font-ui text-gray-500">{toIDR(data.price || 0)}</p>
        </div>

        <div className="flex items-center mt-auto w-full">
          <PriceSelector
            productId={data.id}
            value={qty}
            onChange={(qty) => setQty(data.storeId, productId, qty)}
          />

          <Button
            variant="secondary"
            className="!p-0 ml-auto text-primary-500"
            onClick={() => deleteItem(productId)}
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  )
}

const PriceSelector: FC<{
  productId: string
  value: number
  onChange: (value: number) => void
}> = ({ value, productId, onChange }) => (
  <select
    id={`quantity-${productId}`}
    name={`quantity-${productId}`}
    className="block py-1.5 max-w-full text-base sm:text-sm font-medium leading-5 text-left text-gray-700 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm focus:outline-none"
    onChange={(e) => onChange(parseInt(e.target.value, 10))}
    value={value}
  >
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
    <option value={6}>6</option>
    <option value={7}>7</option>
    <option value={8}>8</option>
  </select>
)

const Overlay = () => (
  <Transition.Child
    as={Fragment}
    enter="transition-opacity ease-linear duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity ease-linear duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75" />
  </Transition.Child>
)

export default CartSlideOver
