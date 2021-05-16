import type { EndpointOutput } from "@sveltejs/kit"

export const badRequest = (message = "invalid request body"): EndpointOutput => ({
  status: 400,
  body: { message }
})

export const noContent = (): EndpointOutput => ({
  status: 204,
  body: { message: "success" }
})

export const unauthorized = (message = "Unauthorized"): EndpointOutput => ({
  status: 403,
  body: { message }
})

export const internalError = (): EndpointOutput => ({
  status: 500,
  body: { message: "internal server error" }
})
