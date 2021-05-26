import Link from "@components/Link"
import React, { FC } from "react"

export interface BreadCrumb {
  name: string
  href: string
  current: boolean
}

interface Props {
  breadcrumbs: Array<BreadCrumb>
}
const Breadcrumbs: FC<Props> = ({ breadcrumbs }) => (
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
)

export default Breadcrumbs
