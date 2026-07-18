import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: [
            'dist/**',
            'coverage/**',
            'node_modules/**',
            'playwright-report/**',
            'test-results/**',
            '.husky/**',
        ],
    },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    /*********************************************************************
     * Application Source
     *********************************************************************/
    {
        files: ['src/**/*.{ts,tsx}'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',

            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'unused-imports': unusedImports,
        },

        rules: {
            /*****************************************************************
             * React
             *****************************************************************/

            ...reactHooks.configs.recommended.rules,

            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],

            /*****************************************************************
             * Imports
             *****************************************************************/

            'unused-imports/no-unused-imports': 'error',

            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],

            /*****************************************************************
             * TypeScript / JavaScript
             *****************************************************************/

            'prefer-const': 'error',

            'no-var': 'error',

            'no-console': [
                'warn',
                {
                    allow: ['warn', 'error'],
                },
            ],

            'no-debugger': 'error',

            'no-duplicate-imports': 'error',

            /*****************************************************************
             * Phase 0
             *****************************************************************/

            '@typescript-eslint/no-explicit-any': 'off',

            '@typescript-eslint/explicit-function-return-type': 'off',

            '@typescript-eslint/explicit-module-boundary-types': 'off',

            '@typescript-eslint/no-unused-vars': 'off',
        },
    },

    /*********************************************************************
     * Test Files
     *********************************************************************/
    {
        files: ['tests/**/*.{ts,tsx}'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',

            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'unused-imports': unusedImports,
        },

        rules: {
            ...reactHooks.configs.recommended.rules,

            /*****************************************************************
             * React Refresh
             *****************************************************************/

            'react-refresh/only-export-components': 'off',

            /*****************************************************************
             * Imports
             *****************************************************************/

            'unused-imports/no-unused-imports': 'error',

            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],

            /*****************************************************************
             * Testing Convenience
             *****************************************************************/

            '@typescript-eslint/no-explicit-any': 'off',

            '@typescript-eslint/no-unused-vars': 'off',

            '@typescript-eslint/no-non-null-assertion': 'off',

            '@typescript-eslint/explicit-function-return-type': 'off',

            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
    },

    prettier,
];
