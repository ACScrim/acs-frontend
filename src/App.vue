<template>
  <div
    class="relative min-h-screen overflow-x-hidden overflow-y-auto scroll-smooth flex flex-col"
  >
    <!-- Fond dynamique pour le mode normal (non allégé) -->
    <div
      v-if="isLightMode"
      class="fixed inset-0 w-full h-full z-10"
      aria-hidden="true"
    >
      <!-- Couches d'étoiles -->
      <div class="stars-layer stars-small"></div>
      <div class="stars-layer stars-medium"></div>
      <div class="stars-layer stars-large"></div>

      <!-- Nébuleuses -->
      <div class="nebula-layer">
        <div class="nebula-purple"></div>
        <div class="nebula-blue"></div>
      </div>

      <!-- Planètes -->
      <div class="planet-jupiter"></div>
      <div class="planet-rings"></div>
      <div class="planet-saturn"></div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
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

/* Animations */
@keyframes stars-move-small {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 200%;
  }
}

@keyframes stars-move-medium {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 200%;
  }
}

@keyframes stars-move-large {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 200%;
  }
}

@keyframes nebula-drift {
  0% {
    transform: translate(-5%, -5%);
  }
  100% {
    transform: translate(5%, 5%);
  }
}

@keyframes planet-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
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
}
</style>
