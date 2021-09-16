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
      className="flex fixed inset-0 z-40 items-end sm:items-start sm:p-6 py-6 px-4 pointer-events-none"
    >
      <div className="flex flex-col items-center sm:items-end space-y-4 w-full">
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
          <div className="overflow-hidden w-full max-w-sm bg-white rounded-lg ring-1 ring-black ring-opacity-5 shadow-lg pointer-events-auto">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    src="/icons/check.svg"
                    className="w-6 h-6 text-green-400"
                    aria-hidden="true"
                    alt=""
                  />
                </div>
                <div className="flex-1 pt-0.5 ml-3 w-0">
                  <p className="text-sm text-gray-900">{heading}</p>
                  <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
                <div className="flex flex-shrink-0 ml-4">
                  <button
                    type="button"
                    className="inline-flex text-gray-400 hover:text-gray-500 bg-white rounded-md focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Tutup</span>
                    <img src="/icons/x.svg" className="w-5 h-5" aria-hidden="true" alt="" />
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
