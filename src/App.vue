<template>
  <div
    class="relative min-h-screen overflow-x-hidden overflow-y-auto scroll-smooth flex flex-col"
  >
    <!-- Fond dynamique pour le mode allégé avec étoiles fixes -->
    <div
      v-if="isLightMode"
      class="absolute inset-0 w-full h-full z-10"
      aria-hidden="true"
    >
      <!-- Étoiles fixes statiques -->
      <div class="stars-layer stars-static-small"></div>
      <div class="stars-layer stars-static-medium"></div>
      <div class="stars-layer stars-static-large"></div>

      <!-- Planète améliorée -->
      <div class="planet-jupiter-static"></div>
    </div>

    <!-- Fond vidéo pour le mode allégé -->
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
        <source src="https://acscrim.fr/videos/space.mp4" type="video/mp4" />
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

/* Couche d'étoiles pour le mode allégé */
.stars-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
}

/* Styles pour le mode allégé - Étoiles fixes */
.stars-static-small {
  background-image: radial-gradient(
      1px 1px at 15% 20%,
      #ffffff 100%,
      transparent
    ),
    radial-gradient(1px 1px at 25% 60%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 35% 35%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 45% 80%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 55% 10%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 65% 50%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 75% 25%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 85% 70%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 95% 40%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 8% 85%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 18% 5%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 28% 45%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 38% 90%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 48% 15%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 58% 75%, #ffffff 100%, transparent);
  background-size: 100% 100%;
  opacity: 0.8;
}

.stars-static-medium {
  background-image: radial-gradient(
      1.5px 1.5px at 20% 30%,
      #ffffff 100%,
      transparent
    ),
    radial-gradient(1.5px 1.5px at 30% 70%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 40% 15%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 50% 85%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 60% 40%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 70% 60%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 80% 25%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 90% 80%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 10% 50%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 22% 95%, #ffffff 100%, transparent);
  background-size: 100% 100%;
  opacity: 0.9;
}

.stars-static-large {
  background-image: radial-gradient(
      2px 2px at 12% 25%,
      #ffffff 100%,
      transparent
    ),
    radial-gradient(2px 2px at 35% 65%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 52% 18%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 68% 75%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 82% 35%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 15% 85%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 45% 55%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 75% 12%, #ffffff 100%, transparent);
  background-size: 100% 100%;
  opacity: 1;
}

/* Planètes statiques pour le mode allégé */
.planet-jupiter-static {
  position: absolute;
  top: 15%;
  right: 12%;
  width: 120px;
  height: 120px;
  background-image: linear-gradient(to bottom right, #f97316, #e11d48, #7e22ce);
  border-radius: 50%;
  box-shadow: 0 0 25px rgba(249, 115, 22, 0.4),
    inset 0 0 35px rgba(17, 24, 39, 0.7);
  z-index: 3;
  opacity: 0.85;
}

@media (max-width: 768px) {
  .planet-jupiter-static {
    width: 80px;
    height: 80px;
    right: 8%;
    top: 12%;
  }
}
</style>
