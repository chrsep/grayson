import type { Response } from "@sveltejs/kit"

export const badRequest = (message: string = "invalid request body"): Response => ({
  status: 400,
  body: { message }
})

export const noContent = (): Response => ({
  status: 204,
  body: { message: "success" }
})

export const unauthorized = (message: string = "Unauthorized"): Response => ({
  status: 400,
  body: { message }
})