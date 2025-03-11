<!-- filepath: d:\Dev\ACS\acs-frontend\src\App.vue -->
<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
    style="
      background: linear-gradient(
        #0d0221 0%,
        #45125e 40%,
        #a22561 80%,
        #ff3864 100%
      );
    "
  >
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
