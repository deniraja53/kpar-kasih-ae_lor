import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Konfigurasi ini dioptimalkan untuk Vercel
export default defineConfig({
  plugins: [react()],
  // Baris base dihapus agar jalur file JS/CSS tidak error (404) di Vercel
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
  publicDir: "public",
});
