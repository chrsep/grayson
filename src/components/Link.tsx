import NextLink from "next/link"
import { FC, HTMLProps } from "react"

interface Props extends HTMLProps<HTMLAnchorElement> {
  href: string
  className?: string
}
const Link: FC<Props> = ({ href, className = "", children, ...props }) => (
  <NextLink href={href}>
    <a className={` text-primary-400 hover:text-primary-300 ${className}`} {...props}>
      {children}
    </a>
  </NextLink>
)

export default Link
