import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/clueless/', // Replace 'clueless' with your repository name
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        prompts: 'src/lib/config/prompts.ts'
      }
    }
  }
})
