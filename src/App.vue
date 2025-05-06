<script setup lang="ts">
import { computed } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { useSettingsStore } from "./stores/settingsStore";

const settingsStore = useSettingsStore();
const isLightMode = computed(() => settingsStore.isLightMode);
</script>

<template>
  <div
    class="relative min-h-screen overflow-x-hidden overflow-y-auto scroll-smooth flex flex-col"
  >
    <!-- Vidéo de fond (uniquement en mode normal) -->
    <video
      v-if="!isLightMode"
      autoplay
      muted
      loop
      class="fixed inset-0 w-full h-full object-cover opacity-100 z-10"
      aria-hidden="true"
      playsinline
      preload="auto"
    >
      <source src="@/assets/background-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Fond statique stylisé (uniquement en mode allégé) -->
    <div
      v-else
      class="fixed inset-0 w-full h-full z-10 light-mode-background"
      aria-hidden="true"
    ></div>

    <div class="relative z-20 flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow pb-safe">
        <router-view></router-view>
      </main>
      <Footer />
    </div>
  </div>
</template>

<style>
/* Ajouter cette classe globale */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0);
}

/* Utilisez cette règle pour vous assurer que le footer n'est pas chevauché */
html {
  scroll-padding-bottom: 150px; /* Ajustez cette valeur à la hauteur de votre footer */
}

/* Fond stylisé pour le mode allégé */
.light-mode-background {
  background-color: #0a0a14;
  background-image: radial-gradient(
      circle at 90% 10%,
      rgba(236, 72, 153, 0.07) 0%,
      transparent 35%
    ),
    radial-gradient(
      circle at 10% 90%,
      rgba(139, 92, 246, 0.07) 0%,
      transparent 35%
    ),
    linear-gradient(rgba(20, 20, 40, 0.9) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 20, 40, 0.9) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 35px 35px, 35px 35px;
  background-position: 0 0, 0 0, -0.5px -0.5px, -0.5px -0.5px;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 0%, 0% 0%, -0.5px -0.5px, -0.5px -0.5px;
  }
  50% {
    background-position: 100% 0%, 0% 100%, -0.5px -0.5px, -0.5px -0.5px;
  }
  100% {
    background-position: 0% 0%, 0% 0%, -0.5px -0.5px, -0.5px -0.5px;
  }
}
</style>
