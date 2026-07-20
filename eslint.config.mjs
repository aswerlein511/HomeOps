import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";

export default [
    {
        ignores: [
            "**/dist/**",
            "**/coverage/**",
            "**/node_modules/**",
            "**/playwright-report/**",
            "**/test-results/**",
            "**/.husky/**",
        ],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    /*********************************************************************
     * React Application (apps/web)
     *********************************************************************/
    {
        files: ["apps/web/src/**/*.{ts,tsx}"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

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
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "unused-imports": unusedImports,
        },

        rules: {
            ...reactHooks.configs.recommended.rules,

            "react-refresh/only-export-components": [
                "warn",
                {
                    allowConstantExport: true,
                },
            ],

            "unused-imports/no-unused-imports": "error",

            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],

            "prefer-const": "error",
            "no-var": "error",

            "no-console": [
                "warn",
                {
                    allow: ["warn", "error"],
                },
            ],

            "no-debugger": "error",
            "no-duplicate-imports": "error",

            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "react-hooks/set-state-in-effect": "off",
        },
    },

    /*********************************************************************
     * API (apps/api)
     *********************************************************************/
    {
        files: ["apps/api/src/**/*.ts"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

            globals: {
                ...globals.node,
            },
        },

        plugins: {
            "unused-imports": unusedImports,
        },

        rules: {
            "unused-imports/no-unused-imports": "error",

            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],

            "prefer-const": "error",
            "no-var": "error",

            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },

    /*********************************************************************
     * Shared Package
     *********************************************************************/
    {
        files: ["packages/shared/src/**/*.ts"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

            globals: {
                ...globals.node,
            },
        },

        plugins: {
            "unused-imports": unusedImports,
        },

        rules: {
            "unused-imports/no-unused-imports": "error",

            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],

            "prefer-const": "error",
            "no-var": "error",

            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },

    /*********************************************************************
     * Tests
     *********************************************************************/
    {
        files: [
            "**/tests/**/*.{ts,tsx}",
            "**/*.test.{ts,tsx}",
            "**/*.spec.{ts,tsx}",
        ],

        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
        },
    },

    prettier,
];
