<template>
  <div class="container mx-auto p-8 pt-20 max-w-6xl">
    <div
      class="bg-black/80 backdrop-blur-xl rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/20 p-8 relative overflow-hidden"
    >
      <!-- Grille en arrière-plan -->
      <div class="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>

      <!-- En-tête -->
      <div class="text-center mb-10 relative z-10">
        <h1 class="text-4xl text-white font-audiowide mb-2 neon-text-pink">
          Gestion des Administrateurs
        </h1>
        <div
          class="h-1 w-40 mx-auto bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded shadow-glow"
        ></div>
      </div>

      <!-- Barre de recherche -->
      <div
        class="flex items-center bg-gray-800/70 rounded-lg px-4 py-3 mb-6 border border-purple-500/30 relative z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-purple-400 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Rechercher un utilisateur..."
          class="w-full bg-transparent border-none text-white font-orbitron text-sm focus:outline-none focus:ring-0 placeholder-white/50"
        />
      </div>

      <!-- Tableau des utilisateurs -->
      <div
        class="bg-gray-900/70 backdrop-blur-sm rounded-lg overflow-hidden border border-cyan-500/30 shadow-lg shadow-cyan-500/20 mb-8 relative z-10"
      >
        <!-- En-tête du tableau -->
        <div
          class="grid grid-cols-4 md:grid-cols-[2fr_3fr_1fr_1.5fr] bg-gray-800/80 p-4 border-b border-purple-500/30"
        >
          <div
            class="text-cyan-400 font-orbitron text-xs md:text-sm uppercase tracking-wider font-bold px-2"
          >
            Nom d'utilisateur
          </div>
          <div
            class="text-cyan-400 font-orbitron text-xs md:text-sm uppercase tracking-wider font-bold px-2 hidden md:block"
          >
            Email
          </div>
          <div
            class="text-cyan-400 font-orbitron text-xs md:text-sm uppercase tracking-wider font-bold px-2 hidden md:block"
          >
            Rôle
          </div>
          <div
            class="text-cyan-400 font-orbitron text-xs md:text-sm uppercase tracking-wider font-bold px-2"
          >
            Actions
          </div>
        </div>

        <!-- Corps du tableau -->
        <div
          class="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-gray-800/50"
        >
          <div
            v-for="user in filteredUsers"
            :key="user._id"
            class="grid grid-cols-4 md:grid-cols-[2fr_3fr_1fr_1.5fr] p-3 border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors duration-200 relative"
            :class="{
              'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gray-500':
                user.role === 'user',
              'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-purple-500':
                user.role === 'admin',
              'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-pink-500':
                user.role === 'superadmin',
            }"
          >
            <div class="flex items-center px-2">
              <!-- Avatar utilisateur avec fallback en initiales -->
              <div
                class="w-10 h-10 rounded-full mr-3 overflow-hidden flex items-center justify-center"
                :class="
                  user.avatarUrl
                    ? 'bg-transparent'
                    : 'bg-gradient-to-br from-purple-600 to-pink-500'
                "
              >
                <img
                  v-if="user.avatarUrl"
                  :src="user.avatarUrl"
                  :alt="user.username"
                  class="w-full h-full object-cover"
                  @error="handleAvatarError(user)"
                />
                <span v-else class="text-white font-bold text-sm">
                  {{ getUserInitials(user.username) }}
                </span>
              </div>
              <span class="text-white font-orbitron text-sm">{{
                user.username
              }}</span>
            </div>

            <div
              class="flex items-center px-2 text-white font-orbitron text-sm md:flex"
            >
              {{ user.email }}
            </div>

            <div class="items-center px-2 hidden md:flex">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold font-orbitron capitalize"
                :class="{
                  'bg-gray-600/30 border border-gray-500/50 text-gray-300':
                    user.role === 'user',
                  'bg-purple-600/20 border border-purple-500/50 text-purple-200':
                    user.role === 'admin',
                  'bg-pink-600/20 border border-pink-500/50 text-pink-200':
                    user.role === 'superadmin',
                }"
              >
                {{ user.role }}
              </span>
            </div>

            <div class="flex items-center px-2">
              <div class="relative w-full">
                <select
                  v-model="user.role"
                  @change="updateUserRole(user)"
                  class="w-full py-2 px-3 appearance-none text-white bg-gray-800/80 border border-cyan-500/50 rounded-md font-orbitron text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
                <div
                  class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
              <!-- Bouton de suppression -->
              <button
                @click="confirmDeleteUser(user)"
                class="ml-3 p-2 rounded-md bg-gray-800/80 border border-red-500/50 hover:border-red-500 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-200 group relative"
                :disabled="user.role === 'superadmin'"
                :class="{
                  'opacity-30 cursor-not-allowed': user.role === 'superadmin',
                }"
                :title="
                  user.role === 'superadmin'
                    ? 'Impossible de supprimer un superadmin'
                    : 'Supprimer cet utilisateur'
                "
              >
                <!-- Icône de suppression cyberpunk -->
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7L18 7M10 11V17M14 11V17M4 7H20L18.4 21H5.6L4 7ZM8 7L9 3H15L16 7H8Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="square"
                    stroke-linejoin="round"
                  />
                </svg>

                <!-- Effet lumineux au survol -->
                <span
                  class="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-sm rounded-lg transition-opacity duration-200"
                ></span>
              </button>
            </div>
            <!-- Ajouter le composant de dialogue de confirmation -->
            <ConfirmationDialog
              v-if="showDeleteDialog"
              :title="'Supprimer ' + userToDelete?.username"
              :message="`Êtes-vous sûr de vouloir supprimer l'utilisateur ${userToDelete?.username} ? Cette action supprimera également toutes les données associées et est irréversible.`"
              @confirm="deleteUser"
              @cancel="cancelDelete"
            />
          </div>

          <div
            v-if="filteredUsers.length === 0"
            class="flex flex-col items-center justify-center py-12 text-purple-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mb-4 opacity-70"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="font-orbitron">Aucun utilisateur trouvé</p>
          </div>
        </div>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 relative z-10">
        <div
          class="bg-gray-800/70 rounded-lg p-5 text-center border border-purple-500/30 shadow-md relative overflow-hidden"
        >
          <div
            class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 shadow-glow"
          ></div>
          <div class="text-3xl text-white font-audiowide mb-2 text-glow">
            {{ users.length }}
          </div>
          <div class="text-sm text-purple-300 font-orbitron font-semibold">
            Utilisateurs total
          </div>
        </div>

        <div
          class="bg-gray-800/70 rounded-lg p-5 text-center border border-purple-500/30 shadow-md relative overflow-hidden"
        >
          <div
            class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 shadow-glow"
          ></div>
          <div class="text-3xl text-white font-audiowide mb-2 text-glow">
            {{ users.filter((u) => u.role === "admin").length }}
          </div>
          <div class="text-sm text-purple-300 font-orbitron font-semibold">
            Administrateurs
          </div>
        </div>

        <div
          class="bg-gray-800/70 rounded-lg p-5 text-center border border-purple-500/30 shadow-md relative overflow-hidden"
        >
          <div
            class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 shadow-glow"
          ></div>
          <div class="text-3xl text-white font-audiowide mb-2 text-glow">
            {{ users.filter((u) => u.role === "superadmin").length }}
          </div>
          <div class="text-sm text-purple-300 font-orbitron font-semibold">
            Superadmins
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import userService from "../../services/userService";
import Toast from "@/shared/Toast.vue";
import type { User } from "../../types";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";

