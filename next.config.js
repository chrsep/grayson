/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require("@sentry/nextjs")
const withPlugins = require("next-compose-plugins")
const withPreact = require("next-plugin-preact")
const { withPlaiceholder } = require("@plaiceholder/next")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const plugins = [withPreact, withBundleAnalyzer, withPlaiceholder]

if (process.env.NODE_ENV === "production") {
  plugins.push(withSentryConfig)
}

module.exports = withPlugins(plugins, {
  images: {
    domains: ["localhost", "grayson-media.sgp1.cdn.digitaloceanspaces.com"]
  }
})
