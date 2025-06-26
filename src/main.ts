import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import router from "./router";
import "./assets/space-theme.css"; // Remplacer le CSS principal
import SpaceUI from "./plugins/space-ui"; // Plugin pour les composants UI spatiaux

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

app.use(pinia);
app.use(router);
app.use(head);
app.use(SpaceUI); // Enregistrer les composants UI spatiaux

app.mount("#app");

// Enregistrement du Service Worker pour les notifications PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      console.log("Service Worker enregistré avec succès:", registration);

      // Vérifier les mises à jour du service worker de manière moins agressive
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("Nouvelle version du Service Worker disponible");
              // Ne pas forcer la notification ici, laisser PWAInstallPrompt gérer
            }
          });
        }
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du Service Worker:",
        error
      );
    }
  });
}

// Configuration de sécurité
head.addHeadObjs({
  meta: [
    {
      name: "Content-Security-Policy",
      content: "default-src 'self'; frame-ancestors 'none';",
    },
    { name: "X-Frame-Options", content: "DENY" },
    { name: "X-Content-Type-Options", content: "nosniff" },
  ],
});
