<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Home.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="flex flex-col items-center justify-center w-full max-w-4xl">
      <div class="glitch-container">
        <h1 class="neon-text mt-4">Bienvenue sur</h1>
      </div>

      <div class="logo-container">
        <img src="../assets/logo.svg" class="logo" alt="Logo" />
      </div>

      <button
        v-if="!user"
        @click="loginWithDiscord"
        class="neon-button-discord mt-8"
      >
        <img
          src="../assets/discord-Logo.png"
          alt="Discord Logo"
          class="h-6 w-6 mr-2"
        />
        Connexion via Discord
      </button>

      <div v-else class="welcome-badge mt-8">
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
import { onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const user = computed(() => userStore.user);

const loginWithDiscord = () => {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;
  window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=identify+email`;
};

onMounted(() => {
  userStore.fetchUser();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

/* Style principal */
.neon-text {
  font-size: 48px;
  font-family: "Audiowide", cursive;
  color: white;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 20px #ff00ff,
    0 0 20px #ff00ff, 0 0 20px #ff00ff;
  letter-spacing: 2px;
}

/* Effet de glitch */
.glitch-container {
  position: relative;
  overflow: hidden;
  padding: 0 10px;
}

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

/* Style du logo */
.logo-container {
  position: relative;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 12em;
  will-change: filter;
  transition: all 0.5s ease;
  filter: drop-shadow(0 0 8px rgba(255, 0, 255, 0.7));
  z-index: 2;
  animation: float 6s ease-in-out infinite;
}

.logo:hover {
  filter: drop-shadow(0 0 15px rgba(255, 0, 255, 1))
    drop-shadow(0 0 30px rgba(255, 0, 255, 0.7));
  transform: scale(1.05) rotate(2deg);
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Bouton Discord */
.neon-button-discord {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  background: linear-gradient(45deg, #a32a8f, #c50f89);
  color: white;
  border: 2px solid #972a8e;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(87, 101, 242, 0.7),
    inset 0 0 10px rgba(87, 101, 242, 0.5);
  font-family: "Orbitron", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.neon-button-discord::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: all 0.6s ease;
  z-index: -1;
}

.neon-button-discord:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(87, 101, 242, 0.9),
    inset 0 0 15px rgba(87, 101, 242, 0.5);
}

.neon-button-discord:hover::before {
  left: 100%;
}

.neon-button-discord:active {
  transform: translateY(-2px);
}

/* Badge de bienvenue */
.welcome-badge {
  display: flex;
  align-items: center;
  padding: 0.75rem 2rem;
  background: linear-gradient(45deg, #06b6d4, #22d3ee);
  color: white;
  border: 2px solid #06b6d4;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.7),
    inset 0 0 10px rgba(6, 182, 212, 0.5);
  font-family: "Orbitron", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.7),
      inset 0 0 10px rgba(6, 182, 212, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.9),
      inset 0 0 15px rgba(6, 182, 212, 0.7);
  }
  100% {
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.7),
      inset 0 0 10px rgba(6, 182, 212, 0.5);
  }
}

/* Grille rétro en arrière-plan */
.grid-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
}

.neon-grid-horizontal {
  position: absolute;
  height: 1px;
  width: 150%;
  background: rgba(236, 72, 153, 0.2);
  top: 33%;
  left: -25%;
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
  transform: perspective(100px) rotateX(60deg);
}

.neon-grid-horizontal:nth-child(2) {
  top: 50%;
  background: rgba(6, 182, 212, 0.2);
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

.neon-grid-horizontal:nth-child(3) {
  top: 67%;
  background: rgba(139, 92, 246, 0.2);
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
}

.neon-grid-vertical {
  position: absolute;
  width: 1px;
  height: 150%;
  background: rgba(236, 72, 153, 0.2);
  top: -25%;
  left: 33%;
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
  transform: perspective(100px) rotateY(60deg);
}

.neon-grid-vertical:nth-child(5) {
  left: 50%;
  background: rgba(6, 182, 212, 0.2);
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

.neon-grid-vertical:nth-child(6) {
  left: 67%;
  background: rgba(139, 92, 246, 0.2);
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
}
</style>
