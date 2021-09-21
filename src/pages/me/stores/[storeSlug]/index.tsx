import React from "react"
import { findStoreWithProductsBySlug } from "@lib/db"
import { getSession } from "next-auth/client"
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage
} from "next"
import NextLink from "next/link"
import { ParsedUrlQuery } from "querystring"
import { Product, Store } from "@prisma/client"
import { toIDR } from "@lib/currency"
import StoreManagementLayout from "@layouts/store-management-layout"
import Button from "@components/button"

const StoreProductsPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  store
}) => (
  <StoreManagementLayout
    pageTitle={`Atur produk ${store.name}`}
    storeSlug={store.slug}
    storeName={store.name}
    secondaryActions={
      <NextLink href={`/me/stores/${store.slug}/products/new`}>
        <Button className="w-full">Tambah produk</Button>
      </NextLink>
    }
  >
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
  </StoreManagementLayout>
)

interface Props {
  store: Store & { products: Product[] }
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
    props: { store }
  }
}

export default StoreProductsPage
