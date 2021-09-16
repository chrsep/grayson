import { ChangeEventHandler, forwardRef, ForwardRefRenderFunction } from "react"
import { ComponentChildren } from "preact"

interface Props {
  children: ComponentChildren
  label?: string
  id: string
  name?: string
  containerClassName?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
}
const Select: ForwardRefRenderFunction<HTMLSelectElement, Props> = (
  { label, containerClassName, children, id, name, onChange, value },
  ref
) => (
  <label htmlFor={id} className={`${containerClassName} block text-sm font-medium text-gray-700`}>
    {label}
    <select
      id={id}
      name={name}
      className="block py-2 pr-10 pl-3 mt-1 w-full text-base sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
      ref={ref}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
  </label>
)

export default forwardRef(Select)
