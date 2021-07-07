import React, { FC } from "react"

const LogoStandalone: FC<{ className: string }> = ({ className }) => (
  <img
    className={className}
    src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
    alt="Workflow"
  />
)

export default LogoStandalone
