import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
const root = resolve(__dirname, 'src');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://bioinfo.usu.edu/myDockDB",

});

