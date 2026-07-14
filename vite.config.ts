import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
    plugins: [react()],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@test': path.resolve(__dirname, 'tests'),
        },
    },

    server: {
        port: 5173,
        open: true,
    },

    preview: {
        port: 4173,
    },
});
