import { newMutationHandler, newProtectedApi } from "@lib/rest"
import { array, number, partial, string } from "io-ts"
import { deleteProductBySlug, findProductBySlugWithImages, updateProduct } from "@lib/db"
import { createEnum } from "@lib/enum"
import { Category } from "@prisma/client"
import { NextApiHandler } from "next"
import { getImagesMetadata } from "@lib/image-server"
import { deleteObjects } from "@lib/file-storage"

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
    if (!product) {
      return {
        status: 404,
        body: { message: "product not found" }
      }
    }

    const images = await getImagesMetadata(body.images)
    const result = await updateProduct(product.id, { ...product, ...body }, images)
    if (result.deletedImage.length > 0) {
      await deleteObjects(result.deletedImage.map(({ key }) => key))
    }

    return { status: 200, body: result.product }
  }

  return {
    status: 404,
    body: {
      error: "not_found",
      description: "product not found"
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
