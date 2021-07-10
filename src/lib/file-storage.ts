import AWS from "aws-sdk"

const { S3_ENDPOINT, S3_KEY, S3_SECRET, S3_BUCKET } = process.env

if (!S3_BUCKET) throw new Error("S3 bucket url is not specified")
if (!S3_SECRET) throw new Error("S3 secret is not specified")
if (!S3_ENDPOINT) throw new Error("S3 endpoint is not specified")
if (!S3_KEY) throw new Error("S3 key is not specified")

const spacesEndpoint = new AWS.Endpoint(S3_ENDPOINT)
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: S3_KEY,
  secretAccessKey: S3_SECRET,
  signatureVersion: "v4",
  s3ForcePathStyle: process.env.NODE_ENV !== "production"
})

// eslint-disable-next-line import/prefer-default-export
export const newSignedUploadUrl = (key: string) => {
  return s3.getSignedUrl("putObject", {
    ACL: "public-read", // needed to make the image public
    Bucket: S3_BUCKET,
    Expires: 60,
    Key: key
  })
}

export const deleteObjects = async (keys: string[]) => {
  return s3
    .deleteObjects({
      Bucket: S3_BUCKET,
      Delete: {
        Objects: keys.map((key) => ({ Key: key }))
      }
    })
    .promise()
}
