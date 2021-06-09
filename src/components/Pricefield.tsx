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
    <label htmlFor={id} className="block text-sm  text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">Rp.</span>
      </div>
      <input
        type="text"
        className="focus:ring-primary-400 focus:border-primary-400 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
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
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm" id="price-currency">
          IDR
        </span>
      </div>
    </div>
  </div>
)

export default forwardRef(Pricefield)
