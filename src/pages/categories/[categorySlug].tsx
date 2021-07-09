import CategoryNavigation from "@components/CategoryNavigation"
import React from "react"
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage
} from "next"
import categories, { findCategoryBySlug } from "@lib/categories"
import { findProductsByCategory } from "@lib/db"
import type { Category, Product, ProductImage, Store } from "@prisma/client"
import ProductList from "@components/ProductList"
import { ParsedUrlQuery } from "querystring"

const CategoryPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  category,
  products
}) => {
  return (
    <div>
      <CategoryNavigation />
      <h1 className="font-bold px-4 sm:px-8 pt-8 text-4xl">{category.name}</h1>

      <ProductList products={products} />
    </div>
  )
}

interface Props {
  products: (Product & { images: ProductImage[]; store: Store })[]
  category: typeof categories[0]
}

interface Query extends ParsedUrlQuery {
  categorySlug: string
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (
  context: GetServerSidePropsContext<{ categorySlug: string }>
) => {
  if (!context.params) return { notFound: true }
  const { categorySlug } = context.params
  const category = findCategoryBySlug(categorySlug)

  // Pass data to the page via props
  return {
    props: {
      products: await findProductsByCategory(category.id as Category),
      category
    }
  }
}

export default CategoryPage
