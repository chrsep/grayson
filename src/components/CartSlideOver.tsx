/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, ReactNode } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Button from "@components/Button"
import Icon from "@components/Icon"
import { useCart } from "@lib/cart"
import { useGetCartDetails, useGetProduct, useGetStore } from "@lib/api-hooks"
import Image from "next/image"
import { toIDR } from "@lib/currency"
import { generateS3Url } from "@lib/image-client"
import TextField from "@components/TextField"
import Link from "next/link"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const CartSlideOver: FC<Props> = ({ open, setOpen }) => {
  const storeIds = useCart(({ storeIds }) => storeIds)
  const deleteAll = useCart(({ deleteAll }) => deleteAll)
  // const itemsByStore = lodash.groupBy(cart.lineItems, "storeId")

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="overflow-hidden fixed inset-0 z-40"
        open={open}
        onClose={setOpen}
      >
        <div className="overflow-hidden absolute inset-0">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="flex fixed inset-y-0 right-0 pl-10 max-w-full">
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
                <div className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl">
                  <div className="flex overflow-y-auto flex-col flex-1 pb-4 min-h-0">
                    <div className="flex flex-shrink-0 items-center px-4 sm:px-6 h-[64px] border-b">
                      <Dialog.Title className="text-lg text-gray-900">
                        Catatan belanja anda
                      </Dialog.Title>

                      <div className="flex items-center ml-auto h-7">
                        <Button variant="icon" onClick={() => setOpen(false)}>
                          <span className="sr-only">Close panel</span>
                          <Icon src="/icons/x.svg" />
                        </Button>
                      </div>
                    </div>

                    <div className="relative flex-1 px-4 sm:px-6 mt-6">
                      {storeIds.map((id) => (
                        <StoreLineItems
                          key={id}
                          storeId={id}
                          storeLink={<StoreLink storeId={id} onClick={() => setOpen(false)} />}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 justify-end py-4 px-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        deleteAll()
                        setOpen(false)
                      }}
                    >
                      Kosongkan catatan
                    </Button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const StoreLineItems: FC<{
  storeId: string
  storeLink: ReactNode
}> = ({ storeId, storeLink }) => {
  const { data } = useGetStore(storeId)
  const items = useCart(({ items }) => items)
  const deleteByStoreId = useCart(({ deleteByStoreId }) => deleteByStoreId)
  const { isLoading, whatsappLink, total } = useGetCartDetails(items)

  return (
    <div className="pb-4 mb-8 border-b">
      {storeLink}
      {items
        .filter((store) => store.storeId === storeId)
        .map(({ productId, qty }) => (
          <ProductData key={productId} productId={productId} qty={qty} />
        ))}

      <p className="w-full font-ui text-xl font-bold text-right">
        {total && !isLoading ? `Total ~${toIDR(total)}` : `loading`}
      </p>

      <div className="flex mt-4">
        <Button
          variant="outline"
          className="flex-shrink-0 mr-3 ml-auto"
          onClick={() => deleteByStoreId(storeId)}
        >
          Hapus semua
        </Button>
        {data?.whatsapp && (
          <a href={whatsappLink} className="w-full">
            <Button className="w-full" disabled={isLoading}>
              <Icon src="/icons/brand-whatsapp.svg" className="mr-2 !bg-white" />
              Hubungi lewat WA
            </Button>
          </a>
        )}
      </div>
    </div>
  )
}

const StoreLink: FC<{
  storeId: string
  onClick: () => void
}> = ({ storeId, onClick }) => {
  const { data } = useGetStore(storeId)

  if (!data) return <div>Loading</div>

  return (
    <Link href={`/stores/${data.slug}`}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <a
        className="flex justify-center items-center py-2 text-sm bg-gray-50 rounded-lg border"
        onClick={onClick}
      >
        {data && data.logo && (
          <div className="flex items-center w-6 h-6 rounded-full border">
            <Image width={24} height={24} src={generateS3Url(data.logo)} className="rounded-full" />
          </div>
        )}
        <p className="ml-3 font-ui font-bold">{data?.name}</p>
      </a>
    </Link>
  )
}

const ProductData: FC<{
  productId: string
  qty: number
}> = ({ productId, qty }) => {
  const setQty = useCart(({ setQty }) => setQty)
  const deleteItem = useCart(({ deleteItem }) => deleteItem)
  const incrementQty = useCart(({ incrementQty }) => incrementQty)
  const decrementQty = useCart(({ decrementQty }) => decrementQty)
  const { data, error } = useGetProduct(productId)

  if (error) return <div />

  if (!data) return <div>Loading</div>

  return (
    <div className="flex items-start pb-4 mt-4">
      <div className="flex flex-shrink-0 items-center w-8 h-8 rounded-lg border">
        {data && data.images[0] && (
          <Image width={40} height={40} src={data.images[0].url} className="rounded-lg" />
        )}
      </div>

      <div className="ml-3 w-full">
        <div className="flex items-baseline">
          <p className="font-ui">{data.name}</p>
          <button
            type="button"
            className="ml-auto text-sm text-red-700 underline opacity-70"
            onClick={() => deleteItem(productId)}
          >
            Hapus
          </button>
        </div>
        <p className="font-ui text-sm opacity-70">
          {toIDR(data.price || 0)} x {qty}
        </p>

        <div className="flex items-center w-full">
          <p className="block mr-auto font-ui">{toIDR(data.price * qty || 0)}</p>

          <Button
            variant="outline"
            className="!p-0 w-9 h-9"
            onClick={() => incrementQty(data.storeId, productId)}
          >
            <Icon src="/icons/plus.svg" className="w-4 h-4 !bg-gray-700" />
          </Button>
          <TextField
            name="jumlah"
            hideLabel
            label="Jumlah"
            value={qty.toString()}
            containerClassName="w-9 mx-1"
            inputClassName="h-9 p-0 flex text-center"
            onChange={(e) => {
              const qty = parseInt(e.target.value, 10) || 0
              if (qty > 0) {
                setQty(data.storeId, productId, qty)
              }
            }}
            onBlur={(e) => {
              const qty = parseInt(e.target.value, 10) || 0
              if (e.target.value === "" || qty < 1) {
                setQty(data.storeId, productId, 1)
              }
            }}
          />
          <Button
            variant="outline"
            className="!p-0 w-9 h-9"
            onClick={() => decrementQty(data.storeId, productId)}
          >
            <Icon src="/icons/minus.svg" className="w-4 h-4 !bg-gray-700" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartSlideOver
