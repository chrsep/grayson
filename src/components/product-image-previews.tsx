import React, { FC } from "react"
import Image from "@components/image"
import Button from "@components/button"

const ProductImagePreviews: FC<{
  files: string[]
  onDeleteClick: (file: string) => void
}> = ({ files, onDeleteClick }) => (
  <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 xl:gap-x-6 gap-y-8">
    {files.map((file) => (
      <li key={file} className="relative">
        <div className="group block overflow-hidden w-full bg-gray-100 rounded-lg focus-within:ring-2 focus-within:ring-primary-400 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 aspect-w-10 aspect-h-7">
          <div>
            <Image
              layout="fill"
              src={file}
              className="object-cover group-hover:opacity-75 pointer-events-none"
              objectFit="cover"
              alt=""
            />
          </div>

          <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details for</span>
          </button>
        </div>
        <Button
          variant="outline"
          className="py-1 mt-2 w-full text-red-600"
          onClick={() => onDeleteClick(file)}
        >
          Hapus
        </Button>
      </li>
    ))}

    {files.length === 0 && (
      <li className="relative col-span-full py-8 text-center text-gray-500">
        Belum ada gambar terpasang
      </li>
    )}
  </ul>
)

export default ProductImagePreviews
