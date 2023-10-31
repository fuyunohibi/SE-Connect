import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"; // NOTE: For alias: absolute path

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // This line is especially important
    },
  },
});
