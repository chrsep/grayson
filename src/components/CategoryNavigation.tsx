import categories from "@lib/categories"
import Link from "next/link"
import { classNames } from "@lib/ui"
import React from "react"
import { useRouter } from "next/router"

const CategoryNavigation = () => {
  const router = useRouter()
  return (
    <nav className="hidden sm:block sm:pl-6 bg-white border-b">
      <div className="flex space-x-4 h-16 items-center">
        {categories.map((item) => {
          const current = router.asPath.endsWith(item.slug)

          return (
            <Link key={item.name} href={`/categories/${item.slug}`}>
              <a
                className={classNames(
                  current
                    ? "bg-primary-400 text-primary-600 bg-opacity-20 "
                    : "text-gray-900 hover:bg-gray-400 hover:bg-opacity-20  hover:text-primary-700",
                  "px-3 py-2 rounded-md text-sm  "
                )}
                aria-current={current ? "page" : undefined}
              >
                {item.name}
              </a>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default CategoryNavigation
