import React from "react"
import { findStoreWithProductsBySlug } from "@lib/db"
import { getSession } from "next-auth/client"
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage
} from "next"
import StoreAdminHeading from "@components/store-admin-heading"
import NextLink from "next/link"
import { ParsedUrlQuery } from "querystring"
import { Store, Product } from "@prisma/client"
import { Breadcrumb } from "@components/breadcrumbs"
import { toIDR } from "@lib/currency"
import SEO from "@components/seo"

const StoreProductsPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  breadcrumbs,
  tabs,
  store
}) => {
  return (
    <div className="sm:px-6 lg:px-8 pt-8 pb-32 mx-auto max-w-7xl">
      <SEO title={`Atur produk ${store.name}`} />

      <div className="px-4 sm:px-0">
        <StoreAdminHeading
          breadcrumbs={breadcrumbs}
          name={store.name}
          tabs={tabs}
          actionText="Tambah produk"
          actionHref={`/me/stores/${store.slug}/products/new`}
        />
      </div>

      <div className="flex flex-col mt-6">
        <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 sm:px-6 lg:px-8 min-w-full align-middle">
            <div className="overflow-hidden sm:rounded-lg border-b border-gray-200 shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs tracking-wider text-left text-gray-500 uppercase"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs tracking-wider text-left text-gray-500 uppercase"
                    >
                      Kategori
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs tracking-wider text-left text-gray-500 uppercase"
                    >
                      Harga
                    </th>
                    <th scope="col" className="relative py-3 px-6">
                      <span className="sr-only">Ubah</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {store.products.map((product) => (
                    <NextLink href={`/me/stores/${store.slug}/products/${product.slug}`}>
                      <tr key={product.id} className="bg-white hover:bg-primary-100 cursor-pointer">
                        <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap">
                          {product.name}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500 truncate whitespace-nowrap">
                          {product.category}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                          {toIDR(product.price)}
                        </td>
                        <td className=" py-4 px-6 text-sm text-right whitespace-nowrap">
                          <a href="#" className="text-primary-400 hover:text-indigo-900">
                            Edit
                          </a>
                        </td>
                      </tr>
                    </NextLink>
                  ))}
                </tbody>
              </table>

              {store.products.length === 0 && (
                <div className="block p-4 w-full text-center bg-white border-t">
                  Belum ada product terpasang
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Props {
  store: Store & { products: Product[] }
  breadcrumbs: Breadcrumb[]
  tabs: { name: string; href: string; current: boolean }[]
}

interface Query extends ParsedUrlQuery {
  storeSlug: string
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (
  context: GetServerSidePropsContext<{ storeSlug: string }>
) => {
  if (!context.params) return { notFound: true }
  const session = await getSession(context)
  if (session === null) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false
      }
    }
  }

  const { storeSlug } = context.params
  const store = await findStoreWithProductsBySlug(storeSlug)
  if (!store) return { notFound: true }

  // Pass data to the page via props
  return {
    props: {
      store,
      tabs: [
        { name: "Produk", href: `/me/stores/${storeSlug}`, current: true },
        { name: "Informasi toko", href: `/me/stores/${storeSlug}/profile`, current: false }
      ],
      breadcrumbs: [{ name: "Toko anda", href: "/me/stores", current: false }]
    }
  }
}

export default StoreProductsPage
