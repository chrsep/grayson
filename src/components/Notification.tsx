/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment } from "react"
import { Transition } from "@headlessui/react"

interface Props {
  show: boolean
  onClose: () => void
  heading: string
  description: string
}
const Notification: FC<Props> = ({ heading, description, show, onClose }) => (
  <>
    {/* Global notification live region, render this permanently at the end of the document */}
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-40"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    src="/icons/check.svg"
                    className="h-6 w-6 text-green-400"
                    aria-hidden="true"
                    alt=""
                  />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm  text-gray-900">{heading}</p>
                  <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    type="button"
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400"
                    onClick={onClose}
                  >
                    <span className="sr-only">Tutup</span>
                    <img src="/icons/x.svg" className="h-5 w-5" aria-hidden="true" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </>
)

export default Notification
