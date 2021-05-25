import { ChangeEventHandler, forwardRef, ForwardRefRenderFunction } from "react"

interface Props {
  id: string
  label: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  name: string
  type: string
  autocomplete?: string
  containerClassName?: string
  required?: boolean
  iconSrc?: string
  placeholder?: string
}

const TextField: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    containerClassName,
    label,
    id,
    required,
    onChange,
    autocomplete,
    value,
    name,
    type,
    iconSrc,
    placeholder
  },
  ref
) => {
  return (
    <div className={`${containerClassName}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 rounded-md shadow-sm relative">
        {iconSrc && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img
              src={iconSrc}
              className="h-5 w-5 text-gray-400 opacity-70"
              aria-hidden="true"
              alt=""
            />
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autocomplete}
          required={required}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          ref={ref}
          className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full ${
            iconSrc ? "pl-10" : ""
          } sm:text-sm border-gray-300 rounded-md`}
        />
      </div>
    </div>
  )
}

export default forwardRef(TextField)
