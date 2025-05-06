import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { useHead } from "@vueuse/head";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");

useHead({
  meta: [
    {
      name: "Content-Security-Policy",
      content: "default-src 'self'; frame-ancestors 'none';",
    },
    { name: "X-Frame-Options", content: "DENY" },
    { name: "X-Content-Type-Options", content: "nosniff" },
  ],
});
