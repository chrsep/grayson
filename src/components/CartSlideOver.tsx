/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Button from "@components/Button"
import Icon from "@components/Icon"
import { useCart } from "@lib/cart"
import { useGetProduct, useGetStore } from "@lib/api-hooks"
import Image from "next/image"
import { toIDR } from "@lib/currency"
import { generateS3Url } from "@lib/image-client"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const Example: FC<Props> = ({ open, setOpen }) => {
  const cart = useCart()
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
                    <div className="flex items-center px-4 sm:px-6 h-[64px] border-b">
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
                      {cart.storeIds.map((id) => (
                        <div key={id} className="mb-8">
                          <StoreData storeId={id} />
                          {cart.items
                            .filter(({ storeId }) => storeId === id)
                            .map(({ productId, qty }) => (
                              <Items key={productId} productId={productId} qty={qty} />
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 justify-end py-4 px-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Kosongkan
                    </Button>
                    <Button className="ml-4">Lanjut</Button>
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

const StoreData: FC<{ storeId: string }> = ({ storeId }) => {
  const { data } = useGetStore(storeId)

  if (!data) return <div className="opacity-70">Produk telah dihapus</div>

  return (
    <div className="flex justify-center items-center py-2 text-sm bg-gray-50 rounded-lg border">
      {data && data.logo && (
        <div className="flex items-center w-6 h-6 rounded-full border">
          <Image width={24} height={24} src={generateS3Url(data.logo)} className="rounded-full" />
        </div>
      )}
      <p className="ml-3 font-ui font-bold">{data?.name}</p>
    </div>
  )
}

const Items: FC<{ productId: string; qty: number }> = ({ productId, qty }) => {
  const { data } = useGetProduct(productId)

  if (!data) return <div />

  return (
    <div className="flex pb-4 mt-4">
      <div className="flex items-center w-8 h-8 rounded-lg border">
        {data && data.images[0] && (
          <Image width={40} height={40} src={data.images[0].url} className="rounded-lg" />
        )}
      </div>

      <div className="ml-3">
        <p className="font-ui">{data.name}</p>
        <p className="font-ui text-sm opacity-70">
          {toIDR(data.price || 0)} x {qty}
        </p>
        <p className="font-ui text-sm">{toIDR(data.price * qty || 0)}</p>
      </div>
    </div>
  )
}

export default Example
