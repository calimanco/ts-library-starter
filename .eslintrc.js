module.exports = {
  extends: ['standard', 'plugin:prettier/recommended', 'prettier/standard'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['standard-with-typescript', 'prettier/@typescript-eslint'],
      parserOptions: {
        project: ['./tsconfig.eslint.json']
      }
    },
    {
      files: ['*.spec.ts', '*.test.ts'],
      rules: {
        // You can customize the rules here.
        // Test documents can be less strict.
      }
    },
    {
      files: ['*.md'],
      plugins: ['markdown']
    }
  ]
}
