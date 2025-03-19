<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Home.vue -->
<template>
  <div
    class="relative flex items-center justify-center min-h-screen p-4 overflow-hidden"
  >
    <div
      class="flex flex-col items-center justify-center w-full max-w-4xl z-10"
    >
      <!-- Titre avec effet de glitch -->
      <div class="glitch-container relative overflow-hidden px-2.5">
        <h1 class="text-5xl font-audiowide text-white neon-text mt-4">
          Bienvenue sur
        </h1>
      </div>

      <!-- Logo -->
      <div class="relative my-8 flex items-center justify-center">
        <img
          src="../assets/logo.svg"
          class="h-48 w-auto transition-all duration-500 filter hover:scale-105 hover:rotate-2 animate-float logo-shadow"
          alt="Logo"
        />
      </div>

      <!-- Bouton de connexion Discord -->
      <button
        v-if="!user"
        @click="loginWithDiscord"
        class="flex items-center justify-center mt-8 px-8 py-3 bg-gradient-to-r from-pink-700 to-pink-600 text-white border-2 border-pink-700 rounded shadow-glow-discord font-orbitron text-base font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-discord-hover relative overflow-hidden group"
      >
        <img
          src="../assets/discord-Logo.png"
          alt="Discord Logo"
          class="h-6 w-10 mr-2"
        />
        Connexion via Discord
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine"
        ></div>
      </button>

      <!-- Badge de bienvenue -->
      <div
        v-else
        class="flex items-center mt-8 px-8 py-3 bg-gradient-to-r from-cyan-700 to-cyan-600 text-white border-2 border-cyan-600 rounded shadow-glow-welcome font-orbitron text-base font-semibold tracking-wider animate-pulse-subtle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        Bienvenue, {{ user.username }}!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import type { User } from "../types/User";

const userStore = useUserStore();
const user = computed<User | null>(() => userStore.user);

const isLoading = ref(true);
const isAuthenticating = ref(false);
const error = ref<string | null>(null);

const loginWithDiscord = () => {
  try {
    isAuthenticating.value = true;
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      throw new Error("Configuration Discord manquante");
    }

    window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=identify+email`;
  } catch (err) {
    error.value = "Impossible de se connecter à Discord. Veuillez réessayer.";
    isAuthenticating.value = false;
    console.error("Erreur d'authentification Discord:", err);
  }
};

onMounted(async () => {
  const preloadImages = ["../assets/logo.svg", "../assets/discord-Logo.png"];
  preloadImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
  try {
    await userStore.fetchUser();
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des données utilisateur:",
      err
    );
    error.value = "Impossible de récupérer vos informations.";
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Polices */
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

/* Effet de néon pour le texte */
.neon-text {
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 20px #ff00ff,
    0 0 20px #ff00ff, 0 0 20px #ff00ff;
  letter-spacing: 2px;
}

/* Ombres pour les éléments */
.shadow-glow-pink {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
}

.shadow-glow-cyan {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

.shadow-glow-purple {
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
}

.shadow-glow-discord {
  box-shadow: 0 0 10px rgba(87, 101, 242, 0.7),
    inset 0 0 10px rgba(87, 101, 242, 0.5);
}

.shadow-glow-discord-hover {
  box-shadow: 0 0 20px rgba(87, 101, 242, 0.9),
    inset 0 0 15px rgba(87, 101, 242, 0.5);
}

.shadow-glow-welcome {
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.7),
    inset 0 0 10px rgba(6, 182, 212, 0.5);
}

.logo-shadow {
  filter: drop-shadow(0 0 8px rgba(255, 0, 255, 0.7));
}

.logo-shadow:hover {
  filter: drop-shadow(0 0 15px rgba(255, 0, 255, 1))
    drop-shadow(0 0 30px rgba(255, 0, 255, 0.7));
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes pulse-subtle {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.7),
      inset 0 0 10px rgba(6, 182, 212, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.9),
      inset 0 0 15px rgba(6, 182, 212, 0.7);
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s infinite;
}

@keyframes shine {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

.animate-shine {
  animation: shine 1.5s;
}

/* Effet de glitch */
.glitch-container::before,
.glitch-container::after {
  content: "Bienvenue sur";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0.8;
}

.glitch-container::before {
  color: #0ff;
  z-index: -1;
  left: 3px;
  text-shadow: -2px 0 #ff00ff;
  animation: glitch-animation 3s infinite linear alternate-reverse;
}

.glitch-container::after {
  color: #f0f;
  z-index: -2;
  left: -3px;
  text-shadow: 2px 0 #00ffff;
  animation: glitch-animation 2s infinite linear alternate-reverse;
}

@keyframes glitch-animation {
  0% {
    clip-path: inset(71% 0 10% 0);
    transform: translate(-2px, 2px);
  }
  20% {
    clip-path: inset(29% 0 71% 0);
    transform: translate(1px, -3px);
  }
  40% {
    clip-path: inset(57% 0 25% 0);
    transform: translate(3px, 1px);
  }
  60% {
    clip-path: inset(89% 0 7% 0);
    transform: translate(1px, -2px);
  }
  80% {
    clip-path: inset(23% 0 67% 0);
    transform: translate(-2px, 4px);
  }
  100% {
    clip-path: inset(82% 0 12% 0);
    transform: translate(2px, -4px);
  }
}

/* Transformations 3D pour la grille */
.perspective {
  perspective: 100px;
}

.rotate-x-60 {
  transform: rotateX(60deg);
}

.rotate-y-60 {
  transform: rotateY(60deg);
}
</style>
