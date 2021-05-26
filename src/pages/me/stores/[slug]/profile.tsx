import React from "react"
import { findStoreBySlug } from "@lib/db"
import { getSession } from "next-auth/client"
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import StoreAdminHeading from "@components/StoreAdminHeading"

const StoreProfile: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  breadcrumbs,
  tabs,
  store
}) => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8 pb-32">
      <div className="px-4 sm:px-0">
        <StoreAdminHeading breadcrumbs={breadcrumbs} name={store.name} tabs={tabs} />
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
        { name: "Produk", href: `/me/stores/${slug}`, current: false },
        { name: "Profil toko", href: `/me/stores/${slug}/profile`, current: true }
      ],
      breadcrumbs: [
        { name: "Toko anda", href: "/me/stores", current: false },
      ]
    }
  }
}

export default StoreProfile
