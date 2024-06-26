/* eslint-disable @typescript-eslint/no-var-requires */
// const { withSentryConfig } = require("@sentry/nextjs")
const withPlugins = require("next-compose-plugins")
const { withPlaiceholder } = require("@plaiceholder/next")
// const nextPWA = require("next-pwa")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

// const withPWA = [
//   nextPWA,
//   {
//     pwa: {
//       dest: "public",
//       disable: process.env.NODE_ENV === "development",
//       // don't precache anything.
//       buildExcludes: [/.*/],
//       publicExcludes: ["!**/*"]
//     }
//   }
// ]

const plugins = [withBundleAnalyzer, withPlaiceholder]
// if (process.env.NODE_ENV === "production") plugins.push(withSentryConfig)

module.exports = withPlugins(plugins, {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["localhost", "grayson-media.sgp1.cdn.digitaloceanspaces.com"]
  }
})
