import { createApi, newMutationHandler, withAuth } from "@lib/rest"
import { array, number, partial, string } from "io-ts"
import { deleteProductById, findProductByIdWithImages, updateProduct } from "@lib/db"
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
const patch = newMutationHandler(PatchBody, async (body, session, { query: { productId } }) => {
  if (string.is(productId)) {
    const product = await findProductByIdWithImages(productId)
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

const del: NextApiHandler = async ({ query: { productId } }, res) => {
  if (string.is(productId)) {
    await deleteProductById(productId)
    res.status(201).json({})
  } else {
    res.status(400).json({
      error: "bad_request",
      description: "the data provided does not adhere to the standard"
    })
  }
}

const get: NextApiHandler = async (req, res) => {
  const { productId } = req.query
  if (string.is(productId)) {
    const product = await findProductByIdWithImages(productId)
    res.json(product)
  } else {
    res.status(404).json({
      error: "not_found",
      description: "can't find the given product"
    })
  }
}

export default createApi({
  get,
  patch: withAuth(patch),
  del: withAuth(del)
})
