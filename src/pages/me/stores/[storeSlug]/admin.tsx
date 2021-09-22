import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage
} from "next"
import StoreManagementLayout from "@layouts/store-management-layout"
import Button from "@components/button"
import { Product, Store } from "@prisma/client"
import { getSession } from "next-auth/client"
import { findStoreWithProductsBySlug } from "@lib/db"
import React, { FC } from "react"
import TextField from "@components/text-field"
import Icon from "@components/icon"

const people = [
  {
    name: "Lindsay Walton",
    handle: "lindsaywalton",
    email: "lindsaywalton@example.com",
    role: "Front-end Developer",
    imageId: "1517841905240-472988babdf9",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Courtney Henry",
    handle: "courtneyhenry",
    email: "courtneyhenry@example.com",
    role: "Designer",
    imageId: "1438761681033-6461ffad8d80",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Tom Cook",
    handle: "tomcook",
    email: "tomcook@example.com",
    role: "Director, Product Development",
    imageId: "1472099645785-5658abf4ff4e",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
]
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
          <h2 className="mt-2 text-lg font-medium text-gray-900">Tambah Admin</h2>
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
          {people.map((person) => (
            <AdminProfile
              key={person.name}
              image={person.imageUrl}
              name={person.name}
              role={person.role}
            />
          ))}
        </ul>
      </div>
    </div>
  </StoreManagementLayout>
)

const AdminProfile: FC<{
  image: string
  name: string
  role: string
}> = ({ image, name, role }) => {
  return (
    <li className="flex justify-between items-center py-4 space-x-3">
      <div className="flex flex-1 items-center space-x-3 min-w-0">
        <div className="flex-shrink-0">
          <img className="w-10 h-10 rounded-full" src={image} alt="" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
          <p className="text-sm font-medium text-gray-500 truncate">{role}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button
          type="button"
          className="inline-flex items-center py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-full border focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none border-transparent"
        >
          {/* <PlusSmIcon className="mr-0.5 -ml-1 w-5 h-5 text-gray-400" aria-hidden="true" /> */}
          <span className="text-sm font-medium text-gray-900">
            {" "}
            Invite <span className="sr-only">{name}</span>{" "}
          </span>
        </button>
      </div>
    </li>
  )
}

export const getServerSideProps: GetServerSideProps<
  { store: Store & { products: Product[] } },
  { storeSlug: string }
> = async (context: GetServerSidePropsContext<{ storeSlug: string }>) => {
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

export default StoreAdminPage
