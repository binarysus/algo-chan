module.exports = {
  "env": {
    "browser": false,
    "node" : true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "arrow-spacing": "error",
    "block-spacing": "error",
    "comma-dangle": "error",
    "comma-spacing": "error",
    "eol-last": ["error", "always"],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "no-extra-parens": "error",
    "no-multiple-empty-lines": ["error", {
      "max": 1,
      "maxEOF": 1,
      "maxBOF": 0
    }],
    "no-trailing-spaces": "error",
    "no-unused-expressions": "error",
    "no-use-before-define": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-tabs": "error",
    "no-unneeded-ternary": "error",
    "nonblock-statement-body-position": "error",
    "object-curly-spacing": "error",
    "operator-assignment": ["error", "always"],
    "no-whitespace-before-property": "error",
    "prefer-const": "error",
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "semi-spacing": "error",
    "semi-style": ["error", "last"],
    "space-before-blocks": "error",
    "space-before-function-paren": ["error", "never"],
    "space-infix-ops": "error",
    "spaced-comment": ["error", "always"],
    "switch-colon-spacing": ["error", {"after": true, "before": false}],
    "space-unary-ops": "error",
    "yoda": "error"
  }
};
