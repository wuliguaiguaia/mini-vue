module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: { },
  env: {
    browser: true
  },
  extends: [
    'standard'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 'off',
    'operator-linebreak': ['error', 'before'],
    'no-multiple-empty-lines': 'error',
    'no-prototype-builtins': 'off',
    'no-cond-assign': 'off',
    'no-proto': 'off',
    'space-before-function-paren': 'off',
    'no-multiple-empty-lines': 'off',
    'no-new-func': 'off'
  }
};
