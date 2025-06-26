<template>
  <div
    class="relative min-h-screen overflow-x-hidden overflow-y-auto scroll-smooth flex flex-col"
  >
    <!-- Fond dynamique pour le mode normal (non allégé) - Optimisé -->
    <div
      v-if="isLightMode"
      class="fixed inset-0 w-full h-full z-10"
      aria-hidden="true"
    >
      <!-- Seulement les éléments essentiels pour réduire le lag -->
      <div class="stars-layer stars-small"></div>
      <div class="stars-layer stars-medium"></div>

      <!-- Nébuleuses simplifiées -->
      <div class="nebula-layer">
        <div class="nebula-purple"></div>
      </div>

      <!-- Moins de planètes -->
      <div class="planet-jupiter"></div>
      <div class="planet-rings"></div>
    </div>

    <!-- Fond vidéo pour le mode allégé -->
    <div
      v-else
      class="fixed inset-0 w-full h-full z-10 video-background"
      aria-hidden="true"
    >
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
        <source src="@/assets/space.mp4" type="video/mp4" />
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
import { computed, onMounted, watch } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import PWAInstallPrompt from "./components/PWAInstallPrompt.vue";
import { useSettingsStore } from "./stores/settingsStore";

const settingsStore = useSettingsStore();
const isLightMode = computed(() => settingsStore.isLightMode);

// Gestion de la vidéo en arrière-plan
onMounted(() => {
  const video = document.getElementById("background-video") as HTMLVideoElement;

  if (video) {
    // S'assurer que la vidéo est prête à jouer
    video.addEventListener("loadeddata", () => {
      // Si nous sommes en mode allégé, démarrer la lecture
      if (isLightMode.value) {
        video
          .play()
          .catch((err) => console.error("Impossible de lire la vidéo:", err));
      }
    });

    // S'assurer que la vidéo joue même si elle était mise en pause
    video.addEventListener("pause", () => {
      if (isLightMode.value) {
        video
          .play()
          .catch((err) => console.error("Impossible de lire la vidéo:", err));
      }
    });
  }
});

// Observer les changements de mode pour gérer la vidéo
watch(isLightMode, (newValue) => {
  const video = document.getElementById("background-video") as HTMLVideoElement;

  if (!video) return;

  if (newValue) {
    // Mode allégé - jouer la vidéo
    video
      .play()
      .catch((err) =>
        console.error(
          "Impossible de lire la vidéo après changement de mode:",
          err
        )
      );
  } else {
    // Mode normal - mettre en pause la vidéo pour économiser les ressources
    video.pause();
  }
});
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

/* Couches d'étoiles */
.stars-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
}

