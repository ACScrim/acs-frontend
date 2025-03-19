<!-- filepath: d:\Dev\ACS\acs-frontend\src\App.vue -->
<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="relative min-h-screen overflow-x-hidden scroll-smooth">
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
    <div class="relative z-20">
      <Navbar />
      <main><router-view></router-view></main>
    </div>
  </div>
</template>

<style scoped></style>
