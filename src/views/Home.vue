<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Home.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="flex flex-col items-center justify-center w-full max-w-4xl">
      <h1 class="neon-text mt-4">Bienvenue sur</h1>
      <img
        src="../assets/logo.png"
        class="logo transition-transform duration-300 transform"
        alt="Logo"
      />
      <button
        v-if="!user"
        @click="loginWithDiscord"
        class="button-login mt-4 px-4 py-2 bg-pink-500 text-white rounded flex items-center cursor-pointer"
      >
        <img
          src="../assets/discord-Logo.png"
          alt="Discord Logo"
          class="h-7 w-12 mr-2"
        />
        Connexion via Discord
      </button>
      <div
        v-else
        class="mt-4 px-4 py-2 bg-pink-500 button-login text-white rounded flex items-center"
      >
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
.logo {
  height: 11em; /* Réduire la taille du logo */
  margin-top: 1em; /* Réduire l'espace au-dessus du logo */
  will-change: filter;
  transition: filter 300ms;
  box-shadow: 0px 2px 12px black;
}
.logo:hover {
  filter: drop-shadow(0 0 2em violet);
}

.neon-text {
  font-size: 40px;
  font-family: "Streamster", cursive;
  color: white;
  text-shadow: 0 0 10px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff,
    0 0 40px #ff00ff, 0 0 80px #ff00ff;
  transition: transform 0.3s ease-in-out, text-shadow 0.3s ease-in-out;
}

.neon-text:hover {
  text-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff,
    0 0 50px #ff00ff, 0 0 60px #ff00ff;
}

.button-login {
  border: 0.5px solid rgb(246, 246, 246);
  box-shadow: -2px 2px 8px black;
}
</style>
