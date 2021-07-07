import { newPublicApi } from "@lib/rest"
import { NextApiHandler, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { findCartById, findCartByUserEmail, insertGuestCart, insertUserCart } from "@lib/db"
import { Cart, LineItem } from "@prisma/client"
import { Session } from "next-auth"

export type GetResponseBody = Omit<Cart, "userId"> & { lineItems: LineItem[] }

async function handleGetGuestCart(cartId: string, res: NextApiResponse) {
  let cart = await findCartById(cartId)

  if (cart?.user !== null) {
    res.status(401).end()
    return
  }

  if (!cart) {
    cart = await insertGuestCart()
    res.setHeader("Set-Cookie", `guest-cart-id=${cart.id}`)
  }

  res.status(200).json({
    id: cart.id,
    lineItems: cart.lineItems
  })
}

async function handleGetUserCart(session: Session, res: NextApiResponse) {
  if (!session.user?.email) {
    res.status(401).end()
    return
  }
  let cart = await findCartByUserEmail(session.user.email)

  if (!cart) {
    cart = await insertUserCart(session.user.email)
    res.setHeader("Set-Cookie", `guest-cart-id=${cart.id}`)
  }

  res.status(200).json({
    id: cart.id,
    lineItems: cart.lineItems
  })
}

const get: NextApiHandler<GetResponseBody> = async (req, res) => {
  const session = await getSession({ req })
  const cartId = req.cookies["guest-cart-id"]

  if (!session) {
    await handleGetGuestCart(cartId, res)
  } else {
    await handleGetUserCart(session, res)
  }
}

export default newPublicApi({ get })
