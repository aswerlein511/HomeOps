/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    test: {
        globals: true,

        environment: 'jsdom',

        setupFiles: './tests/setupTests.ts',

        css: true,

        coverage: {
            provider: 'v8',

            reporter: ['text', 'html', 'lcov'],

            reportsDirectory: './coverage',

            include: ['src/**/*.{ts,tsx}'],

            exclude: [
                'src/main.tsx',
                'src/vite-env.d.ts',
                'src/**/*.d.ts',
                'src/**/index.ts',
                'node_modules',
                'coverage',
                'dist',
                '**/*.d.ts',
                '**/types.ts',
                '**/variants.ts',
                '**/sizes.ts',
            ],

            thresholds: {
                statements: 80,
                branches: 75,
                functions: 80,
                lines: 80,
            },
        },
    },
});
