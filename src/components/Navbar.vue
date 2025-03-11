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
        <span v-if="user" class="text-white text-lg">{{ user.username }}</span>
        <router-link
          v-else
          to="/login"
          class="text-white text-lg hover:text-neonPink"
        >
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const user = ref(null);

onMounted(async () => {
  try {
    // Utilisation de la variable d'environnement pour l'URL
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/me`,
      {
        withCredentials: true,
      }
    );
    user.value = response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
});
</script>

<style scoped>
.hover\:text-neonPink:hover {
  color: #ff00ff;
}
</style>
