<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\Navbar.vue -->
<template>
  <nav class="navbar-bg fixed top-0 w-full z-50">
    <!-- Effet de lueur néon en haut -->
    <div class="neon-line-top"></div>

    <div class="container mx-auto flex justify-between items-center py-3 px-4">
      <!-- Section gauche avec logo et menu admin -->
      <div class="flex items-center">
        <span
          v-if="isAdmin"
          @click="toggleAdminMenu"
          class="text-white cursor-pointer mr-4 admin-menu relative group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-pink-400 group-hover:text-cyan-400 transition-colors"
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
          <span class="admin-tooltip">Menu Admin</span>
        </span>

        <router-link to="/" class="logo-link">
          <img src="../assets/Logo_ACS.png" alt="" class="navbar-logo" />
        </router-link>
      </div>

      <!-- Navigation principale -->
      <div class="hidden md:flex flex-grow justify-center space-x-16">
        <router-link
          to="/classement"
          class="nav-link font-orbitron"
          :class="{ 'nav-link-active': isActive('/classement') }"
        >
          Classement
        </router-link>
        <router-link
          to="/tournois-a-venir"
          class="nav-link font-orbitron"
          :class="{ 'nav-link-active': isActive('/tournois-a-venir') }"
        >
          Tournois
        </router-link>
        <!-- <router-link
          to="/calendar"
          class="nav-link font-orbitron"
          :class="{ 'nav-link-active': isActive('/calendar') }"
        >
          Calendrier
        </router-link> -->
        <router-link
          v-if="user"
          to="/membres"
          class="nav-link font-orbitron"
          :class="{ 'nav-link-active': isActive('/membres') }"
        >
          Membres
        </router-link>
        <router-link
          v-if="user"
          to="/propositions-jeux"
          class="nav-link font-orbitron"
          :class="{ 'nav-link-active': isActive('/propositions-jeux') }"
        >
          Propositions
        </router-link>
        <router-link
          to="/badges"
          class="nav-link font-orbitron"
          :class="{ 'nav-link-active': isActive('/badges') }"
        >
          Badges
        </router-link>
      </div>

      <!-- Menu utilisateur -->
      <div class="relative user-menu flex items-center">
        <span
          v-if="user"
          @click="toggleMenu"
          class="text-white cursor-pointer flex items-center group"
        >
          <img
            :src="
              user.avatarUrl || 'https://cdn.discordapp.com/embed/avatars/0.png'
            "
            alt="Avatar"
            class="w-8 h-8 rounded-full border border-cyan-500/50 shadow-glow-cyan"
          />
          <span
            class="user-name ml-2 hidden sm:inline font-orbitron capitalize"
          >
            {{ user.username }}
          </span>
        </span>

        <!-- Bouton login -->
        <button
          v-else
          @click="loginWithDiscord"
          class="discord-login-btn font-orbitron"
        >
          <img
            src="../assets/discord-Logo.png"
            alt="Discord Logo"
            class="h-6 w-10 mr-2"
          />
          Connexion
        </button>

        <!-- Menu dropdown utilisateur -->
        <transition name="slide-fade">
          <div v-if="menuOpen" class="user-dropdown">
            <router-link
              :to="{ name: 'Profil', params: { id: player?._id } }"
              class="user-dropdown-item"
              @click="closeAllMenus"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              Mon Profil
            </router-link>

            <router-link
              to="/player-level"
              class="user-dropdown-item"
              @click="closeAllMenus"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                />
              </svg>
              Mes niveaux de jeu
            </router-link>

            <button @click="logout" class="user-dropdown-item logout-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd"
                />
              </svg>
              Déconnexion
            </button>
          </div>
        </transition>
      </div>

      <!-- Menu mobile -->
      <div class="md:hidden mobile-menu">
        <button @click="toggleMobileMenu" class="text-white focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-pink-400"
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

        <!-- Menu déroulant mobile -->
        <transition name="slide-fade">
          <div v-if="mobileMenuOpen" class="mobile-dropdown">
            <router-link
              to="/classement"
              @click="closeAllMenus"
              class="mobile-dropdown-item"
              :class="{ 'mobile-dropdown-active': isActive('/classement') }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
                />
              </svg>
              Classement
            </router-link>

            <router-link
              to="/tournois-a-venir"
              @click="closeAllMenus"
              class="mobile-dropdown-item"
              :class="{
                'mobile-dropdown-active': isActive('/tournois-a-venir'),
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              Tournois
            </router-link>

            <!-- <router-link
              to="/calendar"
              @click="closeAllMenus"
              class="mobile-dropdown-item"
              :class="{ 'mobile-dropdown-active': isActive('/calendar') }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              Calendrier
            </router-link> -->

            <router-link
              v-if="user"
              to="/membres"
              @click="closeAllMenus"
              class="mobile-dropdown-item"
              :class="{ 'mobile-dropdown-active': isActive('/membres') }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                />
              </svg>
              Membres
            </router-link>
            <router-link
              v-if="user"
              to="/propositions-jeux"
              @click="closeAllMenus"
              class="mobile-dropdown-item"
              :class="{
                'mobile-dropdown-active': isActive('/propositions-jeux'),
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <!-- Manette de jeu / Gamepad icon -->
                <path
                  d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                />
              </svg>
              Propositions
            </router-link>
            <router-link
              v-if="user"
              to="/badges"
              @click="closeAllMenus"
              class="mobile-dropdown-item"
              :class="{ 'mobile-dropdown-active': isActive('/badges') }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              Badges
            </router-link>
            <router-link
              v-if="user"
              to="/player-level"
              @click="closeAllMenus"
              class="mobile-dropdown-item"
              :class="{
                'mobile-dropdown-active': isActive('/player-level'),
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                />
              </svg>
              Mes niveaux de jeu
            </router-link>
          </div>
        </transition>
      </div>
    </div>

    <!-- Menu admin -->
    <transition name="slide-fade">
      <div v-if="adminMenuOpen" class="admin-dropdown">
        <router-link
          to="/creation-jeu"
          @click="closeAllMenus"
          class="admin-dropdown-item"
          :class="{ 'admin-dropdown-active': isActive('/creation-jeu') }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
          Création d'un jeu
        </router-link>

        <router-link
          to="/ajout-joueurs"
          @click="closeAllMenus"
          class="admin-dropdown-item"
          :class="{ 'admin-dropdown-active': isActive('/ajout-joueurs') }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
            />
          </svg>
          Ajout de joueurs
        </router-link>

        <router-link
          to="/creation-tournoi"
          @click="closeAllMenus"
          class="admin-dropdown-item"
          :class="{ 'admin-dropdown-active': isActive('/creation-tournoi') }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          Gestion tournois
        </router-link>

        <router-link
          to="/gestion-niveaux"
          @click="closeAllMenus"
          class="admin-dropdown-item"
          :class="{ 'admin-dropdown-active': isActive('/gestion-niveaux') }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
          Gestion des niveaux
        </router-link>

        <router-link
          to="/gestion-saisons"
          @click="closeAllMenus"
          class="admin-dropdown-item"
          :class="{ 'admin-dropdown-active': isActive('/gestion-saisons') }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          Gestion des saisons
        </router-link>

        <!-- Autres liens admin -->
        <router-link
          to="/gestion-badges"
          @click="closeAllMenus"
          class="admin-dropdown-item"
          :class="{ 'admin-dropdown-active': isActive('/gestion-badges') }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          Gestion des badges
        </router-link>

        <router-link
          to="/synchronisation-joueurs"
          @click="closeAllMenus"
          class="admin-dropdown-item"
          :class="{
            'admin-dropdown-active': isActive('/synchronisation-joueurs'),
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            />
          </svg>
          Synchro utilisateurs
        </router-link>

        <router-link
          v-if="isSuperAdmin"
          to="/gestion-administrations"
          @click="closeAllMenus"
          class="admin-dropdown-item"
          :class="{
            'admin-dropdown-active': isActive('/gestion-administrations'),
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            />
          </svg>
          Gestion des admins
        </router-link>
      </div>
    </transition>

    <!-- Effet de lueur néon en bas -->
    <div class="neon-line-bottom"></div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter, useRoute } from "vue-router";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const player = computed(() => userStore.player);

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
const route = useRoute();

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

