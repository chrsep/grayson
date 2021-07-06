import CategoryNavigation from "@components/CategoryNavigation"
import React from "react"
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
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
  const { categorySlug } = context.params
  const category = categories.find(({ slug }) => slug === categorySlug)

  // Pass data to the page via props
  return {
    props: {
      products: await findProductsByCategory(category.id as Category),
      category
    }
  }
}

export default CategoryPage
