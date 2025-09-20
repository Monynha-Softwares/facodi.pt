module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'plugin:import/recommended', 'prettier'],
  plugins: ['unused-imports'],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
    ],
    'no-console': ['warn', { allow: ['error', 'warn'] }]
  }
}
