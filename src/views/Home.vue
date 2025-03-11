<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Home.vue -->
<template>
  <div
    class="flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-4"
  >
    <img
      src="../assets/logo.png"
      class="logo transition-transform duration-300 transform hover:scale-110"
      alt="Logo"
    />
    <h1 class="text-4xl text-pink-500 mt-4">Bienvenue sur ACS</h1>
    <router-link
      to="/login"
      class="mt-4 px-4 py-2 bg-pink-500 text-white rounded flex items-center"
    >
      <img
        src="../assets/discord-Logo.png"
        alt="Discord Logo"
        class="h-6 w-10 mr-3"
      />
      Connexion via Discord
    </router-link>
    <div class="mt-8 w-full max-w-4xl">
      <iframe
        class="w-full h-64 sm:h-80 md:h-96 lg:h-[500px]"
        src="https://www.youtube.com/embed/7ubXewQv_Vk"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 10em; /* Réduire la taille du logo */
  margin-top: 1em; /* Réduire l'espace au-dessus du logo */
  padding: 0.5em; /* Ajuster le padding */
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

h1 {
  margin-top: 0.5em; /* Réduire l'espace au-dessus du titre */
}

.router-link {
  margin-top: 1em; /* Ajuster l'espace au-dessus du bouton de connexion */
}

.iframe-container {
  margin-top: 2em; /* Ajuster l'espace au-dessus de la vidéo */
}
</style>
