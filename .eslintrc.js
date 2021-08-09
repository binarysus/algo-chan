module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "@typescript-eslint/no-extra-parens": "error",
    "@typescript-eslint/semi": "error",
    "arrow-spacing": "error",
    "block-spacing": "error",
    "comma-dangle": "error",
    "comma-spacing": "error",
    "eol-last": ["error", "always"],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "no-extra-parens": "off",
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1, "maxBOF": 0 }],
    "no-tabs": "error",
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "error",
    "no-unused-expressions": "error",
    "no-use-before-define": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-whitespace-before-property": "error",
    "nonblock-statement-body-position": "error",
    "object-curly-spacing": ["error", "always"],
    "operator-assignment": ["error", "always"],
    "prefer-const": "error",
    "quotes": ["error", "double"],
    "semi-spacing": "error",
    "semi-style": ["error", "last"],
    "space-before-blocks": "error",
    "space-before-function-paren": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": ["error", "always"],
    "switch-colon-spacing": ["error", { "after": true, "before": false }],
    "yoda": "error"
  }
};
