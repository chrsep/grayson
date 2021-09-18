import { FC } from "react"

const LogoFull: FC<{ className: string }> = ({ className }) => (
  <img className={className} src="/logo-full.svg" alt="Sekitarmu" />
)

export default LogoFull
