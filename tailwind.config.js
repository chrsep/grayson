/* eslint-disable global-require,import/no-extraneous-dependencies */
module.exports = {
  mode: "jit",
  purge: ["src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio")
  ]
}
