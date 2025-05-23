import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // eslint-disable-next-line
      // @ts-expect-error
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: true,
      // eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' }, // Optional
    }),
  ],
});
