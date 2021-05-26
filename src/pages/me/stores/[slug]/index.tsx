import React from "react"
import { findStoreBySlug } from "@lib/db"
import { getSession } from "next-auth/client"
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import StoreAdminHeading from "@components/StoreAdminHeading"
import { Product } from "@prisma/client"
import NextLink from "next/link"

const products: Partial<Product>[] = [
  {
    id: "1",
    name: "Jane Cooper",
    description: "Regional Paradigm Technician",
    price: 2000,
    slug: "jane-cooper"
  },
  {
    id: "1",
    name: "Cody Fisher",
    description: "Product Directives Officer",
    price: 43000,
    slug: "cody-fisher"
  }
]

const Store: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  breadcrumbs,
  tabs,
  store
}) => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8 pb-32">
      <div className="px-4 sm:px-0">
        <StoreAdminHeading breadcrumbs={breadcrumbs} name={store.name} tabs={tabs} />
      </div>

      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <NextLink href={`/me/stores/${store.slug}/products/${product.slug}`}>
                      <tr
                        key={product.id}
                        className={`${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } cursor-pointer hover:bg-purple-50`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">
                          {product.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </td>
                      </tr>
                    </NextLink>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ slug: string }>) {
  const session = await getSession(context)
  if (session === null) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false
      }
    }
  }

  const { slug } = context.params
  const store = await findStoreBySlug(slug)

  // Pass data to the page via props
  return {
    props: {
      store,
      tabs: [
        { name: "Produk", href: `/me/stores/${slug}`, current: true },
        { name: "Profil toko", href: `/me/stores/${slug}/profile`, current: false }
      ],
      breadcrumbs: [
        { name: "Toko anda", href: "/me/stores", current: false },
        { name: "Stark Industries", href: `/me/stores/${slug}`, current: true }
      ]
    }
  }
}

export default Store
