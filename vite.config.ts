import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [vue()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'$': path.resolve(__dirname, './'),
		},
	},
	server: {
		host: true,
		port: 3000,
		open: false,
		strictPort: false,
		cors: true,
	},
	build: {
		outDir: 'dist',
		target: 'esnext',
		assetsInlineLimit: 4096,
		chunkSizeWarningLimit: 1000,
	},
});
