<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\AnnouncementList.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-b from-purple-900/30 via-black to-blue-900/20 pt-20 sm:pt-24 pb-16"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Effet grille rétro en overlay -->
      <div
        class="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-10 pointer-events-none"
      ></div>

      <!-- Effet scanlines -->
      <div
        class="absolute inset-0 bg-[url('/scanline.png')] bg-repeat opacity-5 pointer-events-none"
      ></div>

      <!-- En-tête avec titre et bouton "Nouvelle annonce" pour les admins -->
      <div class="relative mb-12 text-center">
        <h1
          class="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-300 to-cyan-400 font-audiowide uppercase tracking-widest mb-6 sm:mb-8"
        >
          Dernières annonces
        </h1>

        <div
          class="w-32 h-1 mx-auto bg-gradient-to-r from-cyan-400 to-pink-500 rounded shadow-[0_0_10px_rgba(6,182,212,0.7)]"
        ></div>

        <!-- Sous-titre avec design cyberpunk -->
        <div class="mt-4 inline-block border-b-2 border-pink-500/50 pb-1 px-6">
          <span
            class="text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 font-orbitron"
          >
            Actualités & Communications
          </span>
        </div>
      </div>

      <!-- Barre d'actions avec design amélioré -->
      <div class="mb-10 flex justify-end">
        <div v-if="isAdmin">
          <button
            @click="navigateToNewAnnouncement"
            class="group relative overflow-hidden bg-gradient-to-r from-purple-800 to-cyan-800 text-white py-2.5 px-5 font-orbitron text-sm uppercase tracking-widest border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300"
          >
            <!-- Effet de survol néon -->
            <span
              class="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"
            ></span>

            <!-- Angles décoratifs -->
            <span
              class="absolute h-2 w-2 top-0 left-0 border-t border-l border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"
            ></span>
            <span
              class="absolute h-2 w-2 top-0 right-0 border-t border-r border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"
            ></span>
            <span
              class="absolute h-2 w-2 bottom-0 left-0 border-b border-l border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"
            ></span>
            <span
              class="absolute h-2 w-2 bottom-0 right-0 border-b border-r border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"
            ></span>

            <div class="flex items-center relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nouvelle annonce
            </div>
          </button>
        </div>
      </div>

      <!-- Loader avec style cyberpunk -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="relative h-20 w-20">
          <div
            class="absolute inset-0 h-full w-full border-4 border-transparent border-t-cyan-500 border-b-pink-500 rounded-full animate-spin"
          ></div>
          <div
            class="absolute inset-1 h-full w-full border-2 border-transparent border-l-purple-500 border-r-cyan-500 rounded-full animate-spin-slow"
          ></div>
          <div
            class="absolute inset-0 flex items-center justify-center text-cyan-400 text-xs font-mono"
          >
            LOADING
          </div>
        </div>
      </div>

      <!-- Message si aucune annonce -->
      <div
        v-else-if="announcements.length === 0"
        class="relative bg-black/50 backdrop-blur-sm border border-pink-500/30 shadow-lg shadow-pink-500/10 rounded-lg p-12 text-center max-w-md mx-auto overflow-hidden"
      >
        <!-- Décoration coins -->
        <div class="absolute top-0 left-0 w-10 h-[2px] bg-cyan-500"></div>
        <div class="absolute top-0 left-0 h-10 w-[2px] bg-cyan-500"></div>
        <div class="absolute bottom-0 right-0 w-10 h-[2px] bg-pink-500"></div>
        <div class="absolute bottom-0 right-0 h-10 w-[2px] bg-pink-500"></div>

        <!-- Effet de scan -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[scan_3s_ease-in-out_infinite]"
        ></div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto mb-6 text-cyan-500/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <p class="text-gray-400 font-orbitron uppercase tracking-wider">
          Aucune annonce pour le moment.
        </p>
      </div>

      <!-- Liste des annonces avec design amélioré -->
      <div v-else class="grid gap-8">
        <div
          v-for="announcement in announcements"
          :key="announcement._id"
          class="group relative bg-black/75 backdrop-blur-sm border border-gray-800/70 rounded-lg overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <!-- Effet de survol subtil -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-800/0 via-purple-800/10 to-purple-800/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1500 pointer-events-none"
          ></div>

          <!-- En-tête de l'annonce -->
          <div
            class="bg-gradient-to-r from-gray-900/90 via-purple-900/20 to-gray-900/90 px-6 py-5 border-b border-cyan-500/30 relative"
          >
            <!-- Ligne néon au bas de l'en-tête -->
            <div
              class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-400/70 to-cyan-500/0 shadow-[0_0_5px_#0ff] opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <div
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >
              <h2
                class="text-xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 group-hover:from-pink-400 group-hover:to-cyan-500 transition-all duration-500"
              >
                {{ announcement.title }}
                <span
                  v-if="announcement.featured"
                  class="ml-2 px-2 py-0.5 bg-pink-700/30 text-pink-400 text-xs uppercase rounded align-middle border border-pink-500/30"
                >
                  Featured
                </span>
              </h2>

              <!-- Actions admin avec design amélioré -->
              <div v-if="isAdmin" class="flex space-x-3">
                <button
                  @click="navigateToEdit(announcement._id)"
                  class="p-1.5 rounded bg-gray-800/70 text-cyan-400 hover:bg-cyan-900/30 hover:text-cyan-300 transition-all duration-300 border border-cyan-500/0 hover:border-cyan-500/50"
                  title="Modifier l'annonce"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  @click="confirmDelete(announcement._id)"
                  class="p-1.5 rounded bg-gray-800/70 text-pink-400 hover:bg-pink-900/30 hover:text-pink-300 transition-all duration-300 border border-pink-500/0 hover:border-pink-500/50"
                  title="Supprimer l'annonce"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              class="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-4 font-mono"
            >
              <div class="flex items-center group/date">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1 text-pink-400 group-hover/date:text-cyan-400 transition-colors duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span
                  class="group-hover/date:text-cyan-300 transition-colors duration-300"
                  >{{ formatDate(announcement.createdAt) }}</span
                >
              </div>
              <div
                v-if="announcement.createdBy"
                class="flex items-center group/user"
              >
                <div class="relative">
                  <img
                    :src="
                      announcement.createdBy.avatarUrl ||
                      'https://cdn.discordapp.com/embed/avatars/0.png'
                    "
                    alt="Avatar"
                    class="w-5 h-5 rounded-full mr-2 border border-cyan-500/30 group-hover/user:border-pink-500/50 transition-all duration-300 p-[1px] bg-black/50"
                  />
                  <!-- Glow effect -->
                  <div
                    class="absolute inset-0 rounded-full bg-cyan-400/10 group-hover/user:bg-pink-400/10 blur-sm -z-10 transition-colors duration-300"
                  ></div>
                </div>
                <span
                  class="text-cyan-300/70 group-hover/user:text-pink-300/70 transition-colors duration-300"
                  >{{ announcement.createdBy.username }}</span
                >
              </div>
            </div>
          </div>

          <!-- Aperçu du contenu avec design amélioré -->
          <div class="relative px-6 py-6">
            <!-- Vignette pour donner un effet de profondeur -->
            <div
              class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none"
            ></div>

            <!-- Contenu et bouton -->
            <div class="relative z-10">
              <div
                class="prose prose-sm prose-invert prose-cyan max-w-none line-clamp-3 mb-3"
                v-html="truncateHTML(announcement.content, 150)"
              ></div>

              <!-- YouTube preview avec badge amélioré -->
              <div
                v-if="announcement.youtubeUrl"
                class="mt-3 inline-flex items-center bg-pink-900/30 border border-pink-500/30 rounded-full px-3 py-1 text-pink-400 text-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Contient une vidéo
              </div>

              <!-- Bouton lire la suite amélioré -->
              <div class="mt-5">
                <router-link
                  :to="`/annonces/${announcement._id}`"
                  class="inline-flex items-center group/button relative"
                >
                  <span
                    class="relative overflow-hidden bg-transparent text-cyan-400 group-hover/button:text-pink-400 transition-colors duration-300 font-orbitron uppercase tracking-wider text-sm py-1"
                  >
                    Lire la suite

                    <!-- Ligne animée -->
                    <span
                      class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400/30 via-cyan-400 to-cyan-400/30 transform scale-x-0 group-hover/button:scale-x-100 transition-transform duration-300 origin-left"
                    ></span>
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 ml-2 text-cyan-400 group-hover/button:text-pink-400 transition-colors duration-300 transform group-hover/button:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination potentielle -->
      <div class="mt-16 flex justify-center">
        <!-- Pagination placeholder, à implémenter si nécessaire -->
      </div>

      <!-- Confirmation de suppression avec style amélioré -->
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 flex items-center justify-center z-[9999] bg-black/80 backdrop-blur-md"
      >
        <div
          class="relative bg-black/90 border-2 border-pink-500/50 shadow-lg shadow-pink-500/20 rounded-lg p-8 max-w-md w-full mx-4 animate-fade-in overflow-hidden"
        >
          <!-- Coins décoratifs -->
          <div class="absolute top-0 left-0 w-16 h-[2px] bg-pink-500"></div>
          <div class="absolute top-0 left-0 h-16 w-[2px] bg-pink-500"></div>
          <div class="absolute bottom-0 right-0 w-16 h-[2px] bg-pink-500"></div>
          <div class="absolute bottom-0 right-0 h-16 w-[2px] bg-pink-500"></div>

          <!-- Effet de scanline -->
          <div
            class="absolute inset-0 bg-[url('/scanline.png')] bg-repeat opacity-5 pointer-events-none"
          ></div>

          <h3
            class="text-xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-6 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-3 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Confirmer la suppression
          </h3>

          <div class="mb-8 pl-9 border-l-2 border-pink-500/30">
            <p class="text-gray-300 mb-3">
              Êtes-vous sûr de vouloir supprimer cette annonce ?
            </p>
            <p class="text-pink-400 font-mono text-sm">
              Cette action est irréversible.
            </p>
          </div>

          <div class="flex justify-end space-x-4">
            <button
              @click="showDeleteConfirm = false"
              class="group relative px-5 py-2 bg-gray-900 text-gray-300 rounded overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <!-- Effet de scan -->
              <span
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"
              ></span>

              <span class="relative z-10">Annuler</span>
            </button>

            <button
              @click="deleteSelectedAnnouncement"
              class="group relative px-5 py-2 bg-gradient-to-r from-red-700 to-pink-700 hover:from-red-600 hover:to-pink-600 text-white rounded overflow-hidden shadow-md shadow-pink-700/20 transition-all duration-300"
            >
              <!-- Effet de scan -->
              <span
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"
              ></span>

              <span class="relative z-10">Supprimer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import announcementService from "../services/announcementService";
import { useUserStore } from "../stores/userStore";
import type { Announcement } from "../types/Announcement";

const router = useRouter();
const userStore = useUserStore();
const isAdmin = computed(() => {
  const user = userStore.user;
  return user && (user.role === "admin" || user.role === "superadmin");
});

const announcements = ref<Announcement[]>([]);
const loading = ref(true);
const showDeleteConfirm = ref(false);
const announcementToDelete = ref<string | null>(null);

// Fetch announcements from API
onMounted(async () => {
  try {
    announcements.value = await announcementService.getAnnouncements();
  } catch (error) {
    console.error("Error fetching announcements:", error);
  } finally {
    loading.value = false;
  }
});

const navigateToNewAnnouncement = () => {
  router.push("/annonces/nouveau");
};

const navigateToEdit = (id: string) => {
  router.push(`/annonces/${id}/edit`);
};

const confirmDelete = (id: string) => {
  announcementToDelete.value = id;
  showDeleteConfirm.value = true;
};

const deleteSelectedAnnouncement = async () => {
  if (!announcementToDelete.value) return;

  try {
    await announcementService.deleteAnnouncement(announcementToDelete.value);
    announcements.value = announcements.value.filter(
      (a) => a._id !== announcementToDelete.value
    );
    showDeleteConfirm.value = false;
    announcementToDelete.value = null;
  } catch (error) {
    console.error("Error deleting announcement:", error);
  }
};

// Format date to French locale
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Truncate HTML content for preview
const truncateHTML = (html: string, maxLength: number) => {
  // Simple HTML truncation (not perfect but works for basic cases)
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";

  if (text.length <= maxLength) return html;

  return text.substring(0, maxLength) + "...";
};
</script>

<style scoped>
/* Animation de rotation lente */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

/* Animation de scan horizontal */
@keyframes scan {
  0%,
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(100%);
    opacity: 1;
  }
}

