import NextLink from "next/link"
import React, { FC } from "react"

export interface Breadcrumb {
  name: string
  href: string
  current: boolean
}

interface Props {
  breadcrumbs: Array<Breadcrumb>
  className?: string
}
const Breadcrumbs: FC<Props> = ({ className, breadcrumbs }) => (
  <nav className={`flex mb-8 ${className}`} aria-label="Breadcrumb">
    <ol className="flex items-center space-x-4">
      <li>
        <div>
          <NextLink href="/">
            <a className="text-gray-400 hover:text-gray-500">
              <img
                src="/icons/home.svg"
                className="flex-shrink-0 w-5 h-5 opacity-40 hover:opacity-80"
                aria-hidden="true"
                alt=""
              />
              <span className="sr-only">Home</span>
            </a>
          </NextLink>
        </div>
      </li>
      {breadcrumbs.map((page) => (
        <li key={page.name}>
          <div className="flex items-center">
            <img
              src="/icons/chevron-right.svg"
              className="flex-shrink-0 w-5 h-5 text-gray-400 opacity-40"
              aria-hidden="true"
              alt=""
            />
            <NextLink href={page.href}>
              <a
                className="ml-4 text-sm text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </a>
            </NextLink>
          </div>
        </li>
      ))}
    </ol>
  </nav>
)

export default Breadcrumbs
