import { Client } from "minio"

const { S3_ENDPOINT, S3_PORT, S3_KEY, S3_SECRET, S3_BUCKET } = process.env

if (!S3_BUCKET) throw new Error("S3 bucket url is not specified")
if (!S3_SECRET) throw new Error("S3 secret is not specified")
if (!S3_ENDPOINT) throw new Error("S3 endpoint is not specified")
if (!S3_KEY) throw new Error("S3 key is not specified")

const minio = new Client({
  endPoint: S3_ENDPOINT,
  accessKey: S3_KEY,
  secretKey: S3_SECRET,
  port: S3_PORT ? parseInt(S3_PORT, 10) : undefined,
  useSSL: process.env.NODE_ENV !== "development",
  region: "ap-southeast-1"
})

// eslint-disable-next-line import/prefer-default-export
export const newSignedUploadUrl = (objectName: string) => {
  return new Promise((resolve, reject) => {
    minio.presignedPutObject(S3_BUCKET, objectName, (err, url) => {
      if (err) {
        reject(err)
      } else {
        resolve(url)
      }
    })
  })
}