//-------------------------------------------------------
// SECTION: État pour la suppression
//-------------------------------------------------------

const showDeleteDialog = ref(false);
const userToDelete = ref<User | null>(null);

/**
 * Affiche la boîte de dialogue de confirmation pour supprimer un utilisateur
 * @param user - Utilisateur à supprimer
 */
const confirmDeleteUser = (user: User) => {
  // Ne pas permettre la suppression des superadmins
  if (user.role === "superadmin") {
    return;
  }

  userToDelete.value = user;
  showDeleteDialog.value = true;
};

/**
 * Ferme la boîte de dialogue sans action
 */
const cancelDelete = () => {
  showDeleteDialog.value = false;
  userToDelete.value = null;
};

/**
 * Supprime l'utilisateur après confirmation
 */
const deleteUser = async () => {
  if (!userToDelete.value) return;

  try {
    await userService.deleteUser(userToDelete.value._id);
    showMessage(
      "success",
      `L'utilisateur ${userToDelete.value.username} a été supprimé avec succès.`
    );

    // Rafraîchir la liste des utilisateurs
    await fetchUsers();
  } catch (err: any) {
    console.error("Erreur lors de la suppression de l'utilisateur:", err);

    // Messages d'erreur spécifiques selon le code de statut
    let errorMsg = "Erreur lors de la suppression de l'utilisateur.";
    if (err.response) {
      if (err.response.status === 403) {
        errorMsg =
          "Vous n'avez pas les permissions nécessaires pour supprimer cet utilisateur.";
      } else if (err.response.status === 404) {
        errorMsg = "Utilisateur introuvable.";
      }
    }

    showMessage("error", errorMsg);
  } finally {
    // Fermer le dialogue dans tous les cas
    showDeleteDialog.value = false;
    userToDelete.value = null;
  }
};

