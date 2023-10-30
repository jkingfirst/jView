/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  "parser": "vue-eslint-parser",
  plugins:[
    "vue",
    "@typescript-eslint",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  rules: {
    "@typescript-eslint/no-explicit-any": 0
  }
}
