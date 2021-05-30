import React, { FC } from "react"
import Image from "@components/Image"

const ProductImagePreviews: FC<{ files: string[] }> = ({ files }) => (
  <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-6">
    {files.map((file) => (
      <li key={file} className="relative">
        <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
          <div>
            <Image
              width={170}
              height={120}
              src={file}
              className="object-cover pointer-events-none group-hover:opacity-75"
              objectFit="cover"
              alt=""
            />
          </div>

          <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details for</span>
          </button>
        </div>
      </li>
    ))}

    {files.length === 0 && (
      <li className="relative col-span-full text-center text-gray-500 py-8">
        Belum ada gambar terpasang
      </li>
    )}
  </ul>
)

export default ProductImagePreviews
