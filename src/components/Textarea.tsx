import { ChangeEventHandler, FC, forwardRef, ForwardRefRenderFunction } from "react"

interface Props {
  label: string
  id?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  name: string
  autocomplete?: string
  containerClassName?: string
  required?: boolean
  placeholder?: string
  rows?: number
}

const Textarea: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
  {
    containerClassName,
    label,
    id,
    required,
    onChange,
    autocomplete,
    value,
    name,
    placeholder,
    rows
  },
  ref
) => {
  return (
    <div className={`${containerClassName}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 rounded-md shadow-sm relative">
        <textarea
          id={name}
          name={name}
          autoComplete={autocomplete}
          required={required}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          rows={rows}
          ref={ref}
          className="focus:ring-primary-400 focus:border-primary-400 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  )
}

export default forwardRef(Textarea)