.stars-small {
  background-image: radial-gradient(
      1px 1px at 10% 10%,
      #ffffff 100%,
      transparent
    ),
    radial-gradient(1px 1px at 20% 40%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 30% 15%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 40% 50%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 50% 25%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 60% 60%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 70% 35%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 80% 70%, #ffffff 100%, transparent),
    radial-gradient(1px 1px at 90% 45%, #ffffff 100%, transparent);
  background-size: 200% 200%;
  background-position: 0 0;
  animation: stars-move-small 250s infinite linear;
}

.stars-medium {
  background-image: radial-gradient(
      1.5px 1.5px at 15% 15%,
      #ffffff 100%,
      transparent
    ),
    radial-gradient(1.5px 1.5px at 25% 45%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 35% 20%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 45% 55%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 55% 30%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 65% 65%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 75% 40%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 85% 75%, #ffffff 100%, transparent),
    radial-gradient(1.5px 1.5px at 95% 50%, #ffffff 100%, transparent);
  background-size: 200% 200%;
  background-position: 0 0;
  animation: stars-move-medium 180s infinite linear;
}

.stars-large {
  background-image: radial-gradient(2px 2px at 5% 5%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 15% 35%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 25% 10%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 35% 45%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 45% 20%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 55% 55%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 65% 30%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 75% 65%, #ffffff 100%, transparent),
    radial-gradient(2px 2px at 85% 40%, #ffffff 100%, transparent);
  background-size: 200% 200%;
  background-position: 0 0;
  animation: stars-move-large 120s infinite linear;
}

/* Nébuleuses */
.nebula-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0.15;
}

.nebula-purple {
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  background-image: radial-gradient(
    ellipse at 20% 20%,
    rgba(109, 40, 217, 0.5) 0%,
    transparent 60%
  );
  animation: nebula-drift 180s infinite alternate;
}

.nebula-blue {
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  background-image: radial-gradient(
    ellipse at 80% 80%,
    rgba(56, 189, 248, 0.5) 0%,
    transparent 60%
  );
  animation: nebula-drift 160s infinite alternate-reverse;
}

/* Planètes */
.planet-jupiter {
  position: absolute;
  top: 15%;
  right: 10%;
  width: 120px;
  height: 120px;
  background-image: linear-gradient(to bottom right, #f97316, #e11d48, #7e22ce);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.3),
    inset 0 0 30px rgba(17, 24, 39, 0.8);
  z-index: 3;
  animation: planet-float 60s infinite ease-in-out;
}

.planet-rings {
  position: absolute;
  top: 32%;
  right: 3%;
  width: 180px;
  height: 20px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(156, 163, 175, 0.5),
    rgba(156, 163, 175, 0.8),
    rgba(156, 163, 175, 0.5),
    transparent
  );
  transform: rotate(-20deg);
  border-radius: 50%;
  z-index: 2;
  animation: planet-float 60s infinite ease-in-out;
}

.planet-saturn {
  position: absolute;
  bottom: 15%;
  left: 5%;
  width: 80px;
  height: 80px;
  background-image: linear-gradient(to bottom right, #84cc16, #eab308, #a16207);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(234, 179, 8, 0.3),
    inset 0 0 20px rgba(17, 24, 39, 0.8);
  z-index: 3;
  animation: planet-float 40s infinite ease-in-out reverse;
}

/* Nouvelles planètes plus grandes */
.planet-gas-giant {
  position: absolute;
  bottom: 25%;
  right: 20%;
  width: 180px;
  height: 180px;
  background-image: linear-gradient(to bottom right, #3b82f6, #1e40af, #0f172a);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.4),
    inset 0 0 40px rgba(17, 24, 39, 0.9);
  z-index: 2;
  animation: planet-float 80s infinite ease-in-out;
  opacity: 0.7;
}

.planet-ice {
  position: absolute;
  top: 40%;
  left: 15%;
  width: 150px;
  height: 150px;
  background-image: linear-gradient(to bottom right, #67e8f9, #06b6d4, #0e7490);
  border-radius: 50%;
  box-shadow: 0 0 25px rgba(103, 232, 249, 0.3),
    inset 0 0 35px rgba(17, 24, 39, 0.8);
  z-index: 2;
  animation: planet-float 65s infinite ease-in-out reverse;
  opacity: 0.8;
}

/* Astronaute flottant */
.astronaut {
  position: absolute;
  top: 25%;
  left: 25%;
  width: 60px;
  height: 70px;
  background-image: radial-gradient(
      circle at 60% 40%,
      #f1f5f9 40%,
      transparent 41%
    ),
    /* Visière */
      linear-gradient(
        to bottom,
        #e2e8f0 55%,
        #94a3b8 56%,
        #94a3b8 75%,
        #64748b 76%
      ); /* Combinaison */
  background-size: 60% 40%, 100% 100%;
  background-position: center 25%, center;
  background-repeat: no-repeat;
  border-radius: 50% 50% 40% 40%;
  box-shadow: 0 0 15px rgba(226, 232, 240, 0.4),
    inset 0 0 10px rgba(17, 24, 39, 0.6);
  z-index: 4;
  animation: astronaut-float 15s ease-in-out infinite;
}

.astronaut::before {
  content: "";
  position: absolute;
  top: 60%;
  left: -20%;
  width: 35px;
  height: 35px;
  background: #94a3b8;
  border-radius: 50%;
  box-shadow: inset 0 0 10px rgba(17, 24, 39, 0.6);
  z-index: -1;
}

.astronaut::after {
  content: "";
  position: absolute;
  top: 60%;
  right: -20%;
  width: 35px;
  height: 35px;
  background: #94a3b8;
  border-radius: 50%;
  box-shadow: inset 0 0 10px rgba(17, 24, 39, 0.6);
  z-index: -1;
}

/* Animation de l'astronaute */
@keyframes astronaut-float {
  0%,
  100% {
    transform: translateY(0) rotate(5deg);
  }
  25% {
    transform: translateY(15px) rotate(-5deg);
  }
  50% {
    transform: translateY(0) rotate(5deg);
  }
  75% {
    transform: translateY(-15px) rotate(-5deg);
  }
}

/* Fusée */
.rocket {
  position: absolute;
  bottom: 5%;
  right: 15%;
  width: 30px;
  height: 120px;
  z-index: 3;
  transform: rotate(-15deg);
  animation: rocket-launch 20s ease-in-out infinite;
}

.rocket-body {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
  border-radius: 50% 50% 30% 30%;
  box-shadow: 0 0 20px rgba(226, 232, 240, 0.4);
}

.rocket-window {
  position: absolute;
  width: 12px;
  height: 12px;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  background: #38bdf8;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
}

.rocket-engine {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 10px;
  background: #475569;
  border-radius: 0 0 10px 10px;
}

.rocket-flames {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 40px;
  background: linear-gradient(
    to bottom,
    #f97316,
    #fb923c,
    #fdba74,
    transparent
  );
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.8;
  animation: rocket-flames 0.2s ease-in-out infinite alternate;
}

/* Animation de la fusée */
@keyframes rocket-launch {
  0% {
    transform: rotate(-15deg) translateY(100px) scale(0.8);
    opacity: 0;
  }
  10% {
    transform: rotate(-15deg) translateY(0) scale(0.8);
    opacity: 1;
  }
  25%,
  75% {
    transform: rotate(-15deg) translateY(0) scale(1);
  }
  90% {
    transform: rotate(-15deg) translateY(-200px) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: rotate(-15deg) translateY(-300px) scale(0.6);
    opacity: 0;
  }
}

@keyframes rocket-flames {
  0% {
    height: 30px;
    opacity: 0.7;
  }
  100% {
    height: 40px;
    opacity: 0.9;
  }
}

/* Voiture Rocket League */
.rocket-car {
  position: absolute;
  top: 60%;
  left: 65%;
  width: 100px;
  height: 40px;
  z-index: 4;
  transform: rotate(10deg);
  animation: rocket-car-float 12s ease-in-out infinite;
}

.rocket-car-body {
  position: absolute;
  width: 100%;
  height: 55%;
  bottom: 30%;
  background: linear-gradient(to right, #ef4444, #dc2626);
  border-radius: 10px 20px 2px 2px;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
}

.rocket-car-roof {
  position: absolute;
  width: 60%;
  height: 30%;
  top: 0;
  left: 10%;
  background: #1e293b;
  border-radius: 10px 15px 0 0;
  border-top: 2px solid #475569;
}

.rocket-car-window {
  position: absolute;
  width: 30%;
  height: 25%;
  top: 20%;
  left: 25%;
  background: #0ea5e9;
  border-radius: 2px;
  box-shadow: 0 0 5px rgba(14, 165, 233, 0.6);
}

.rocket-car-boost {
  position: absolute;
  width: 30px;
  height: 15px;
  bottom: 35%;
  left: -20px;
  background: linear-gradient(to left, #f97316, #fdba74, transparent);
  border-radius: 50%;
  filter: blur(3px);
  opacity: 0.8;
  animation: rocket-car-boost 0.2s ease-in-out infinite alternate;
}

.rocket-car-wheels {
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 5%;
  left: 15%;
  background: #0f172a;
  border-radius: 50%;
  border: 3px solid #64748b;
  box-shadow: 0 0 5px rgba(100, 116, 139, 0.8);
  animation: rocket-car-wheels 1s linear infinite;
}

.rocket-car-wheels-back {
  left: auto;
  right: 15%;
}

/* Animations pour la voiture Rocket League */
@keyframes rocket-car-float {
  0% {
    transform: rotate(10deg) translateY(0) translateX(0);
  }
  15% {
    transform: rotate(-5deg) translateY(30px) translateX(80px);
  }
  30% {
    transform: rotate(10deg) translateY(-20px) translateX(160px);
  }
  45% {
    transform: rotate(-5deg) translateY(15px) translateX(80px);
  }
  60% {
    transform: rotate(10deg) translateY(-15px) translateX(0);
  }
  75% {
    transform: rotate(-5deg) translateY(20px) translateX(-80px);
  }
  90% {
    transform: rotate(10deg) translateY(-30px) translateX(-40px);
  }
  100% {
    transform: rotate(10deg) translateY(0) translateX(0);
  }
}

@keyframes rocket-car-boost {
  0% {
    width: 25px;
    opacity: 0.6;
  }
  100% {
    width: 35px;
    opacity: 0.8;
  }
}

@keyframes rocket-car-wheels {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .planet-jupiter {
    width: 80px;
    height: 80px;
    right: 5%;
  }

  .planet-rings {
    width: 120px;
    height: 15px;
    right: 2%;
    top: 27%;
  }

  .planet-saturn {
    width: 50px;
    height: 50px;
  }

  /* Ajustements responsive pour les nouvelles planètes */
  .planet-gas-giant {
    width: 100px;
    height: 100px;
    bottom: 20%;
    right: 15%;
  }

  .planet-ice {
    width: 80px;
    height: 80px;
    top: 35%;
    left: 10%;
  }

  .shooting-star {
    width: 100px;
  }

  /* Ajustements responsive pour l'astronaute et la fusée */
  .astronaut {
    width: 40px;
    height: 50px;
    left: 15%;
  }

  .astronaut::before,
  .astronaut::after {
    width: 25px;
    height: 25px;
  }

  .rocket {
    width: 20px;
    height: 80px;
    right: 10%;
  }

  .rocket-window {
    width: 8px;
    height: 8px;
  }

  /* Ajustements responsive pour la voiture Rocket League */
  .rocket-car {
    width: 40px;
    height: 80px;
    right: 5%;
  }

  .rocket-car-body {
    height: 50%;
  }

  .rocket-car-roof {
    height: 30%;
  }

  .rocket-car-window {
    height: 40%;
  }

  .rocket-car-boost {
    height: 8px;
  }

  .rocket-car-wheels {
    width: 8px;
    height: 8px;
  }
}
</style>
