/* eslint-disable react/destructuring-assignment */
import NextImage, { ImageProps } from "next/image"
import { FC } from "react"
import { generateS3Url } from "@lib/image-client"

const Image: FC<ImageProps> = (props) => {
  if (typeof props.src === "string") {
    const tempProps = props
    const isS3 = props.src.startsWith("S3-image/")
    if (isS3) tempProps.src = generateS3Url(props.src)

    return <NextImage {...tempProps} />
  }

  return <NextImage {...props} />
}

export default Image
