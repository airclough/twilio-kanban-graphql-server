module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2021',
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'computed-property-spacing': [ 'error', 'always' ],
    'max-len': [ 'error', { 'code': 120 } ],
    'semi': [ 'error', 'always' ],
    'space-in-parens': [ 'error', 'always' ],
    'template-curly-spacing': [ 'error', 'always' ],
  },
};