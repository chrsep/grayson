module.exports = {
  parserOptions: {
    project: "./tsconfig.eslint.json"
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ]
}
