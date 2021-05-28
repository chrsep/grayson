import { Client } from "minio"

const BUCKET = process.env.S3_BUCKET
const minio = new Client({
  endPoint: process.env.S3_ENDPOINT,
  port: parseInt(process.env.S3_PORT, 10),
  useSSL: process.env.NODE_ENV !== "development",
  accessKey: process.env.S3_KEY,
  secretKey: process.env.S3_SECRET
})

// eslint-disable-next-line import/prefer-default-export
export const newSignedUploadUrl = (objectName: string) => {
  return new Promise((resolve, reject) => {
    minio.presignedPutObject(BUCKET, objectName, (err, url) => {
      if (err) {
        reject(err)
      } else {
        resolve(url)
      }
    })
  })
}
