<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Home.vue -->
<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
  >
    <img
      src="../assets/logo.png"
      class="h-85 p-6 transition-transform duration-300 transform hover:scale-110"
      alt="Logo"
    />
    <h1 class="text-4xl text-pink-500">Bienvenue sur ACS</h1>
    <router-link
      to="/login"
      class="mt-4 px-4 py-2 bg-pink-500 text-white rounded"
      >Connexion via Discord</router-link
    >
  </div>
</template>

<style scoped>
.logo {
  height: 23em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
