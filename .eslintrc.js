module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],
  rules: {
    'no-void': ['error', { allowAsStatement: true }]
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['standard-with-typescript', 'prettier'],
      parserOptions: {
        project: ['./tsconfig.eslint.json']
      },
      rules: {
        '@typescript-eslint/prefer-ts-expect-error': 'off'
      }
    },
    {
      files: ['*.spec.ts', '*.test.ts'],
      rules: {}
    },
    {
      files: ['*.md'],
      plugins: ['markdown']
    }
  ]
}
