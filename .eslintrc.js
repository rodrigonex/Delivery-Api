module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    'consistent-return': 'off',
    camelcase: 'off',
    'import/extensions': 'off',
    'no-unresolved': 'off',
  },
};
