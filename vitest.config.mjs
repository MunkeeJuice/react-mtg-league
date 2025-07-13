import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.js',
        // You can add more configuration options here
        include: ['**/*.{test,spec}.{js,jsx}'],
        exclude: ['node_modules', 'dist', '.idea', '.git', '.cache']
    },
});