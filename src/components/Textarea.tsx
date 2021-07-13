import { ChangeEventHandler, forwardRef, ForwardRefRenderFunction } from "react"

interface Props {
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
  { containerClassName, label, required, onChange, autocomplete, value, name, placeholder, rows },
  ref
) => {
  return (
    <div className={`${containerClassName}`}>
      <label htmlFor={name} className="block text-sm text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
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
          className="block w-full sm:text-sm rounded-md border-gray-300 focus:border-primary-400 focus:ring-primary-400"
        />
      </div>
    </div>
  )
}

export default forwardRef(Textarea)
