import React, { FC } from "react"
import { useRouter } from "next/router"
import Breadcrumbs from "@components/Breadcrumbs"
import Button from "@components/Button"
import NextLink from "next/link"

interface Props {
  breadcrumbs: Array<{ name: string; href: string; current: boolean }>
  tabs: Array<{ name: string; href: string; current: boolean }>
  name: string
  actionText?: string
  actionHref?: string
}
const StoreAdminHeading: FC<Props> = ({ actionHref, actionText, breadcrumbs, name, tabs }) => {
  const router = useRouter()

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="pb-5 border-b border-gray-200 sm:pb-0">
        <h2 className="pt-4 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
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
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-400 focus:border-primary-400 sm:text-sm rounded-md"
              value={tabs.find((tab) => tab.current).name}
              onChange={async (e) => {
                await router.push(tabs[e.target.selectedIndex].href)
              }}
            >
              {tabs.map((tab) => (
                <option key={tab.name} value={tab.name}>
                  {tab.name}
                </option>
              ))}
            </select>

            {actionText && (
              <div className="pt-4 w-full">
                <NextLink href={actionHref}>
                  <Button className="w-full">{actionText}</Button>
                </NextLink>
              </div>
            )}
          </div>

          <div className="hidden sm:flex items-end h-[46px]">
            <nav className="-mb-px flex space-x-8 ">
              {tabs.map((tab) => (
                <NextLink href={tab.href} key={tab.name}>
                  <a
                    className={`
                      ${
                        tab.current
                          ? "!border-primary-400 !text-primary-400"
                          : "hover:text-gray-700 hover:border-gray-300"
                      } border-transparent text-gray-500 whitespace-nowrap py-3 px-1 border-b-2 text-sm`}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                  </a>
                </NextLink>
              ))}
            </nav>

            {actionText && (
              <div className="pb-2 ml-auto">
                <NextLink href={actionHref}>
                  <Button className="w-full">{actionText}</Button>
                </NextLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreAdminHeading
