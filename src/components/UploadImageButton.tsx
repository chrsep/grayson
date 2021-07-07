import Button, { ButtonVariant } from "@components/Button"
import React, { ChangeEventHandler, FC, useRef } from "react"

interface Props {
  className?: string
  variant?: ButtonVariant
  onChange?: ChangeEventHandler<HTMLInputElement>
}
const UploadImageButton: FC<Props> = ({ children, variant, onChange, className }) => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <>
      <input className="hidden" type="file" ref={ref} onChange={onChange} accept="image/*" />
      <Button variant={variant} className={className} onClick={() => ref.current?.click()}>
        {children}
      </Button>
    </>
  )
}

export default UploadImageButton