//-------------------------------------------------------
// SECTION: État du composant
//-------------------------------------------------------

/**
 * Données des utilisateurs et UI
 */
const users = ref<User[]>([]); // Liste des utilisateurs
const error = ref<string | null>(null); // Message d'erreur
const success = ref<string | null>(null); // Message de succès
const searchTerm = ref(""); // Terme de recherche

//-------------------------------------------------------
// SECTION: Propriétés calculées
//-------------------------------------------------------

/**
 * Filtre les utilisateurs selon le terme de recherche
 * Recherche dans le nom d'utilisateur, l'email ou le rôle
 * @returns Liste des utilisateurs filtrée
 */
const filteredUsers = computed(() => {
  if (!searchTerm.value) return users.value;

  const term = searchTerm.value.toLowerCase();
  return users.value.filter(
    (user) =>
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
  );
});

//-------------------------------------------------------
// SECTION: Fonctions utilitaires
//-------------------------------------------------------

/**
 * Génère les initiales à partir du nom d'utilisateur
 * @param username - Nom d'utilisateur
 * @returns Initiales en majuscules (1 ou 2 lettres)
 */
const getUserInitials = (username: string) => {
  if (!username) return "?";
  const nameParts = username.trim().split(/\s+/); // Division plus robuste (gère espaces multiples)

  if (nameParts.length === 1) {
    // Si un seul mot, prendre jusqu'à 2 premières lettres
    return username.substring(0, 2).toUpperCase();
  }

  // Sinon prendre l'initiale du premier et du dernier mot
  return (
    nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
  ).toUpperCase();
};

/**
 * Gère les erreurs de chargement d'avatar
 * @param event - Événement d'erreur
 * @param user - Utilisateur concerné
 */
const handleAvatarError = (user: User) => {
  // Marquer l'avatar comme non disponible pour afficher les initiales à la place
  if (user) {
    user.avatarUrl = ""; // Supprimer l'URL pour déclencher l'affichage des initiales
  }
};

/**
 * Affiche un message de notification temporaire
 * @param type - Type de notification ("success" ou "error")
 * @param message - Contenu du message
 */
const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 3000);
};

//-------------------------------------------------------
// SECTION: Appels API et gestion des données
//-------------------------------------------------------

/**
 * Récupère la liste des utilisateurs depuis l'API
 * Gère les erreurs avec des messages appropriés
 */
const fetchUsers = async () => {
  try {
    users.value = await userService.fetchAllUsers();
  } catch (err: any) {
    // Typage de l'erreur
    console.error("Erreur lors de la récupération des utilisateurs:", err);
    // Message plus spécifique selon le type d'erreur
    const message =
      err.response?.status === 403
        ? "Vous n'avez pas les permissions nécessaires pour voir tous les utilisateurs."
        : "Erreur lors de la récupération des utilisateurs.";
    showMessage("error", message);
  }
};

/**
 * Met à jour le rôle d'un utilisateur
 * Envoie la requête à l'API et affiche un message de confirmation
 * @param user - Utilisateur à mettre à jour
 */
const updateUserRole = async (user: any) => {
  try {
    await userService.updateUserRole(user._id, user.role);
    showMessage(
      "success",
      `Le rôle de ${user.username} a été mis à jour avec succès !`
    );
    fetchUsers(); // Rafraîchit la liste des utilisateurs
  } catch (err) {
    console.error("Erreur lors de la mise à jour du rôle:", err);
    showMessage("error", "Erreur lors de la mise à jour du rôle.");
  }
};

//-------------------------------------------------------
// SECTION: Cycle de vie du composant
//-------------------------------------------------------

/**
 * Initialisation du composant au montage
 * Charge la liste des utilisateurs
 */
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.neon-text-pink {
  text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899,
    0 0 40px #ec4899;
}

.text-glow {
  text-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
}

.shadow-glow {
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
}

/* Arrière-plan avec motif de grille */
.bg-grid-pattern {
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(139, 92, 246, 0.05) 25%,
      rgba(139, 92, 246, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.05) 75%,
      rgba(139, 92, 246, 0.05) 76%,
      transparent 77%
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(139, 92, 246, 0.05) 25%,
      rgba(139, 92, 246, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.05) 75%,
      rgba(139, 92, 246, 0.05) 76%,
      transparent 77%
    );
  background-size: 50px 50px;
}

/* Scrollbar personnalisée */
.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-thumb-purple-500\/50::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 4px;
}

.scrollbar-thumb-purple-500\/50::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.8);
}

.scrollbar-track-gray-800\/50::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 4px;
}

.user-avatar {
  transition: opacity 0.3s ease;
}

.user-avatar-loading {
  opacity: 0.6;
}
</style>
