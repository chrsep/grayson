/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Button from "@components/Button"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const Example: FC<Props> = ({ open, setOpen }) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" static className="fixed inset-0 overflow-hidden z-40" open={open} onClose={setOpen}>
      <div className="absolute inset-0 overflow-hidden">
        <Dialog.Overlay className="absolute inset-0" />

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="w-screen max-w-md">
              <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                <div className="min-h-0 flex-1 flex flex-col py-6 overflow-y-auto">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Keranjang Anda
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <Button variant="icon" onClick={() => setOpen(false)}>
                          <span className="sr-only">Close panel</span>
                          <img src="/icons/x.svg" className="h-6 w-6" aria-hidden="true" alt="" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div
                      className="h-full border-2 border-dashed border-gray-200"
                      aria-hidden="true"
                    />
                    {/* /End replace */}
                  </div>
                </div>
                <div className="flex-shrink-0 px-4 py-4 flex justify-end">
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

export default Example
