<template>
  <div class="container mx-auto p-8 pt-20">
    <div class="max-w-6xl mx-auto">
      <!-- En-tête -->
      <Header
        title="Gestion des Administrateurs"
        titleSize="3xl"
        :showMissionInfo="true"
        mission="ADMIN-MGMT"
      >
        <template #badge v-if="users.length > 0">
          <SpaceBadge variant="primary" size="lg">{{
            users.length
          }}</SpaceBadge>
        </template>
      </Header>

      <!-- Barre de recherche -->
      <Card variant="primary" :stars="true" :decorated="true" className="mb-8">
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-color-primary"
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
          <SpaceInput
            type="text"
            v-model="searchTerm"
            placeholder="Rechercher un utilisateur..."
            className="pl-10"
          />
        </div>
      </Card>

      <!-- Tableau des utilisateurs -->
      <Card
        variant="secondary"
        :stars="true"
        :decorated="true"
        className="mb-8"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-color-secondary-light"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                />
              </svg>
              <Title size="xl">Liste des administrateurs</Title>
            </div>
          </div>
        </template>

        <!-- En-tête du tableau -->
        <div
          class="grid grid-cols-4 md:grid-cols-[2fr_3fr_1fr_1.5fr] bg-color-bg-light/40 p-4 border-b border-color-primary/20 rounded-t-lg"
        >
          <div
            class="text-color-primary-light font-nasa text-xs md:text-sm uppercase tracking-wider font-bold px-2"
          >
            Nom d'utilisateur
          </div>
          <div
            class="text-color-primary-light font-nasa text-xs md:text-sm uppercase tracking-wider font-bold px-2 hidden md:block"
          >
            Email
          </div>
          <div
            class="text-color-primary-light font-nasa text-xs md:text-sm uppercase tracking-wider font-bold px-2 hidden md:block"
          >
            Rôle
          </div>
          <div
            class="text-color-primary-light font-nasa text-xs md:text-sm uppercase tracking-wider font-bold px-2"
          >
            Actions
          </div>
        </div>

        <!-- Corps du tableau -->
        <div class="max-h-[500px] overflow-y-auto custom-scrollbar">
          <div
            v-for="user in filteredUsers"
            :key="user._id"
            class="grid grid-cols-4 md:grid-cols-[2fr_3fr_1fr_1.5fr] p-3 border-b border-color-bg-light/30 hover:bg-color-bg-light/20 transition-colors duration-200 relative group"
          >
            <!-- Indicateur de rôle (barre colorée) -->
            <div
              class="absolute left-0 top-0 bottom-0 w-1"
              :class="{
                'bg-color-text-muted/50': user.role === 'user',
                'bg-color-primary/70': user.role === 'admin',
                'bg-color-accent/70': user.role === 'superadmin',
              }"
            ></div>

            <!-- Nom d'utilisateur avec avatar -->
            <div class="flex items-center px-2">
              <div
                class="w-10 h-10 rounded-full mr-3 overflow-hidden flex items-center justify-center border-2"
                :class="{
                  'border-color-text-muted/30 bg-color-bg-light/50':
                    user.role === 'user',
                  'border-color-primary/30 bg-color-bg-light/50':
                    user.role === 'admin',
                  'border-color-accent/30 bg-color-bg-light/50':
                    user.role === 'superadmin',
                }"
              >
                <img
                  v-if="user.avatarUrl"
                  :src="user.avatarUrl"
                  :alt="user.username"
                  class="w-full h-full object-cover"
                  @error="handleAvatarError(user)"
                />
                <span v-else class="text-color-text font-nasa text-sm">
                  {{ getUserInitials(user.username) }}
                </span>
              </div>
              <span class="text-color-text font-nasa text-sm">
                {{ user.username }}
              </span>
            </div>

            <!-- Email -->
            <div
              class="flex items-center px-2 text-color-text-muted font-mono text-sm md:flex"
            >
              {{ user.email }}
            </div>

            <!-- Badge de rôle -->
            <div class="items-center px-2 hidden md:flex">
              <SpaceBadge
                :variant="
                  user.role === 'superadmin'
                    ? 'accent'
                    : user.role === 'admin'
                    ? 'primary'
                    : 'secondary'
                "
                className="capitalize"
              >
                {{ user.role }}
              </SpaceBadge>
            </div>

            <!-- Actions -->
            <div class="flex items-center px-2 gap-2">
              <!-- Sélecteur de rôle -->
              <div class="relative w-full">
                <SpaceDropdown
                  v-model="user.role"
                  @change="() => updateUserRole(user)"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </SpaceDropdown>
              </div>

              <!-- Bouton de suppression -->
              <Button
                @click="confirmDeleteUser(user)"
                variant="error"
                size="sm"
                className="p-1.5"
                :title="
                  user.role === 'superadmin'
                    ? 'Impossible de supprimer un superadmin'
                    : 'Supprimer cet utilisateur'
                "
                :disabled="user.role === 'superadmin'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>

          <!-- Message si aucun utilisateur trouvé -->
          <div v-if="filteredUsers.length === 0" class="py-10">
            <Terminal
              command="search --users"
              title="Recherche d'utilisateurs"
              :showCursor="true"
            >
              <div class="text-color-text-muted">
                Aucun utilisateur ne correspond à votre recherche
              </div>
            </Terminal>
          </div>
        </div>
      </Card>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <Card variant="primary" :noPadding="false" className="p-5">
          <div class="text-center">
            <div class="text-3xl text-color-text font-nasa mb-2">
              {{ users.length }}
            </div>
            <div class="text-sm text-color-text-muted font-nasa">
              Utilisateurs total
            </div>
          </div>
        </Card>

        <Card variant="primary" :noPadding="false" className="p-5">
          <div class="text-center">
            <div class="text-3xl text-color-text font-nasa mb-2">
              {{ users.filter((u) => u.role === "admin").length }}
            </div>
            <div class="text-sm text-color-text-muted font-nasa">
              Administrateurs
            </div>
          </div>
        </Card>

        <Card variant="primary" :noPadding="false" className="p-5">
          <div class="text-center">
            <div class="text-3xl text-color-text font-nasa mb-2">
              {{ users.filter((u) => u.role === "superadmin").length }}
            </div>
            <div class="text-sm text-color-text-muted font-nasa">
              Superadmins
            </div>
          </div>
        </Card>
      </div>
      <!-- Notifications -->
      <Toast v-if="error" type="error" :message="error" />
      <Toast v-if="success" type="success" :message="success" />
    </div>

    <!-- Dialogue de confirmation pour la suppression -->
    <SpaceModal
      v-model="showDeleteDialog"
      title="Confirmation de suppression"
      className="max-w-md"
    >
      <div class="text-color-text mb-6">
        {{ deleteConfirmMessage }}
      </div>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button @click="cancelDelete" variant="outline" size="sm">
            Annuler
          </Button>
          <Button
            @click="deleteUser"
            variant="error"
            size="sm"
            :loading="isDeleting"
          >
            Supprimer
          </Button>
        </div>
      </template>
    </SpaceModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import userService from "../../services/userService";
