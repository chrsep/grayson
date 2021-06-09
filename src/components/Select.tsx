import { ChangeEventHandler, forwardRef, ForwardRefRenderFunction } from "react"
import { ComponentChildren } from "preact"

interface Props {
  children: ComponentChildren
  label: string
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
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      ref={ref}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
  </label>
)

export default forwardRef(Select)
