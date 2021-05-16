import slugify from "slugify"
import { nanoid } from "nanoid"

export interface User {
  id: string
  name: string
  email: string
}

export interface Store {
  id: string
  name: string
  address: string
  phone: string
  slug: string
  description: string
  owner?: User
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  slug: string
  tags: Array<Tag>
  store?: Store
  owner?: User
}

export interface Image {
  id: string
  key: string
}

export interface Tag {
  slug: string
  name: string
}

export interface Locals {
  user?: {
    id: string
    name: string
    email: string
  }
}

export const generateUniqueSlug = (value: string): string => {
  return slugify(value + "-" + nanoid(5), { lower: true })
}

const rupiahFormatter = Intl.NumberFormat("id", {
  currency: "IDR",
  style: "currency"
})

export const formatCurrency = (value: number): string => {
  return rupiahFormatter.format(value).replace(/\D00(?=\D*$)/, "")
}
