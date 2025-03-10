<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Login.vue -->
<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
  >
    <h1 class="text-4xl text-pink-500">Connexion</h1>
    <button class="mt-4 px-4 py-2 bg-pink-500 text-white rounded">
      Se connecter avec Discord (à venir)
    </button>
  </div>
</template>

<script setup lang="ts">
const loginWithDiscord = () => {
  window.location.href = "http://localhost:5000/api/auth/discord";
};
</script>

<style scoped></style>
