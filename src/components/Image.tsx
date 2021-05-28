import NextImage, { ImageProps } from "next/image"
import { FC } from "react"

const generateS3Url = (objectName: string) => `${process.env.NEXT_PUBLIC_S3_PREFIX}/${objectName}`

const Image: FC<ImageProps> = ({ src, ...props }) => {
  const isS3 = src.startsWith("S3-image/")
  return <NextImage src={isS3 ? generateS3Url(src) : src} {...props} />
}

export default Image
