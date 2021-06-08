import { keyof, Type } from "io-ts"

// eslint-disable-next-line @typescript-eslint/ban-types
export const createEnum = <E>(e: object, name: string): Type<E> => {
  const keys = {}
  Object.keys(e).forEach((k) => {
    keys[e[k]] = null
  })
  return keyof(keys, name) as any
}
