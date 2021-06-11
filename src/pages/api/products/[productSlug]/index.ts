import { newMutationHandler, newProtectedApi } from "@lib/rest"
import { array, number, partial, string } from "io-ts"
import { deleteProductBySlug, findProductBySlugWithImages, updateProduct } from "@lib/db"
import { createEnum } from "@lib/enum"
import { Category } from "@prisma/client"
import { NextApiHandler } from "next"

const PatchBody = partial({
  name: string,
  description: string,
  price: number,
  images: array(string),
  category: createEnum<Category>(Category, "Category")
})
const patch = newMutationHandler(PatchBody, async (body, session, { query: { productSlug } }) => {
  if (string.is(productSlug)) {
    const product = await findProductBySlugWithImages(productSlug)

    const updatedProduct = await updateProduct(
      product.id,
      { ...product, ...body },
      body.images.map((image) => ({ objectName: image }))
    )

    return {
      status: 200,
      body: updatedProduct
    }
  }

  return {
    status: 400,
    body: {
      error: "bad_request",
      description: "The data provided does not adhere to the standard"
    }
  }
})

const del: NextApiHandler = async ({ query: { productSlug } }, res) => {
  if (string.is(productSlug)) {
    await deleteProductBySlug(productSlug)
    res.status(201).json({})
  } else {
    res.status(400).json({
      error: "bad_request",
      description: "the data provided does not adhere to the standard"
    })
  }
}

export default newProtectedApi({ patch, del })
