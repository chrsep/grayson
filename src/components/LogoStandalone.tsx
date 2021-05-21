import React, { FC } from "react"

const LogoStandalone: FC<{ className }> = ({ className }) => (
  <img
    className={className}
    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
    alt="Workflow"
  />
)

export default LogoStandalone
