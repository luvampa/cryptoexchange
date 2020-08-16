module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    "react/prop-types": 0,
    'class-methods-use-this': 0,
    semi: [
      'error',
      'never',
    ],
    'no-shadow': [
      'error',
      {
        allow: [
          'state',
        ],
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
        // "ignorePropertyModificationsFor": ["state"],
      },
    ],
    'import/no-unresolved': 'off',
    'max-len': 'off',
    'no-restricted-syntax': 'off',
    'prefer-destructuring': 'off',
    'no-useless-constructor': 'off',
    radix: 'off',
    'no-underscore-dangle': 'off',
    'no-await-in-loop': 'off',
    'guard-for-in': 'off',
    'prefer-spread': 'off',
    'no-param-reassign': 'off',
    'no-restricted-globals': 'off',
    'no-alert': 'off',
    'no-shadow': 'off',
    'func-names': 'off',
    'new-cap': 'off',
    'consistent-return': 'off',
    'no-prototype-builtins': 'off',
  },
}
