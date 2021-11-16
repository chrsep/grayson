/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require("@sentry/nextjs")

module.exports = withSentryConfig({
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["localhost", "grayson-media.sgp1.cdn.digitaloceanspaces.com"]
  }
})
