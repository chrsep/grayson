// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPreact = require("next-plugin-preact")

module.exports = withPreact({
  future: {
    webpack5: true
  }
})
