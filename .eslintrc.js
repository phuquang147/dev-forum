// Follow this: https://andrebnassis.medium.com/setting-eslint-on-a-react-typescript-project-2021-1190a43ffba
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'multiline-ternary': 'off',
    'comma-dangle': 'off',
    semi: ['warn', 'never'],
    'react/no-unescaped-entities': 'warn',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/semi': ['warn', 'never'],
    '@typescript-eslint/quotes': ['warn', 'single'],
    '@typescript-eslint/no-unused-vars': 'warn',
    'eol-last': ['warn', 'always'],
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/indent': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/ban-types': 'off',
    'react/no-unknown-property': 'off',
  },
}
