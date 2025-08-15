import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    envPrefix: "VITE_",

    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },

    server: {
      port: 3000,
      open: true,
      host: true,
      cors: true,
      strictPort: false,
      watch: {
        usePolling: false,
      },
    },

    preview: {
      port: 4173,
      open: true,
      host: true,
      cors: true,
      strictPort: false,
    },

    build: {
      target: "esnext",
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: true,
      minify: "esbuild",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },

    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "framer-motion"],
    },

    esbuild: {
      target: "esnext",
      platform: "browser",
      format: "esm",
    },
  };
});
