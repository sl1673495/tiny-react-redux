module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', "plugin:react/recommended", 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/prop-types': 0
  },
};
