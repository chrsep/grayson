// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors")

/* eslint-disable global-require,import/no-extraneous-dependencies */
module.exports = {
  mode: "jit",
  purge: ["src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: {
        100: colors.blue["50"],
        300: "#3B82F6",
        400: "#2563EB",
        500: "#1d4ed8",
        600: "#1E40AF"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio")
  ]
}
