module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: { },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [2, "always"],
    'operator-linebreak': [2, 'before'],
    'no-multiple-empty-lines': 1,
  }
}
