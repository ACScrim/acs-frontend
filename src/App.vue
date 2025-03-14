<!-- filepath: d:\Dev\ACS\acs-frontend\src\App.vue -->
<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="relative min-h-screen flex flex-col">
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 w-full h-full object-cover opacity-100 z-10"
    >
      <source src="@/assets/background-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="relative z-10">
      <Navbar />
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
/* Styles supplémentaires si nécessaire */
</style>
