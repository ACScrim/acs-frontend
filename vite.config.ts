import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,mp4}"],
        // Exclure les routes d'authentification du cache
        navigateFallbackDenylist: [
          /^\/api\//,           // Toutes les routes API
          /\/auth\//,           // Routes d'authentification
          /\/discord\/callback/ // Callback Discord spécifiquement
        ],
        // Exclure du précaching
        globIgnores: [
          "**/api/**",
          "**/auth/**"
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/acscrim\.fr\/api\/.*/,
            handler: "NetworkOnly", // Jamais de cache pour l'API
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
              },
            },
          },
        ],
      },
      manifest: {
        name: "ACS Gaming Community",
        short_name: "ACS Gaming",
        description:
          "Application de gestion de tournois gaming pour la communauté ACS",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/Logo_ACS.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/Logo_ACS.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Tournois à venir",
            short_name: "Tournois",
            description: "Voir les prochains tournois",
            url: "/tournois-a-venir",
            icons: [{ src: "/Logo_ACS.png", sizes: "96x96" }],
          },
          {
            name: "Classement",
            short_name: "Classement",
            description: "Voir le classement actuel",
            url: "/classement",
            icons: [{ src: "/Logo_ACS.png", sizes: "96x96" }],
          },
        ],
        categories: ["games", "sports", "entertainment"],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
