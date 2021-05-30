/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require("next-compose-plugins")
const withPreact = require("next-plugin-preact")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const plugins = [withPreact, withBundleAnalyzer]

module.exports = withPlugins(plugins, {
  images: {
    domains: ["localhost"]
  }
})
