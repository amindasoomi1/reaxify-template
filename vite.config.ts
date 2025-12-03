import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
// import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // eslint-disable-next-line
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    // mkcert(),
    svgr(),
    checker({
      typescript: true,
      // eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' }, // Optional
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["apple-touch-icon.png", "favicon.ico"],
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style" ||
              request.destination === "image" ||
              request.destination === "font",
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: { maxAgeSeconds: 604800 },
            },
          },
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
              expiration: { maxAgeSeconds: 604800 },
            },
          },
        ],
      },
      manifest: {
        name: "Reaxify Template",
        short_name: "Reaxify",
        description: "Vite + React-19 + TS + Tailwind-4",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "./192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
