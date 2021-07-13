import { ChangeEventHandler, forwardRef, ForwardRefRenderFunction } from "react"

interface Props {
  containerClassName: string
  id?: string
  label?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  name: string
  autocomplete?: string
  required?: boolean
  placeholder?: string
}
const Pricefield: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    containerClassName,
    required,
    onChange,
    autocomplete,
    value,
    id = "price",
    name = "price",
    label = "Harga",
    placeholder = "2000"
  },
  ref
) => (
  <div className={containerClassName}>
    <label htmlFor={id} className="block text-sm text-gray-700">
      {label}
    </label>
    <div className="relative mt-1 rounded-md shadow-sm">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <span className="sm:text-sm text-gray-500">Rp.</span>
      </div>
      <input
        type="text"
        className="block pr-12 pl-10 w-full sm:text-sm rounded-md border-gray-300 focus:border-primary-400 focus:ring-primary-400"
        aria-describedby="price-currency"
        placeholder={placeholder}
        name={name}
        ref={ref}
        id={id}
        autoComplete={autocomplete}
        required={required}
        onChange={onChange}
        value={value}
      />
      <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
        <span className="sm:text-sm text-gray-500" id="price-currency">
          IDR
        </span>
      </div>
    </div>
  </div>
)

export default forwardRef(Pricefield)
