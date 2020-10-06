module.exports = {
  env: {
    es2020: true,
    jest: true,
  },
  globals: {
    __DEV__: true,
    FormData: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    camelcase: 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react-native/no-unused-styles': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': [
      'error',
      {
        ts: 'never',
        tsx: 'never',
        json: 'always',
      },
    ],
    'no-use-before-define': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: [
    'react',
    'prettier',
    '@typescript-eslint',
    'react-native',
    'react-hooks',
  ],
};
