<template>
  <div
    class="relative min-h-screen overflow-x-hidden overflow-y-auto scroll-smooth flex flex-col"
  >
    <!-- Fond désert Far West (léger) -->
    <div
      v-if="isLightMode"
      class="absolute inset-0 w-full h-full z-10 desert-background"
      aria-hidden="true"
    >
      <!-- Dunes/Grain overlay -->
      <div class="desert-grain-layer"></div>
      <div class="cactus-silhouette"></div>
    </div>

    <!-- Fond vidéo coucher de soleil Far West (mode non léger) -->
    <div
      v-else
      class="absolute inset-0 w-full h-full z-10 video-background"
      aria-hidden="true"
    >
      <video
        v-if="!isLightMode"
        autoplay
        muted
        loop
        class="absolute inset-0 w-full h-full object-cover opacity-100 z-10"
        aria-hidden="true"
        playsinline
        preload="auto"
      >
        <source
          src="https://storage.googleapis.com/gh-copilot-assets/wildwest-sunset-loop.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <!-- Overlay pour ajuster la luminosité/contraste si nécessaire -->
      <div class="video-background__overlay"></div>
    </div>
    <div class="relative z-20 flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow pb-safe">
        <router-view></router-view>
      </main>
      <Footer />

      <!-- Composants PWA -->
      <PWAInstallPrompt />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import PWAInstallPrompt from "./components/PWAInstallPrompt.vue";
import { useSettingsStore } from "./stores/settingsStore";

const settingsStore = useSettingsStore();
const isLightMode = computed(() => settingsStore.isLightMode);
</script>

<style>
/* Ajouter cette classe globale */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0);
}

/* Utilisez cette règle pour vous assurer que le footer n'est pas chevauché */
html {
  scroll-padding-bottom: 150px; /* Ajustez cette valeur à la hauteur de votre footer */
}

/* Styles pour la vidéo de fond */
.video-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video-background__media {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
}

.video-background__overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    3,
    7,
    18,
    0.2
  ); /* Overlay subtil pour ajuster contraste/luminosité */
}

/* Fond désert (light mode) */
.desert-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(
      180deg,
      rgba(210, 159, 54, 0.15),
      rgba(26, 19, 12, 0.5) 50%,
      rgba(14, 10, 6, 0.9)
    ),
    url("https://storage.googleapis.com/gh-copilot-assets/desert-dunes.jpg");
  background-size: cover;
  background-position: center bottom;
  filter: saturate(0.9) contrast(1.05);
}

.desert-grain-layer {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.03),
    rgba(0, 0, 0, 0) 40%
  );
  opacity: 0.6;
}

.cactus-silhouette {
  position: absolute;
  bottom: 8%;
  left: 6%;
  width: 140px;
  height: 180px;
  background: radial-gradient(
    80% 100% at 50% 100%,
    rgba(0, 0, 0, 0.35),
    transparent 70%
  );
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 160"><path fill="%23000" d="M57 0h14v160H57zM22 50c0-8 6-14 14-14s14 6 14 14v20H36v-20H22zm56 0c0-8 6-14 14-14s14 6 14 14v20H92v-20H78z"/></svg>')
    center / contain no-repeat;
  opacity: 0.25;
}
</style>