import Toast from "../../shared/Toast.vue";
import type { User } from "../../types";

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
const isLoading = ref(false); // État de chargement global
const isDeleting = ref(false); // État de chargement pour la suppression

/**
 * États pour la suppression
 */
const showDeleteDialog = ref(false);
const userToDelete = ref<User | null>(null);
const deleteConfirmMessage = ref("");

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
const showMessage = (
  type: "success" | "error",
  message: string,
  duration = 4000
) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }

  // Effacer le message après la durée spécifiée (4s pour le Toast spatial)
  if (duration > 0) {
    setTimeout(() => {
      if (type === "success") success.value = null;
      else error.value = null;
    }, duration);
  }
};

//-------------------------------------------------------
// SECTION: Appels API et gestion des données
//-------------------------------------------------------

/**
 * Récupère la liste des utilisateurs depuis l'API
 * Gère les erreurs avec des messages appropriés
 */
const fetchUsers = async () => {
  isLoading.value = true;
  try {
    users.value = await userService.fetchAllUsers();
  } catch (err: any) {
    console.error("Erreur lors de la récupération des utilisateurs:", err);
    // Message plus spécifique selon le type d'erreur
    const message =
      err.response?.status === 403
        ? "Vous n'avez pas les permissions nécessaires pour voir tous les utilisateurs."
        : "Erreur lors de la récupération des utilisateurs.";
    showMessage("error", message);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Met à jour le rôle d'un utilisateur
 * Envoie la requête à l'API et affiche un message de confirmation
 * @param user - Utilisateur à mettre à jour
 */
const updateUserRole = async (user: User) => {
  if (!user._id) return;

  try {
    await userService.updateUserRole(user._id, user.role);
    showMessage(
      "success",
      `Le rôle de ${user.username} a été mis à jour avec succès !`
    );
  } catch (err: any) {
    console.error("Erreur lors de la mise à jour du rôle:", err);
    showMessage("error", "Erreur lors de la mise à jour du rôle.");
    // Recharger les utilisateurs pour annuler les changements locaux
    fetchUsers();
  }
};

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
  deleteConfirmMessage.value = `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.username} ? Cette action supprimera également toutes les données associées et est irréversible.`;
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
  if (!userToDelete.value?._id) return;

  isDeleting.value = true;

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
    isDeleting.value = false;
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
/* Scrollbar personnalisée */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary-light) var(--color-bg);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--color-bg-light);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--color-primary-light);
  border-radius: 4px;
  border: 2px solid var(--color-bg);
}
</style>
