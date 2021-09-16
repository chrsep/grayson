import { FC } from "react"

interface Props {
  className?: string
}
const Divider: FC<Props> = ({ className }) => (
  <div className={className} aria-hidden="true">
    <div className="py-5">
      <div className="border-t border-gray-200" />
    </div>
  </div>
)

export default Divider
