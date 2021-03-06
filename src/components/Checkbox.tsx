import { ChangeEventHandler, FC } from "react"

interface Props {
  id: string
  label: string
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  name: string
  containerClassName?: string
  required?: boolean
}
const Checkbox: FC<Props> = ({
  containerClassName,
  label,
  id,
  required,
  onChange,
  name,
  checked
}) => (
  <div className={`${containerClassName || ""} flex items-center`}>
    <input
      id={id}
      name={name}
      onChange={onChange}
      required={required}
      type="checkbox"
      className="w-4 h-4 text-primary-500 rounded border-gray-300 focus:ring-primary-400"
      checked={checked}
    />
    <label htmlFor={id} className="block ml-2 text-sm text-gray-900">
      {label}
    </label>
  </div>
)

export default Checkbox
