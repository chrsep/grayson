module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  extends: [
    "airbnb-typescript",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],

  overrides: [
    {
      // turn off no-new for miragejs use in storybook.
      files: ["*.stories.tsx"],
      rules: { "no-new": "off" }
    }
  ],
  rules: {
    "react/destructuring-assignment": "off",
    "no-console": "off",
    "global-require": 0,
    "react/button-has-type": 0,
    "no-undef": 0,
    "react/prop-types": 0,
    "react/style-prop-object": 0,
    "react/jsx-props-no-spreading": 0,
    "react/react-in-jsx-scope": 0,
    "jsx-a11y/anchor-is-valid": ["off"],
    "@typescript-eslint/no-use-before-define": 0,
    // Recommended for immer.
    "no-param-reassign": ["error", { props: true, ignorePropertyModificationsFor: ["draft"] }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "webpack.config.prod.js",
          "webpack.config.js",
          "**/*.mdx",
          "**/setupTests.ts",
          "**/utils/mockGenerator.ts",
          "**/*stories.tsx",
          "**/*.test.tsx",
          "**/*.test.ts",
          "**/*.spec.js",
          "**/*.spec.ts"
        ]
      }
    ],
    "import/no-named-as-default": "off",
    "import/no-cycle": "off",
    "import/extensions": "off",
    "import/prefer-default-export": 0,
    "no-unused-expressions": "off",
    "react/jsx-fragments": "off",
    "import/no-unresolved": [2, { ignore: [".png$"] }],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        controlComponents: ["Input"],
        depth: 3
      }
    ],
    "no-restricted-imports": [
      "error",
      {
        name: "dayjs",
        message: "Please use ./src/dayjs instead. It setups required plugins correctly."
      }
    ]
  },
  globals: {
    document: true,
    window: true
  }
}
