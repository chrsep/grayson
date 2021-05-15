import dayjs from "dayjs"
import type { Dayjs } from "dayjs"

export const now = (): Dayjs => {
  return dayjs()
}
