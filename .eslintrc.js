module.exports = {
  settings: {
    "import/resolver": {
      typescript: {}
    }
  },
  parserOptions: {
    project: "./tsconfig.eslint.json"
  },
  plugins: ["tailwindcss", "import"],
  extends: [
    "plugin:@next/next/recommended",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended"
  ],
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "react/prop-types": 0,
    "@typescript-eslint/no-shadow": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "@typescript-eslint/no-use-before-define": ["error", { variables: false }],
    "import/prefer-default-export": 0,
    "@typescript-eslint/no-redeclare": 0,
    "react/require-default-props": 0
  }
}
