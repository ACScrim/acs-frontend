<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Login.vue -->
<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
  >
    <h1 class="text-4xl text-pink-500">Connexion</h1>
    <button
      @click="loginWithDiscord"
      class="mt-4 px-4 py-2 bg-pink-500 text-white rounded"
    >
      Se connecter avec Discord
    </button>
  </div>
</template>

<script setup lang="ts">
const loginWithDiscord = () => {
  window.location.href =
    "https://discord.com/oauth2/authorize?client_id=1348782782934945974&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fdiscord%2Fcallback&scope=identify+email";
};
</script>

<style scoped></style>
