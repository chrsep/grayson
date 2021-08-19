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
    let total = 0
    completeData.forEach((item) => {
      total += item.qty * item.price
      text = `${text}\n${item.qty} x ${item.name}`
    })

    res.json({
      total,
      whatsappLink: createWhatsappLink(completeData?.[0].store?.whatsapp, text)
    })
  }
}

const createWhatsappLink = (wa: string, text: string) => {
  // make sure number includes a country code
  let properWa = wa
  const usesCountryCode = !properWa.startsWith("+")
  if (!usesCountryCode) {
    properWa = `+62${properWa}`
  }

  return `https://wa.me/${properWa}?text=${encodeURIComponent(text)}`
}

export default createApi({ post })
