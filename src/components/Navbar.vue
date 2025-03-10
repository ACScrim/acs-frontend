<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\Navbar.vue -->
<template>
  <nav class="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link
        to="/"
        class="text-white text-2xl font-bold hover:text-neonPink"
      >
        ACS
      </router-link>
      <div>
        <router-link to="/" class="text-white text-lg hover:text-neonPink">
          Home
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.hover\:text-neonPink:hover {
  color: #ff00ff;
}
</style>
