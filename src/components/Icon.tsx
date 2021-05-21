import { FC } from "react"

interface Props {
  src: string
}
const Icon: FC<Props> = ({ src }) => {
  return <img src={src} alt="" aria-hidden="true" className="block h-6 w-6" />
}

export default Icon
