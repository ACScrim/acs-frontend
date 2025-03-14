<template>
  <nav class="p-4 bg-pink-500 fixed top-0 w-full z-10 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <span
          v-if="isAdmin"
          @click="toggleAdminMenu"
          class="text-white text-lg cursor-pointer mr-4 admin-menu"
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
      <div class="hidden md:flex flex-grow justify-center space-x-20">
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
        <router-link
          to="/infos"
          class="text-white text-base font-bold hover:text-neonPink"
        >
          Infos
        </router-link>
      </div>
      <div class="relative user-menu">
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
      <div class="md:hidden mobile-menu">
        <button @click="toggleMobileMenu" class="text-white focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
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
        </button>
        <div
          v-if="mobileMenuOpen"
          class="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-20 transition-all duration-300 transform origin-top"
          :class="{
            'scale-y-100': mobileMenuOpen,
            'scale-y-0': !mobileMenuOpen,
          }"
        >
          <router-link
            to="/classement"
            @click="closeAllMenus"
            class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Classement
          </router-link>
          <router-link
            to="/inscription-tournoi"
            @click="closeAllMenus"
            class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Inscription
          </router-link>
          <router-link
            to="/tournois-a-venir"
            @click="closeAllMenus"
            class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Tournois
          </router-link>
          <router-link
            to="/infos"
            @click="closeAllMenus"
            class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Infos
          </router-link>
        </div>
      </div>
    </div>
    <div
      v-if="adminMenuOpen"
      class="absolute left-0 mt-2 w-82 bg-white rounded-md shadow-lg z-20 admin-menu"
    >
      <router-link
        to="/creation-jeu"
        @click="closeAllMenus"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200 whitespace-nowrap overflow-hidden text-ellipsis"
      >
        Création d'un jeu
      </router-link>
      <router-link
        to="/ajout-joueurs"
        @click="closeAllMenus"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200 whitespace-nowrap overflow-hidden text-ellipsis"
      >
        Ajout de joueurs
      </router-link>
      <router-link
        to="/creation-tournoi"
        @click="closeAllMenus"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200 whitespace-nowrap overflow-hidden text-ellipsis"
      >
        Gestion tournois
      </router-link>
      <router-link
        to="/synchronisation-joueurs"
        @click="closeAllMenus"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200 whitespace-nowrap overflow-hidden text-ellipsis"
      >
        Synchronisation des joueurs
      </router-link>
      <router-link
        v-if="isSuperAdmin"
        to="/gestion-administrations"
        @click="closeAllMenus"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200 whitespace-nowrap overflow-hidden text-ellipsis"
      >
        Gestion des admins
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const isAdmin = computed(
  () =>
    user.value &&
    (user.value.role === "admin" || user.value.role === "superadmin")
);
const isSuperAdmin = computed(
  () => user.value && user.value.role === "superadmin"
);
const menuOpen = ref(false);
const adminMenuOpen = ref(false);
const mobileMenuOpen = ref(false);
const router = useRouter();

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  adminMenuOpen.value = false;
  mobileMenuOpen.value = false;
};

const toggleAdminMenu = () => {
  adminMenuOpen.value = !adminMenuOpen.value;
  menuOpen.value = false;
  mobileMenuOpen.value = false;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  menuOpen.value = false;
  adminMenuOpen.value = false;
};

const logout = async () => {
  await userStore.logout();
  closeAllMenus();
  router.push("/");
};

const closeAllMenus = () => {
  menuOpen.value = false;
  adminMenuOpen.value = false;
  mobileMenuOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (!target.closest(".user-menu")) {
    menuOpen.value = false;
  }

  if (!target.closest(".admin-menu")) {
    adminMenuOpen.value = false;
  }

  if (!target.closest(".mobile-menu")) {
    mobileMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  userStore.fetchUser();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
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
