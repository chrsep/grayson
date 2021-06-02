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
    type = "text",
    hideLabel = false
  },
  ref
) => {
  return (
    <div className={`${containerClassName}`}>
      <label htmlFor={name} className="block text-sm  text-gray-700">
        {!hideLabel && <span className="mb-1 block">{label}</span>}
        <div className="rounded-md shadow-sm relative">
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
            id={name}
            name={name}
            type={type}
            autoComplete={autocomplete}
            required={required}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            ref={ref}
            className={`focus:ring-primary-500 focus:border-primary-500 block w-full ${
              iconSrc ? "pl-10" : ""
            } sm:text-sm border-gray-300 rounded-md`}
          />
        </div>
      </label>
    </div>
  )
}

export default forwardRef(TextField)
