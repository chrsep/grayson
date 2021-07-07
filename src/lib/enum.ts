/* eslint-disable @typescript-eslint/no-explicit-any */
import { keyof, Type } from "io-ts"

// eslint-disable-next-line @typescript-eslint/ban-types
export const createEnum = <E>(e: object, name: string): Type<E> => {
  const keys = {}
  Object.keys(e).forEach((k) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    keys[e[k]] = null
  })
  return keyof(keys, name) as any
}
