import { ChangeEventHandler, FC, forwardRef, ForwardRefRenderFunction } from "react"

interface Props {
  id: string
  label: string
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
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 rounded-md shadow-sm relative">
        <textarea
          id={id}
          name={name}
          autoComplete={autocomplete}
          required={required}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          rows={rows}
          ref={ref}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  )
}

export default forwardRef(Textarea)
