import { createApi } from "@lib/rest"
import { NextApiHandler } from "next"
import { array, number, string, type } from "io-ts"
import { findLineItemsData } from "@lib/db"
import { toIDR } from "@lib/currency"

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
    text += "\n\n==="
    completeData.forEach((item) => {
      total += item.qty * item.price
      text = `${text}\n${item.qty} x ${item.name} \n@ ${toIDR(item.price)} = ${toIDR(
        item.qty * item.price
      )}`
      text += "\n==="
    })
    text += `\n\nTotalnya ${toIDR(total)} ya?`

    res.status(200).json({
      total,
      whatsappLink: createWhatsappLink(completeData?.[0].store?.whatsapp, text)
    })
  } else {
    res.status(403).json({
      message: "message body is not valid"
    })
  }
}

const createWhatsappLink = (whatsAppNumber: string, text: string) => {
  // make sure number includes a country code
  let formattedWhatsAppNumber = whatsAppNumber
  const usesCountryCode = formattedWhatsAppNumber.startsWith("+")
  if (!usesCountryCode) {
    formattedWhatsAppNumber = `+62${formattedWhatsAppNumber}`
  }

  return `https://wa.me/${formattedWhatsAppNumber}?text=${encodeURIComponent(text)}`
}

export default createApi({ post })
