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
