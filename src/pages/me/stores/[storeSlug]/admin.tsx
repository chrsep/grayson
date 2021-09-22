import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import StoreManagementLayout from "@layouts/store-management-layout"
import Button from "@components/button"
import { Store } from "@prisma/client"
import { getSession } from "next-auth/client"
import { findStoreWithAdminsAndOwner } from "@lib/db"
import React, { FC } from "react"
import TextField from "@components/text-field"
import Icon from "@components/icon"

const StoreAdminPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  store
}) => (
  <StoreManagementLayout
    pageTitle={`Atur produk ${store.name}`}
    storeSlug={store.slug}
    storeName={store.name}
  >
    <div className="px-4 mx-auto mt-10 max-w-lg">
      <div>
        <div className="text-center">
          <Icon src="/icons/admin.svg" className="mx-auto w-16 h-16" color="bg-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Atur Admin</h2>
          <p className="mt-1 text-sm text-gray-500">
            Admin dapat membantu anda untuk mengatur data produk anda di Sekitarmu.
          </p>
        </div>
        <form action="#" className="flex mt-6">
          <TextField
            hideLabel
            label="Email"
            name="email"
            placeholder="Masukan email"
            containerClassName="w-full"
          />

          <Button className="ml-2">Kirim undangan</Button>
        </form>
      </div>

      <div className="mt-10">
        <h3 className="font-semibold tracking-wide text-gray-500">Admin saat ini</h3>
        <ul className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {store.users.map((user) => (
            <AdminProfile
              key={user.id}
              image={user.image}
              name={user.name}
              role={user.email}
              owner={user.id === store.owner.id}
            />
          ))}
        </ul>
      </div>
    </div>
  </StoreManagementLayout>
)

const AdminProfile: FC<{
  image?: string | null
  name: string
  role: string
  owner: boolean
}> = ({ owner, image, name, role }) => (
  <li className="flex justify-between items-center py-4 space-x-3">
    <div className="flex flex-1 items-center space-x-3 min-w-0">
      <div className="flex-shrink-0">
        {image && <img className="w-10 h-10 rounded-full" src={image} alt="" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-sm font-medium text-gray-500 truncate">{role}</p>
      </div>
    </div>
    {owner && (
      <div className="flex-shrink-0">
        <div className="inline-flex items-center py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-full border focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none border-transparent">
          <span className="text-sm font-medium text-gray-900">Owner</span>
        </div>
      </div>
    )}
  </li>
)

export const getServerSideProps: GetServerSideProps<
  {
    store: Store & {
      users: { id: number; name: string; image?: string | null; email: string }[]
      owner: { id: number }
    }
  },
  { storeSlug: string }
> = async (ctx) => {
  if (!ctx.params) return { notFound: true }
  const session = await getSession(ctx)
  if (session === null) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false
      }
    }
  }

  const { storeSlug } = ctx.params
  const store = await findStoreWithAdminsAndOwner(storeSlug)
  if (!store) return { notFound: true }

  // Pass data to the page via props
  return {
    props: { store }
  }
}

export default StoreAdminPage
