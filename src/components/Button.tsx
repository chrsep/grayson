/* eslint-disable react/button-has-type */
import { FC } from "react"
import { classNames } from "@lib/ui"

type Variant = "primary" | "secondary" | "outline" | "icon"

interface Props {
  type?: "submit" | "reset" | "button"
  onClick?: () => void
  className?: string
  variant?: Variant
  disabled?: boolean
}

const Button: FC<Props> = ({
  variant = "primary",
  type = "button",
  className = "",
  children,
  onClick,
  disabled
}) => {
  let baseClassName: string
  switch (variant) {
    case "icon":
      baseClassName = "!p-0 text-gray-200 hover:text-gray-500"
      break
    case "secondary":
      baseClassName = "text-gray-200 hover:text-gray-500"
      break
    case "outline":
      baseClassName =
        "bg-white border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 "
      break
    default:
      baseClassName =
        "border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        className,
        baseClassName,
        "flex items-center rounded-md py-2 px-4 justify-center ",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        "disabled:opacity-40"
      )}
    >
      {children}
    </button>
  )
}

export default Button
