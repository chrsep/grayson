import Image from "@components/Image"
import Button from "@components/Button"
import React, { ChangeEventHandler, FC, useRef } from "react"

interface Props {
  label: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder: string
  value?: string | null
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
      <label htmlFor="image-input" className="block text-sm text-gray-700">
        {label}
        <input
          id="image-input"
          type="file"
          className="hidden"
          onChange={onChange}
          ref={ref}
          accept="image/*"
        />
        <div className="flex items-center mt-1">
          <span className="inline-block overflow-hidden w-12 h-12 bg-gray-100 rounded-full border">
            <Image
              width={48}
              height={48}
              src={value || placeholder}
              className="w-full h-full text-gray-300"
            />
          </span>
          <Button variant="outline" className="ml-4" onClick={() => ref.current?.click()}>
            Ubah
          </Button>
        </div>
      </label>
    </div>
  )
}

export default ImageSelectorWIthSmallPreview
