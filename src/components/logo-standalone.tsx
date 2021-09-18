import React, { FC } from "react"

const LogoStandalone: FC<{ className: string }> = ({ className }) => (
  <img className={className} src="/logo.svg" alt="Sekitarmu" />
)

export default LogoStandalone
