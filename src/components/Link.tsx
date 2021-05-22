import NextLink from "next/link"
import { FC } from "react"

interface Props {
  href: string
  className?: string
}
const Link: FC<Props> = ({ href, className = "", children }) => (
  <NextLink href={href}>
    <a className={`font-medium text-indigo-600 hover:text-indigo-500 ${className}`}>{children}</a>
  </NextLink>
)

export default Link
