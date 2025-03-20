<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Membres.vue -->
<template>
  <div class="container mx-auto p-8 pt-20">
    <h1
      class="text-4xl text-white mb-8 neon-text font-audiowide text-center"
      tabindex="0"
    >
      Liste des membres
    </h1>

    <!-- Recherche accessible -->
    <div class="mb-6 flex justify-center">
      <div class="relative w-full max-w-md">
        <label for="member-search" class="sr-only">Rechercher un membre</label>
        <input
          id="member-search"
          v-model="searchTerm"
          type="text"
          placeholder="Rechercher un membre..."
          class="w-full px-4 py-2 bg-black/50 border border-pink-500/50 rounded-lg text-white font-orbitron focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 placeholder-gray-500"
          aria-label="Rechercher un membre"
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Options de tri -->
    <div class="mb-4 flex justify-end">
      <div class="relative">
        <select
          v-model="currentSort"
          class="appearance-none bg-black/50 border border-cyan-500/50 text-cyan-400 font-orbitron px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-cyan-500"
          aria-label="Trier par"
        >
          <option
            v-for="option in sortOptions"
            :key="option.id"
            :value="option.id"
          >
            {{ option.label }}
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cyan-400"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- État de chargement avec CyberpunkLoader -->
    <div
      v-if="loading"
      class="text-center my-12"
      role="status"
      aria-live="polite"
    >
      <CyberpunkLoader />
    </div>

    <!-- État d'erreur -->
    <div
      v-else-if="error"
      class="text-center my-12 p-6 border border-red-500 bg-red-900/20 rounded-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 text-red-400 mx-auto mb-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="text-red-300 font-orbitron">{{ error }}</p>
      <button
        @click="fetchUsers"
        class="mt-4 px-4 py-2 bg-red-900/40 border border-red-500 text-red-300 rounded-md font-orbitron hover:bg-red-900/60 transition-colors"
      >
        Réessayer
      </button>
    </div>

    <!-- Liste vide -->
    <div v-else-if="sortedUsers.length === 0" class="text-center my-12">
      <p class="text-white font-orbitron">Aucun membre trouvé</p>
    </div>

    <!-- Liste des membres -->
    <div
      v-else
      role="list"
      aria-label="Liste des membres"
      class="bg-black/75 backdrop-blur-sm rounded-lg border border-pink-500 shadow-lg shadow-pink-500/30 overflow-hidden"
    >
      <!-- Afficher le nombre de membres trouvés -->
      <p class="sr-only" aria-live="polite" role="status">
        {{ sortedUsers.length }} membres trouvés
      </p>

      <div class="grid grid-cols-1 divide-y divide-pink-500/30">
        <div
          v-for="user in paginatedUsers"
          :key="user._id"
          role="listitem"
          class="member-card p-4 transition-all hover:bg-purple-900/20"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="avatar-container">
                <img
                  v-if="user.avatarUrl"
                  :src="user.avatarUrl"
                  alt="Avatar"
                  class="w-16 h-16 rounded-full object-cover border-2 border-cyan-500 avatar-glow"
                  loading="lazy"
                  @error="handleImageError($event)"
                />
                <div
                  v-else
                  class="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-pink-500"
                >
                  <span class="text-pink-500 text-xl font-bold">{{
                    getUserInitials(user.username)
                  }}</span>
                </div>
              </div>
              <div>
                <router-link
                  v-if="user.playerId"
                  :to="{ name: 'Profil', params: { id: user.playerId } }"
                  class="text-lg text-white hover:text-pink-400 font-orbitron transition-colors member-link capitalize"
                >
                  {{ user.username }}
                </router-link>
                <span v-else class="text-lg text-white font-orbitron">
                  {{ user.username }}
                </span>
                <div class="text-sm text-gray-400 mt-1">
                  <span v-if="user.role === 'admin'" class="role-badge admin"
                    >Admin</span
                  >
                  <span
                    v-else-if="user.role === 'superadmin'"
                    class="role-badge superadmin"
                    >Super Admin</span
                  >
                  <span v-else class="role-badge member">Membre</span>
                </div>
              </div>
            </div>
            <div class="view-profile-button">
              <router-link
                v-if="user.playerId"
                :to="{ name: 'Profil', params: { id: user.playerId } }"
                class="px-4 py-2 rounded text-sm neon-button-cyan font-orbitron"
              >
                Voir profil
              </router-link>
              <span
                v-else
                class="px-4 py-2 text-sm text-gray-400 font-orbitron"
              >
                Pas de profil
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center mt-8 space-x-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-black/70 border border-cyan-500/50 text-cyan-400 rounded-md disabled:opacity-50 disabled:cursor-not-allowed font-orbitron transition-all hover:bg-black/90 hover:border-cyan-500 hover:shadow-glow"
      >
        &laquo; Précédent
      </button>

      <div class="flex items-center px-4 font-orbitron text-white">
        Page {{ currentPage }} / {{ totalPages }}
      </div>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-black/70 border border-cyan-500/50 text-cyan-400 rounded-md disabled:opacity-50 disabled:cursor-not-allowed font-orbitron transition-all hover:bg-black/90 hover:border-cyan-500 hover:shadow-glow"
      >
        Suivant &raquo;
      </button>
    </div>

    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import userService from "../services/userService";
