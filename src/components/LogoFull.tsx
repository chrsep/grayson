import React, { FC } from "react"

const LogoFull: FC<{ className }> = ({ className }) => (
  <img
    className={className}
    src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
    alt="Workflow"
  />
)

export default LogoFull
