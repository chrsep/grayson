import slugify from "slugify"
import { nanoid } from "nanoid"

export interface User {
  id: string
  name: string
  email: string
  stores: Store[]
}

export interface Store {
  id: string
  name: string
  address: string
  phone: string
  slug: string

  products: Product[]
}

export interface Product {
  id: string
  images: Image[]
  name: string
  price: number
}

export interface Image {
  id: string
  key: string
}

export interface Tag {
  slug: string
  name: string
}

export interface Context {
  user?: {
    name: string
    email: string
  }
}

export const generateUniqueSlug = (value: string): string => {
  return slugify(value + "-" + nanoid(4), { lower: true })
}
