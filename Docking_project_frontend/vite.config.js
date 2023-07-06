import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://bioinfo.usu.edu/myDockDB/",
  hmr: {
    host: "bioinfo.usu.edu",
    protocol: "wss",
    clientPort: 443,
  },
});
