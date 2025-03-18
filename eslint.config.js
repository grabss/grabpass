import prettier from 'eslint-config-prettier'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist/**'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier
    },
    rules: {
      ...ts.configs.recommended.rules,
      ...prettier.rules,
      '@typescript-eslint/no-unused-vars': ['error']
    }
  }
]
