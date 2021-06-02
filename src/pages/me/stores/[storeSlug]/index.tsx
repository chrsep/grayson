import React from "react"
import { findStoreWithProductsBySlug } from "@lib/db"
import { getSession } from "next-auth/client"
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import StoreAdminHeading from "@components/StoreAdminHeading"
import NextLink from "next/link"

const Store: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  breadcrumbs,
  tabs,
  store
}) => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8 pb-32">
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
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                    >
                      Deskripsi
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                    >
                      Harga
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Ubah</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {store.products.map((product) => (
                    <NextLink href={`/me/stores/${store.slug}/products/${product.slug}`}>
                      <tr key={product.id} className="bg-white cursor-pointer hover:bg-primary-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">
                          {product.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm ">
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
                <div className="w-full text-center p-4 block bg-white border-t">
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

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ storeSlug: string }>
) {
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

export default Store
