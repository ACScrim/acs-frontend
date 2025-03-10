<!-- filepath: d:\Dev\ACS\acs-frontend\src\App.vue -->
<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
  >
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