const isActive = (path: string) => {
  return route.path === path;
};

const loginWithDiscord = () => {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;
  window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=identify+guilds+email`;
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
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

/* Style de la navbar */
.navbar-bg {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(236, 72, 153, 0.3);
}

.neon-line-top {
  height: 2px;
  background: linear-gradient(90deg, #06b6d4, #ec4899, #8b5cf6, #06b6d4);
  animation: glow 3s linear infinite;
}

.neon-line-bottom {
  height: 1px;
  background: linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6);
  animation: glow 3s linear infinite;
  opacity: 0.7;
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
  }
  50% {
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.9);
  }
  100% {
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
  }
}

/* Style du logo */
.logo-link {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

.neon-text-pink {
  text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff,
    0 0 20px #ff00ff;
}

/* Style des liens de navigation */
.nav-link {
  position: relative;
  color: white;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 0.25rem 0.5rem;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 50%;
  background: linear-gradient(90deg, #ec4899, #8b5cf6);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #ec4899;
  text-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link-active {
  color: #ec4899;
  text-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
}

.nav-link-active::after {
  width: 100%;
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
}

/* Style du menu admin */
.admin-tooltip {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #ec4899;
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  font-family: "Orbitron", sans-serif;
  white-space: nowrap;
  z-index: 100;
}

.admin-menu:hover .admin-tooltip {
  opacity: 1;
}

.admin-dropdown {
  position: absolute;
  left: 0;
  top: 100%;
  width: 225px;
  background: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(236, 72, 153, 0.3);
  border-top: none;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(236, 72, 153, 0.3);
  z-index: 40;
}

.admin-dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: white;
  font-family: "Orbitron", sans-serif;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.admin-dropdown-item:hover {
  background: rgba(236, 72, 153, 0.2);
  color: #ec4899;
  border-left: 3px solid #ec4899;
}

.admin-dropdown-active {
  background: rgba(236, 72, 153, 0.15);
  color: #ec4899;
  border-left: 3px solid #ec4899;
}

/* Style du menu utilisateur */
.user-name {
  color: white;
  font-size: 0.9rem;
}

.user-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  width: 180px;
  background: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(6, 182, 212, 0.3);
  z-index: 40;
}

.user-dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: white;
  font-family: "Orbitron", sans-serif;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.user-dropdown-item:hover {
  background: rgba(6, 182, 212, 0.2);
  color: #06b6d4;
  border-left: 3px solid #06b6d4;
}

.logout-btn {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-family: "Orbitron", sans-serif;
  font-size: 0.85rem;
}

.logout-btn:hover {
  color: #ef4444;
  border-left: 3px solid #ef4444;
}

/* Style du menu mobile */
.mobile-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  width: 200px;
  background: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(236, 72, 153, 0.3);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(236, 72, 153, 0.3);
  z-index: 40;
}

.mobile-dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: white;
  font-family: "Orbitron", sans-serif;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.mobile-dropdown-item:hover {
  background: rgba(236, 72, 153, 0.2);
  color: #ec4899;
  border-left: 3px solid #ec4899;
}

.mobile-dropdown-active {
  background: rgba(236, 72, 153, 0.15);
  color: #ec4899;
  border-left: 3px solid #ec4899;
}

/* Style du bouton Discord */
.discord-login-btn {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, #4a0072, #9900ff);
  color: white;
  border: 1px solid #8b5cf6;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(139, 92, 246, 0.5);
  transition: all 0.3s ease;
}

.discord-login-btn:hover {
  background: linear-gradient(to right, #9900ff, #ff00ff);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.8);
  transform: translateY(-2px);
}

/* Animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Style du logo dans la navbar */
.logo-link {
  display: flex;
  align-items: center;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: visible;
}

.logo-link:hover {
  transform: scale(1.08);
}

.navbar-logo {
  height: 40px;
  width: auto;
  filter: drop-shadow(0 0 5px rgba(236, 72, 153, 0.7));
  transition: all 0.3s ease;
}

.logo-link:hover .navbar-logo {
  filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.9)) brightness(1.1);
}

/* Effet de lueur au survol */
.logo-link::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(236, 72, 153, 0.2) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 50%;
}

.logo-link:hover::after {
  opacity: 1;
}

/* Ajustement responsive pour le logo */
@media (max-width: 640px) {
  .navbar-logo {
    height: 36px;
  }
}
</style>
