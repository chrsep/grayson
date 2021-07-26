/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Button from "@components/Button"
import Icon from "@components/Icon"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const Example: FC<Props> = ({ open, setOpen }) => {
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
                      {/* Replace with your content */}
                      <div
                        className="h-full border-2 border-gray-200 border-dashed"
                        aria-hidden="true"
                      />
                      {/* /End replace */}
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

export default Example
