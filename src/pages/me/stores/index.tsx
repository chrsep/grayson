import Divider from "@components/Divider"
import React from "react"
import { findUserStores } from "@lib/db"
import { getSession } from "next-auth/client"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import Link from "@components/Link"
import { Store } from "@prisma/client"

const Stores: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ stores }) => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8 pb-32">
      <div className="px-4 sm:px-0 mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Toko anda
          </h2>
        </div>
      </div>

      <Divider />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <Link key={store.id} href={`/me/stores/${store.slug}`}>
            <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 flex items-center p-6 mx-4 sm:mx-0 hover:bg-primary-100 min-h-[92px] transition-colors">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-gray-900 text-sm  truncate">{store.name}</h3>
                </div>
                <p className="mt-1 text-gray-500 text-sm truncate">{store.description}</p>
              </div>
              <img className="w-6 h-6 opacity-70" src="/icons/chevron-right.svg" alt="" />
            </li>
          </Link>
        ))}

        <Link href="/me/stores/new">
          <li className="col-span-1 rounded-xl divide-y divide-gray-200 p-8 flex items-center border-2 border-dashed border-gray-300 hover:border-primary-400 mx-4 sm:mx-0">
            <p className="text-lg text-black">Buat toko baru</p>
            <img
              className="w-6 h-6 rounded-full flex-shrink-0 ml-auto opacity-40"
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
