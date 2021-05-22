import { ChangeEventHandler, FC } from "react"

interface Props {
  id: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  autocomplete: string
  name: string
  type: string
  containerClassName?: string
  required?: boolean
}
const TextField: FC<Props> = ({
  containerClassName,
  label,
  id,
  required,
  onChange,
  autocomplete,
  value,
  name,
  type
}) => (
  <div className={containerClassName}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autocomplete}
        required={required}
        onChange={onChange}
        value={value}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  </div>
)

export default TextField
