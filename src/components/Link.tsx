import NextLink from "next/link"
import { FC, HTMLProps } from "react"

interface Props extends HTMLProps<HTMLAnchorElement> {
  href: string
  className?: string
}
const Link: FC<Props> = ({ href, className = "", children, ...props }) => (
  <NextLink href={href}>
    <a className={`font-medium text-indigo-600 hover:text-indigo-500 ${className}`} {...props}>
      {children}
    </a>
  </NextLink>
)

export default Link
