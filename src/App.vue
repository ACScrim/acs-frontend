<template>
  <div
    class="relative min-h-screen overflow-x-hidden overflow-y-auto scroll-smooth flex flex-col"
  >
    <!-- Fond Halloween pour le mode allégé (sans thème espace) -->
    <div
      v-if="isLightMode"
      class="absolute inset-0 w-full h-full z-10"
      aria-hidden="true"
    >
      <!-- Dégradé sombre avec nuances Halloween -->
      <div class="halloween-layer halloween-gradient"></div>

      <!-- Vignette sombre pour focaliser le contenu -->
      <div class="halloween-layer halloween-vignette"></div>

      <!-- Brumes fantomatiques très subtiles -->
      <div class="halloween-layer halloween-fog fog-back"></div>
      <div class="halloween-layer halloween-fog fog-front"></div>

      <!-- Lueurs thématiques (citrouille / mystique) très légères -->
      <div class="halloween-layer glow-pumpkin"></div>
      <div class="halloween-layer glow-mystic"></div>

      <!-- Petites citrouilles et fantômes volants (subtils) -->
      <div class="halloween-layer flying-spirits" aria-hidden="true">
        <span class="spirit ghost" style="left: 8%; top: 22%">👻</span>
        <span class="spirit ghost" style="left: 72%; top: 12%">👻</span>
        <span class="spirit ghost" style="left: 86%; top: 66%">👻</span>
        <span class="spirit pumpkin" style="left: 18%; top: 76%">🎃</span>
        <span class="spirit pumpkin" style="left: 52%; top: 38%">🎃</span>
        <span class="spirit pumpkin" style="left: 90%; top: 30%">🎃</span>
      </div>
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

/* Couche utilitaire pour les overlays Halloween */
.halloween-layer {
  position: absolute;
  inset: 0;
}

/* Dégradé général sombre légèrement teinté Halloween */
.halloween-gradient {
  background: linear-gradient(
    135deg,
    rgba(15, 15, 15, 0.95) 0%,
    rgba(124, 45, 18, 0.07) 50%,
    rgba(88, 28, 135, 0.07) 100%
  );
}

/* Vignette pour assombrir les bords et focaliser le centre */
.halloween-vignette {
  box-shadow: inset 0 0 160px rgba(0, 0, 0, 0.7),
    inset 0 0 280px rgba(0, 0, 0, 0.35);
  pointer-events: none;
}

/* Brumes fantomatiques (subtiles) */
.halloween-fog {
  background: radial-gradient(
      1000px 600px at 10% 85%,
      rgba(255, 255, 255, 0.04),
      transparent 70%
    ),
    radial-gradient(
      900px 500px at 80% 20%,
      rgba(255, 255, 255, 0.03),
      transparent 70%
    );
  filter: blur(6px);
  opacity: 0.45;
  animation: fog-drift 60s linear infinite;
}

.fog-back {
  opacity: 0.25;
  animation-duration: 90s;
}

.fog-front {
  opacity: 0.35;
  animation-direction: reverse;
}

@keyframes fog-drift {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-2%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Respecte la préférence utilisateur de réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .halloween-fog {
    animation: none;
  }
}

/* Lueurs très légères pour rythme chromatique Halloween */
.glow-pumpkin {
  background: radial-gradient(
    400px 260px at 85% 85%,
    rgba(217, 119, 6, 0.08),
    transparent 70%
  );
  pointer-events: none;
}

.glow-mystic {
  background: radial-gradient(
    360px 220px at 10% 15%,
    rgba(139, 92, 246, 0.07),
    transparent 70%
  );
  pointer-events: none;
}

/* Esprits volants (fantômes et citrouilles) */
.flying-spirits {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.spirit {
  position: absolute;
  display: inline-block;
  font-size: 18px;
  opacity: 0.5;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.15));
  animation: spirit-float 10s ease-in-out infinite;
}

.spirit.ghost {
  animation-duration: 12s;
}

.spirit.pumpkin {
  animation-duration: 14s;
  filter: drop-shadow(0 0 8px rgba(217, 119, 6, 0.15));
}

@keyframes spirit-float {
  0% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-8px) translateX(3px) rotate(-2deg);
  }
  50% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  75% {
    transform: translateY(6px) translateX(-3px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spirit {
    animation: none;
  }
}
</style>
