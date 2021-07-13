import Divider from "@components/Divider"
import React from "react"
import { findUserStores } from "@lib/db"
import { getSession } from "next-auth/client"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import Link from "@components/Link"
import { Store } from "@prisma/client"

const Stores: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ stores }) => {
  return (
    <div className="sm:px-6 lg:px-8 pt-8 pb-32 mx-auto max-w-7xl">
      <div className="md:flex md:justify-between md:items-center px-4 sm:px-0 mt-2">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold leading-7 text-gray-900 sm:truncate">
            Toko anda
          </h2>
        </div>
      </div>

      <Divider />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <Link key={store.id} href={`/me/stores/${store.slug}`}>
            <li className="flex col-span-1 items-center p-6 mx-4 sm:mx-0 min-h-[92px] bg-white hover:bg-primary-100 rounded-lg divide-y divide-gray-200 shadow transition-colors">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-sm text-gray-900 truncate">{store.name}</h3>
                </div>
                <p className="mt-1 text-sm text-gray-500 truncate">{store.description}</p>
              </div>
              <img className="w-6 h-6 opacity-70" src="/icons/chevron-right.svg" alt="" />
            </li>
          </Link>
        ))}

        <Link href="/me/stores/new">
          <li className="flex col-span-1 items-center p-8 mx-4 sm:mx-0 rounded-xl border-2 border-gray-300 hover:border-primary-400 border-dashed divide-y divide-gray-200">
            <p className="text-lg text-black">Buat toko baru</p>
            <img
              className="flex-shrink-0 ml-auto w-6 h-6 rounded-full opacity-40"
              src="/icons/plus.svg"
              alt=""
            />
          </li>
        </Link>
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{ stores: Store[] }> = async (context) => {
  const session = await getSession(context)
  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false
      }
    }
  }
  const stores = await findUserStores(session.user.email)

  // Pass data to the page via props
  return { props: { stores } }
}

export default Stores
