/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],

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
                'coverage/**',
                'dist/**',
                'node_modules/**',
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
