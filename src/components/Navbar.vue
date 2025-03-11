<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\Navbar.vue -->
<template>
  <nav
    class="p-4 bg-pink-500 fixed top-0 w-full z-10"
    style="
      border: 0.5px solid white;
      border-left-style: none;
      border-right-style: none;
      border-top-style: none;
      box-shadow: -2px 2px 8px black;
    "
  >
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <span
          v-if="isAdmin"
          @click="toggleAdminMenu"
          class="text-white text-lg cursor-pointer mr-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-violet-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </span>
        <router-link
          to="/"
          class="text-white text-xl font-bold hover:text-neonPink"
        >
          ACS
        </router-link>
      </div>
      <div class="flex-grow flex justify-center space-x-20">
        <router-link
          to="/classement"
          class="text-white text-base font-bold hover:text-neonPink"
        >
          Classement
        </router-link>
        <router-link
          to="/inscription-tournoi"
          class="text-white text-base font-bold hover:text-neonPink"
        >
          Inscription
        </router-link>
        <router-link
          to="/tournois-a-venir"
          class="text-white text-base font-bold hover:text-neonPink"
        >
          Tournois
        </router-link>
      </div>
      <div class="relative">
        <span
          v-if="user"
          @click="toggleMenu"
          class="text-white text-lg cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-violet-500"
            fill="#ff00ff"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <router-link
          v-else
          to="/login"
          class="text-white text-base hover:text-neonPink"
        >
          Login
        </router-link>
        <div
          v-if="menuOpen"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
        >
          <button @click="logout" class="menu-button">Déconnexion</button>
        </div>
      </div>
    </div>
    <div
      v-if="adminMenuOpen"
      class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
    >
      <router-link
        to="/creation-jeu"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Création d'un jeu</router-link
      >
      <router-link
        to="/creation-tournoi"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Création d'un tournoi</router-link
      >
      <router-link
        to="/ajout-joueurs"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Ajout de joueurs</router-link
      >
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const isAdmin = computed(() => user.value && user.value.role === "admin");
const menuOpen = ref(false);
const adminMenuOpen = ref(false);
const router = useRouter();

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const toggleAdminMenu = () => {
  adminMenuOpen.value = !adminMenuOpen.value;
};

const logout = async () => {
  await userStore.logout();
  menuOpen.value = false;
  adminMenuOpen.value = false;
  console.log("Logged out");
  router.push("/");
};

onMounted(() => {
  userStore.fetchUser();
});
</script>

<style scoped>
.menu-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: center;
  background-color: #fff;
  color: #333;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.menu-button:hover {
  background-color: #f0f0f0;
  box-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff,
    0 0 40px #ff00ff;
}
</style>