import playerService from "../services/playerService";
import Toast from "@/shared/Toast.vue";
import CyberpunkLoader from "@/shared/CyberpunkLoader.vue";

//-------------------------------------------------------
// SECTION: Définition des types
//-------------------------------------------------------

/**
 * Structure d'un utilisateur avec son profil joueur associé
 */
interface User {
  _id?: string; // ID unique de l'utilisateur
  username: string; // Nom d'utilisateur
  email: string; // Email
  role: "user" | "admin" | "superadmin"; // Rôle dans l'application
  avatarUrl?: string; // URL de l'avatar (optionnel)
  playerId?: string; // ID du profil joueur associé (optionnel)
}

//-------------------------------------------------------
// SECTION: États du composant
//-------------------------------------------------------

/**
 * États principaux
 */
const users = ref<User[]>([]); // Liste des utilisateurs
const error = ref<string | null>(null); // Message d'erreur
const success = ref<string | null>(null); // Message de succès
const loading = ref(true); // État de chargement

/**
 * États pour la recherche et la pagination
 */
const searchTerm = ref(""); // Terme de recherche
const currentPage = ref(1); // Page actuelle
const itemsPerPage = 10; // Nombre d'éléments par page

/**
 * Options de tri
 */
const sortOptions = [
  { id: "username-asc", label: "Nom (A-Z)" },
  { id: "username-desc", label: "Nom (Z-A)" },
  { id: "role-asc", label: "Rôle (croissant)" },
  { id: "role-desc", label: "Rôle (décroissant)" },
];
const currentSort = ref("username-asc"); // Option de tri sélectionnée

//-------------------------------------------------------
// SECTION: Fonctions utilitaires
//-------------------------------------------------------

/**
 * Extrait les initiales d'un nom d'utilisateur
 * @param username - Nom d'utilisateur
 * @returns Les initiales du nom (1 ou 2 lettres)
 */
const getUserInitials = (username: string) => {
  if (!username) return "?";
  const nameParts = username.split(" ");
  if (nameParts.length === 1) return username.charAt(0).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
};

/**
 * Gère les erreurs de chargement d'image
 * @param e - Événement d'erreur
 */
const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.src = "https://via.placeholder.com/50?text=?";
  }
};

/**
 * Réinitialise la pagination à la première page
 */
const resetPagination = () => {
  currentPage.value = 1;
};

//-------------------------------------------------------
// SECTION: Propriétés calculées
//-------------------------------------------------------

/**
 * Filtre les utilisateurs selon le terme de recherche
 * @returns Liste filtrée des utilisateurs
 */
const searchResults = computed(() => {
  if (!searchTerm.value.trim()) return users.value;

  const term = searchTerm.value.toLowerCase();
  return users.value.filter(
    (user) =>
      user.username.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
  );
});

/**
 * Trie les utilisateurs selon le critère sélectionné
 * @returns Liste triée des utilisateurs
 */
const sortedUsers = computed(() => {
  const usersToSort = [...searchResults.value];

  switch (currentSort.value) {
    case "username-asc":
      return usersToSort.sort((a, b) => a.username.localeCompare(b.username));
    case "username-desc":
      return usersToSort.sort((a, b) => b.username.localeCompare(a.username));
    case "role-asc": {
      // Ordre personnalisé des rôles: user < admin < superadmin
      const roleOrder = { user: 1, admin: 2, superadmin: 3 };
      return usersToSort.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
    }
    case "role-desc": {
      const roleOrder = { user: 1, admin: 2, superadmin: 3 };
      return usersToSort.sort((a, b) => roleOrder[b.role] - roleOrder[a.role]);
    }
    default:
      return usersToSort;
  }
});