/* Animation d'apparition */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

/* Limitation de lignes (line-clamp) */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Styles pour le contenu généré */
:deep(.prose) {
  color: #d1d5db; /* text-gray-300 */
  font-family: "Share Tech Mono", monospace;
}

:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3) {
  color: transparent;
  background-clip: text;
  background-image: linear-gradient(to right, #06b6d4, #ec4899);
  font-family: "Orbitron", sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

:deep(.prose a) {
  color: #06b6d4; /* text-cyan-500 */
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
}

:deep(.prose a:hover) {
  color: #ec4899; /* text-pink-500 */
  text-shadow: 0 0 8px rgba(236, 72, 153, 0.5);
}

:deep(.prose blockquote) {
  border-left: 2px solid #ec4899; /* border-pink-500 */
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 0;
}

:deep(.prose ul) {
  list-style-type: none;
  padding-left: 1em;
}

:deep(.prose ul li::before) {
  content: "►";
  color: #06b6d4; /* text-cyan-500 */
  font-size: 0.8em;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

:deep(.prose img) {
  border: 1px solid rgba(236, 72, 153, 0.3);
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.3);
}

:deep(.prose code) {
  background-color: rgba(6, 182, 212, 0.1);
  color: #ec4899;
  padding: 0.2em 0.4em;
  border-radius: 0.2em;
  font-family: "Share Tech Mono", monospace;
  border: 1px solid rgba(6, 182, 212, 0.2);
}
</style>
