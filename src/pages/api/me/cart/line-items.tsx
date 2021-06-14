import { NextApiHandler } from "next"
import { ApiResponse, newMutationHandler, newPublicApi } from "@lib/rest"
import { number, string, type, TypeOf } from "io-ts"
import { findCartById, findCartByUserEmail, insertLineItemToCartById } from "@lib/db"
import { Session } from "next-auth"

const PutBody = type({
  productId: string,
  qty: number
})

type PutLineItemBody = TypeOf<typeof PutBody>

async function handleGuestPutLineItems(
  cartId: string,
  body: PutLineItemBody
): Promise<ApiResponse> {
  let cart = await findCartById(cartId)

  if (cart.user !== null) {
    return {
      status: 401,
      body: {}
    }
  }

  await insertLineItemToCartById(cartId, body)

  cart = await findCartById(cartId)
  return {
    status: 200,
    body: cart
  }
}

async function handleUserPutLineItems(
  session: Session,
  body: PutLineItemBody
): Promise<ApiResponse> {
  let cart = await findCartByUserEmail(session.user.email)

  if (!cart) {
    return {
      status: 404,
      body: {}
    }
  }

  await insertLineItemToCartById(cart.id, body)

  cart = await findCartByUserEmail(session.user.email)
  return {
    status: 200,
    body: cart
  }
}

const put: NextApiHandler = newMutationHandler(PutBody, async (body, session, req) => {
  const cartId = req.cookies["guest-cart-id"]

  if (!session) {
    return handleGuestPutLineItems(cartId as string, body)
  }

  await handleUserPutLineItems(session, body)
  return {
    status: 200,
    body: {}
  }
})

export default newPublicApi({
  put
})