/**
 * Calcule le nombre total de pages pour la pagination
 * @returns Nombre total de pages
 */
const totalPages = computed(() =>
  Math.ceil(sortedUsers.value.length / itemsPerPage)
);

/**
 * Extrait les utilisateurs à afficher sur la page courante
 * @returns Liste paginée des utilisateurs
 */
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedUsers.value.slice(start, end);
});

//-------------------------------------------------------
// SECTION: Navigation entre pages
//-------------------------------------------------------

/**
 * Passe à la page suivante
 */
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

/**
 * Revient à la page précédente
 */
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

//-------------------------------------------------------
// SECTION: Appels API et récupération des données
//-------------------------------------------------------

/**
 * Récupère les utilisateurs et leurs profils joueur associés
 * Établit les relations entre utilisateurs et joueurs pour la navigation
 */
const fetchUsers = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Récupération de tous les utilisateurs
    const fetchedUsers = await userService.fetchAllUsers();

    // Récupérer tous les joueurs en parallèle
    const playerPromises = fetchedUsers.map((user: { _id: string }) =>
      playerService
        .getPlayerByIdUser(user._id!)
        .then((player) => ({ userId: user._id, playerId: player._id }))
        .catch((err) => {
          console.error(`Erreur pour l'utilisateur ${user._id}:`, err);
          return { userId: user._id, playerId: null };
        })
    );

    const playerResults = await Promise.all(playerPromises);

    // Créer un dictionnaire pour un accès O(1)
    const playerIdMap = playerResults.reduce((acc, curr) => {
      if (curr.playerId) {
        acc[curr.userId] = curr.playerId;
      }
      return acc;
    }, {} as Record<string, string>);

    // Mettre à jour les utilisateurs avec leurs IDs de joueur
    users.value = fetchedUsers.map((user: { _id: string }) => ({
      ...user,
      playerId: playerIdMap[user._id as string],
    }));
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs:", err);
    error.value = "Erreur lors de la récupération des utilisateurs.";
  } finally {
    loading.value = false;
  }
};

//-------------------------------------------------------
// SECTION: Cycle de vie et réactivité
//-------------------------------------------------------

/**
 * Initialisation du composant au montage
 */
onMounted(() => {
  fetchUsers();
});

/**
 * Réinitialiser la pagination lorsque le terme de recherche change
 */
watch(searchTerm, () => {
  resetPagination();
});

/**
 * Réinitialiser la pagination lorsque le critère de tri change
 */
watch(currentSort, () => {
  resetPagination();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.member-card {
  transition: all 0.3s ease;
}

.member-card:hover {
  background-color: rgba(168, 85, 247, 0.15);
}

.avatar-container {
  position: relative;
}

.avatar-glow {
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
  transition: all 0.3s ease;
}

.member-card:hover .avatar-glow {
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
}

.role-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-family: "Orbitron", sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.role-badge.admin {
  background-color: rgba(219, 39, 119, 0.2);
  color: #f472b6;
  border: 1px solid #f472b6;
}

.role-badge.superadmin {
  background-color: rgba(236, 72, 153, 0.2);
  color: #ec4899;
  border: 1px solid #ec4899;
}

.role-badge.member {
  background-color: rgba(34, 211, 238, 0.2);
  color: #22d3ee;
  border: 1px solid #22d3ee;
}

.member-link {
  position: relative;
  display: inline-block;
}

.member-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-image: linear-gradient(to right, #ec4899, #8b5cf6);
  transition: width 0.3s ease-in-out;
}

.member-link:hover::after {
  width: 100%;
}

.neon-button-cyan {
  display: inline-block;
  background: rgba(6, 182, 212, 0.1);
  color: #22d3ee;
  border: 1px solid #06b6d4;
  box-shadow: 0 0 5px rgba(6, 182, 212, 0.5);
  transition: all 0.3s ease;
  text-align: center;
}

.neon-button-cyan:hover {
  background: rgba(6, 182, 212, 0.2);
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
  transform: translateY(-1px);
}

.neon-text {
  color: white;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 20px #ff00ff,
    0 0 20px #ff00ff, 0 0 20px #ff00ff;
  letter-spacing: 2px;
}

.shadow-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

@keyframes glowPulse {
  0% {
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.5);
  }
}

/* Assurer que le spinner a une animation fluide */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
