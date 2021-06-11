import CategoryNavigation from "@components/CategoryNavigation"
import React from "react"
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import { getSession } from "next-auth/client"
import categories from "@lib/categories"
import { findProductsByCategory } from "@lib/db"
import type { Category } from "@prisma/client"
import ProductList from "@components/ProductList"

const CategoryPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  category,
  products
}) => {
  return (
    <div>
      <CategoryNavigation />
      <h1 className="font-bold p-4 pt-8 text-4xl">{category.name}</h1>

      <ProductList products={products} />
    </div>
  )
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ categorySlug: string }>
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

  const { categorySlug } = context.params
  const category = categories.find(({ slug }) => slug === categorySlug)

  const products = await findProductsByCategory(category.id as Category)

  // Pass data to the page via props
  return {
    props: {
      category,
      products
    }
  }
}

export default CategoryPage
