import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Use UI package source directly in dev mode for hot reload
      "@repo/ui": path.resolve(__dirname, "../../packages/ui/src/"),
    },
  },
  server: {
    port: 5100,
  },
});
