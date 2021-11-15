/* eslint-disable react/button-has-type */
import { FC } from "react"
import clsx from "clsx"

export type ButtonVariant = "primary" | "secondary" | "outline" | "icon" | "text"

interface Props {
  type?: "submit" | "reset" | "button"
  onClick?: () => void
  className?: string
  variant?: ButtonVariant
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
      baseClassName =
        "!p-0 text-gray-200 hover:text-gray-500  hover:bg-gray-900 hover:bg-opacity-20"
      break
    // @deprecated: use text not secondary
    case "secondary":
      baseClassName = "text-gray-200 hover:text-gray-500 text-sm"
      break
    case "text":
      baseClassName = "text-gray-700 hover:text-gray-500 text-sm"
      break
    case "outline":
      baseClassName =
        "bg-white border border-gray-300 shadow-sm text-sm  text-gray-700 hover:bg-gray-100"
      break
    default:
      baseClassName =
        "border border-transparent shadow-sm text-white bg-primary-400 hover:bg-primary-500 text-sm"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        className,
        baseClassName,
        "flex justify-center items-center py-2 px-4 rounded-md whitespace-nowrap",
        "focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:outline-none",
        "disabled:opacity-40",
        "transition-colors"
      )}
    >
      {children}
    </button>
  )
}

export default Button
