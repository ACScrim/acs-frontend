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
      <router-link
        to="/"
        class="text-white text-2xl font-bold hover:text-neonPink"
      >
        ACS
      </router-link>
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

        <div
          v-if="menuOpen"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
        >
          <button @click="logout" class="menu-button">Déconnexion</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const menuOpen = ref(false);
const router = useRouter();

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const logout = async () => {
  await userStore.logout();
  menuOpen.value = false;
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
