module.exports = {
  parserOptions: {
    project: "./tsconfig.eslint.json"
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
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
    "@typescript-eslint/no-redeclare": 0
  }
}
