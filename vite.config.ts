import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    base: "https://devklick.github.io/u-he-skins/",
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      cors: true,
      proxy: {
        "/skins": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
