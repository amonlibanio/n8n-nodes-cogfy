import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import n8nNodesBase from 'eslint-plugin-n8n-nodes-base';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.js'],
    ignores: ['build-utils.js', 'eslint.config.js', 'index.js'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
        extraFileExtensions: ['.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'n8n-nodes-base': n8nNodesBase,
    },
    rules: {
      ...typescript.configs.recommended.rules,
    },
  },
  {
    files: ['build-utils.js'],
    languageOptions: {
      parser: js,
      sourceType: 'module',
    },
  },
  {
    files: ['index.js'],
    languageOptions: {
      parser: js,
      sourceType: 'script',
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
      },
    },
  },
  {
    files: ['./credentials/**/*.ts'],
    plugins: {
      'n8n-nodes-base': n8nNodesBase,
    },
    rules: {
      'n8n-nodes-base/cred-class-field-documentation-url-missing': 'off',
      'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
    },
  },
  {
    files: ['./nodes/**/*.ts'],
    plugins: {
      'n8n-nodes-base': n8nNodesBase,
    },
    rules: {
      'n8n-nodes-base/node-execute-block-missing-continue-on-fail': 'off',
      'n8n-nodes-base/node-filename-against-convention': 'off',
      'n8n-nodes-base/node-resource-description-filename-against-convention': 'off',
      'n8n-nodes-base/node-param-fixed-collection-type-unsorted-items': 'off',
      'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',
      'n8n-nodes-base/node-param-resource-with-plural-option': 'off',
    },
  },
];
