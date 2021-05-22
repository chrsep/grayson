/* eslint-disable react/button-has-type */
import { FC } from "react"

interface Props {
  type?: "submit" | "reset" | "button"
  onClick?: () => void
}
const Button: FC<Props> = ({ type = "button", children, onClick }) => (
  <button
    type={type}
    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
