import dayjs from "dayjs/esm"
import type { Dayjs } from "dayjs/esm"

export const now = (): Dayjs => {
  return dayjs()
}
