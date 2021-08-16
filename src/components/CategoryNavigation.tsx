import categories from "@lib/categories"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/router"
import clsx from "clsx"

const CategoryNavigation = () => {
  const router = useRouter()
  return (
    <nav className="hidden sm:block sm:pl-6 bg-white border-b">
      <div className="flex items-center space-x-4 h-16">
        {categories.map((item) => {
          const current = router.asPath.endsWith(item.slug)

          return (
            <Link key={item.name} href={`/categories/${item.slug}`}>
              <a
                className={clsx(
                  current
                    ? " text-primary-600 bg-primary-400 bg-opacity-20"
                    : "text-gray-900 hover:text-primary-700 hover:bg-gray-400 hover:bg-opacity-20",
                  " py-2 px-3 text-sm rounded-md"
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
