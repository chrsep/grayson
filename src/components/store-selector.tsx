import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"
import { FC, Fragment } from "react"
import Image from "@components/image"
import { useGetStore } from "@lib/api-hooks"
import Icon from "@components/icon"

const StoreSelector: FC<{
  selected: string
  onChange: (value: string) => void
  storeIds: string[]
}> = ({ selected, onChange, storeIds }) => (
  <Listbox value={selected} onChange={onChange}>
    {({ open }) => (
      <>
        <Listbox.Label className="block text-sm font-medium text-gray-700 sr-only">
          Stores
        </Listbox.Label>
        <div className="relative mt-1">
          <SelectedStore storeId={selected} />

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="overflow-auto absolute z-10 py-1 mt-1 w-full max-h-56 text-base sm:text-sm bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg focus:outline-none">
              {storeIds.map((id) => (
                <Options key={id} storeId={id} />
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </>
    )}
  </Listbox>
)

const SelectedStore: FC<{ storeId: string }> = ({ storeId }) => {
  const { data: store } = useGetStore(storeId)

  return (
    <Listbox.Button className="relative py-2 pr-10 pl-3 w-full min-h-[42px] sm:text-sm text-left bg-white rounded-md border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 shadow-sm cursor-default focus:outline-none">
      <span className="flex items-center">
        {store?.logo && (
          <Image
            height={24}
            width={24}
            src={store.logo}
            className="flex-shrink-0 w-6 h-6 rounded-full border"
            alt=""
          />
        )}
        <span className="block ml-3 truncate">{store?.name}</span>
      </span>
      <span className="flex absolute inset-y-0 right-0 items-center pr-2 ml-3 pointer-events-none">
        <Icon src="/icons/selector.svg" className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </span>
    </Listbox.Button>
  )
}

const Options: FC<{ storeId: string }> = ({ storeId }) => {
  const { data: store } = useGetStore(storeId)

  return (
    <Listbox.Option
      value={storeId}
      className={({ active }) =>
        clsx(
          active ? "text-white bg-primary-400" : "text-gray-900",
          "relative py-2 pr-9 pl-3 cursor-default select-none"
        )
      }
    >
      {({ selected, active }) => (
        <>
          <div className="flex items-center">
            {store?.logo && (
              <Image
                height={24}
                width={24}
                src={store.logo}
                className="flex-shrink-0 w-6 h-6 rounded-full"
                alt=""
              />
            )}
            <span
              className={clsx(selected ? "font-semibold" : "font-normal", "block ml-3 truncate")}
            >
              {store?.name}
            </span>
          </div>

          {selected ? (
            <span
              className={clsx(
                active ? "text-white" : "text-primary-400",
                "flex absolute inset-y-0 right-0 items-center pr-4"
              )}
            >
              <Icon
                src="/icons/circle-check.svg"
                className="w-5 h-5"
                aria-hidden="true"
                color={clsx(active ? "bg-white" : "bg-primary-400")}
              />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  )
}

export default StoreSelector
