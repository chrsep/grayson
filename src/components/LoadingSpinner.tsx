import { FC } from "react"

interface Props {
  show: boolean
}
const LoadingSpinner: FC<Props> = ({ show }) => {
  return (
    <img
      src="/icons/spinner.svg"
      className={`${show ? "w-4 h-4" : "w-0 h-0 "} mr-2 animate-spin transition-all ease-in-out`}
      alt=""
    />
  )
}

export default LoadingSpinner
