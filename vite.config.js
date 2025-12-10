import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "node:fs";
import path from "node:path";
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "ssl/localhost.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "ssl/localhost.crt")),
    },
    port: 5173,
    host: true
  }
})
