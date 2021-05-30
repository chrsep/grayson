import Image from "@components/Image"
import Button from "@components/Button"
import React, { ChangeEventHandler, FC, useRef } from "react"

interface Props {
  label: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder: string
  value?: string
  className?: string
}
const ImageSelectorWIthSmallPreview: FC<Props> = ({
  placeholder,
  label,
  value,
  onChange,
  className
}) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className={`flex items-start ${className}`}>
      <label htmlFor="image-input" className="block text-sm font-medium text-gray-700">
        {label}
        <input
          id="image-input"
          type="file"
          className="hidden"
          onChange={onChange}
          ref={ref}
          accept="image/*"
        />
        <div className="mt-1 flex items-center">
          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 border">
            <Image
              width={48}
              height={48}
              src={value || placeholder}
              className="h-full w-full text-gray-300"
            />
          </span>
          <Button variant="outline" className="ml-4" onClick={() => ref.current.click()}>
            Ubah
          </Button>
        </div>
      </label>
    </div>
  )
}

export default ImageSelectorWIthSmallPreview
