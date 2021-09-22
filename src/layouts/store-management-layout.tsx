import React, { FC, ReactNode } from "react"
import Breadcrumbs from "@components/breadcrumbs"
import NextLink from "next/link"
import { useRouter } from "next/router"
import SEO from "@components/seo"

const generateTabs = (storeSlug: string) => [
  { name: "Produk", href: `/me/stores/${storeSlug}` },
  { name: "Informasi toko", href: `/me/stores/${storeSlug}/profile` },
  { name: "Admin Toko", href: `/me/stores/${storeSlug}/admin` }
]

const StoreManagementLayout: FC<{
  pageTitle: string
  storeSlug: string
  storeName: string
  secondaryActions?: ReactNode
}> = ({ pageTitle, storeSlug, storeName, secondaryActions, children }) => {
  const router = useRouter()
  const tabs = generateTabs(storeSlug)

  return (
    <div className="sm:px-6 lg:px-8 pt-8 pb-32 mx-auto max-w-7xl">
      <SEO title={pageTitle} />

      <div className="px-4 sm:px-0">
        <Breadcrumbs breadcrumbs={[{ name: "Toko anda", href: "/me/stores", current: false }]} />

        <div className="pb-5 sm:pb-0 border-b border-gray-200">
          <h2 className="pt-4 text-2xl sm:text-3xl font-bold leading-7 text-gray-900 sm:truncate">
            {storeName}
          </h2>

          <div className="mt-3 sm:mt-4">
            <div className="sm:hidden">
              <label htmlFor="current-tab">
                <span className="sr-only">Select a tab</span>
                <select
                  id="current-tab"
                  name="current-tab"
                  className="block py-2 pr-10 pl-3 w-full text-base sm:text-sm rounded-md border-gray-300 focus:border-primary-400 focus:ring-primary-400 focus:outline-none"
                  value={tabs.find((tab) => tab.href === router.asPath)?.name}
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
              </label>

              {secondaryActions && <div className="pt-4 w-full">{secondaryActions}</div>}
            </div>

            <div className="hidden sm:flex items-end h-[46px]">
              <nav className=" flex -mb-px space-x-8">
                {tabs.map((tab) => (
                  <NextLink href={tab.href} key={tab.name}>
                    <a
                      className={`
                        ${
                          tab.href === router.asPath
                            ? "!border-primary-400 !text-primary-400"
                            : "hover:text-gray-700 hover:border-gray-300"
                        } border-transparent text-gray-500 whitespace-nowrap py-3 px-1 border-b-2 text-sm`}
                      aria-current={tab.href === router.asPath ? "page" : undefined}
                    >
                      {tab.name}
                    </a>
                  </NextLink>
                ))}
              </nav>

              {secondaryActions && <div className="pb-2 ml-auto">{secondaryActions}</div>}
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}

export default StoreManagementLayout
