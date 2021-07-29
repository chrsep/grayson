import { createApi } from "@lib/rest"
import { NextApiHandler } from "next"
import { array, number, string, type } from "io-ts"
import { findLineItemsData } from "@lib/db"

const message = "Hi, saya mau pesan dong:"

const PostBody = array(
  type({
    productId: string,
    storeId: string,
    qty: number
  })
)

const post: NextApiHandler = async (req, res) => {
  const items = req.body
  if (PostBody.is(items)) {
    const completeData = await findLineItemsData(items)

    let text = message
    completeData.forEach((item) => {
      text = `${text}\n${item.qty} x ${item.name}`
    })

    res.json({
      whatsappLink: `https://wa.me/${completeData?.[0].store?.whatsapp}?text=${encodeURIComponent(
        text
      )}`
    })
  }
}

export default createApi({
  post
})
