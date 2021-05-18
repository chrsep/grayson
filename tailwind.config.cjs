const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles")

module.exports = {
  // mode: "jit",
  purge: {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    options: {
      defaultExtractor: (content) => [
        // If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
        ...tailwindExtractor(content),
        // Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
        ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
          ([_match, group, ..._rest]) => group
        )
      ],
      keyframes: true
    }
  },
  theme: {
    extend: {
      borderRadius: {
        xl: "0.75rem"
      },
      colors: {
        "primary-light": "#3EECFF",
        primary: "#0e5ad9",
        "on-primary": "white",
        "primary-text": "#0c50b6",

        secondary: "#3FFFB2",

        surface: "white",
        "dark-surface": "#f8f9fa ",

        black: "#232529",

        danger: "red"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio")
  ]
}
