import Image from "next/image"
import Button from "@components/Button"
import React, { ChangeEventHandler, FC, useRef } from "react"

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>
}
const ProfilePicSelector: FC<Props> = ({ onChange }) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className="flex items-start">
      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
        Foto Profil
        <input
          id="avatar"
          type="file"
          className="hidden"
          onChange={onChange}
          ref={ref}
          accept="image/*"
        />
        <div className="mt-1 flex items-center">
          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            <Image
              width={48}
              height={48}
              src="/icons/user-circle.svg"
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

export default ProfilePicSelector
