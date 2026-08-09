import { defineConfig } from 'vite';
export default defineConfig({ base: '/miden-private-bank/', build: { target: 'esnext' }, optimizeDeps: { exclude: ['@miden-sdk/miden-sdk'] } });