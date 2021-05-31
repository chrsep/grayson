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
      className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-gray-300 rounded"
      checked={checked}
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
      {label}
    </label>
  </div>
)

export default Checkbox
