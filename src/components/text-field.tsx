import { ChangeEventHandler, forwardRef, ForwardRefRenderFunction } from "react"

interface Props {
  name: string
  label?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  type?: string
  value?: string
  autocomplete?: string
  containerClassName?: string
  required?: boolean
  iconSrc?: string
  placeholder?: string
  hideLabel?: boolean
  inputClassName?: string
  onBlur?: ChangeEventHandler<HTMLInputElement>
}

const TextField: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    containerClassName,
    label,
    required,
    onChange,
    autocomplete,
    value,
    name,
    iconSrc,
    placeholder,
    inputClassName,
    onBlur,
    type = "text",
    hideLabel = false
  },
  ref
) => {
  return (
    <div className={`${containerClassName}`}>
      <label htmlFor={name} className="block text-sm text-gray-700">
        {!hideLabel && <span className="block mb-1">{label}</span>}
        <div className="relative rounded-md">
          {iconSrc && (
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <img
                src={iconSrc}
                className="w-5 h-5 text-gray-400 opacity-70"
                aria-hidden="true"
                alt=""
              />
            </div>
          )}
          <input
            id={name}
            name={name}
            type={type}
            autoComplete={autocomplete}
            required={required}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            ref={ref}
            onBlur={onBlur}
            className={`${inputClassName} focus:ring-primary-500 focus:border-primary-500 block w-full ${
              iconSrc ? "pl-10" : ""
            } sm:text-sm border-gray-300 rounded-md shadow-sm `}
          />
        </div>
      </label>
    </div>
  )
}

export default forwardRef(TextField)
