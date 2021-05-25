/* eslint-disable react/button-has-type */
import { FC } from "react"

type Variant = "primary" | "secondary" | "outline" | "icon"

interface Props {
  type?: "submit" | "reset" | "button"
  onClick?: () => void
  className?: string
  variant?: Variant
}
const Button: FC<Props> = ({
  variant = "primary",
  type = "button",
  className = "",
  children,
  onClick
}) => {
  let baseClassName: string
  switch (variant) {
    case "outline":
      baseClassName =
        "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      break
    case "icon":
      baseClassName =
        "rounded-md text-gray-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      break
    case "secondary":
      baseClassName =
        "py-2 px-4 rounded-md text-gray-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      break
    default:
      baseClassName =
        "flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }

  return (
    <button type={type} className={`${className} ${baseClassName}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
