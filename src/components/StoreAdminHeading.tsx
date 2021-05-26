import Link from "@components/Link"
import React, { FC } from "react"
import { useRouter } from "next/router"

interface Props {
  breadcrumbs: Array<{ name: string; href: string; current: boolean }>
  tabs: Array<{ name: string; href: string; current: boolean }>
  name: string
}
const StoreAdminHeading: FC<Props> = ({ breadcrumbs, name, tabs }) => {
  const router = useRouter()

  return (
    <>
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <Link href="/" className="text-gray-400 hover:text-gray-500">
                <img
                  src="/icons/home.svg"
                  className="flex-shrink-0 h-5 w-5 opacity-40 hover:opacity-80"
                  aria-hidden="true"
                  alt=""
                />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>

          {breadcrumbs.map((page) => (
            <li key={page.name}>
              <div className="flex items-center">
                <img
                  src="/icons/chevron-right.svg"
                  className="flex-shrink-0 h-5 w-5 text-gray-400 opacity-40"
                  aria-hidden="true"
                  alt=""
                />
                <Link
                  href={page.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <div className="pb-5 border-b border-gray-200 sm:pb-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {name}
        </h2>

        <div className="mt-3 sm:mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue={tabs.find((tab) => tab.current).name}
              onChange={(e) => {
                console.log(tabs[e.target.selectedIndex].href)
                router.push(tabs[e.target.selectedIndex].href)
              }}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>

          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <Link
                  href={tab.href}
                  key={tab.name}
                  className={`
                      ${
                        tab.current
                          ? "!border-indigo-600 !text-indigo-600"
                          : "hover:text-gray-700 hover:border-gray-300"
                      } border-transparent text-gray-500 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreAdminHeading
