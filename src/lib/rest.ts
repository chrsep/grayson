import type { Response } from "@sveltejs/kit"

export const badRequest = (message = "invalid request body"): Response => ({
  status: 400,
  body: { message }
})

export const noContent = (): Response => ({
  status: 204,
  body: { message: "success" }
})

export const unauthorized = (message = "Unauthorized"): Response => ({
  status: 403,
  body: { message }
})

export const internalError = (): Response => ({
  status: 500,
  body: { message: "internal server error" }
})
