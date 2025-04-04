<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div
    class="relative min-h-screen overflow-x-hidden overflow-y-auto scroll-smooth flex flex-col"
  >
    <video
      autoplay
      muted
      loop
      class="fixed inset-0 w-full h-full object-cover opacity-100 z-10"
      aria-hidden="true"
      playsinline
      preload="auto"
    >
      <source src="@/assets/background-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="relative z-20 flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow pb-safe">
        <router-view></router-view>
      </main>
      <Footer />
    </div>
  </div>
</template>

<style>
/* Ajouter cette classe globale */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0);
}

/* Utilisez cette règle pour vous assurer que le footer n'est pas chevauché */
html {
  scroll-padding-bottom: 150px; /* Ajustez cette valeur à la hauteur de votre footer */
}
</style>
