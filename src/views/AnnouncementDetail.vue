<template>
  <div
    class="min-h-screen bg-gradient-to-b from-purple-900/30 via-black to-blue-900/20 p-4 sm:p-8 pt-20 sm:pt-24"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Loader avec style cyberpunk -->
      <div v-if="loading" class="flex justify-center py-12">
        <CyberpunkLoader />
      </div>

      <!-- Contenu de l'annonce -->
      <div
        v-else-if="announcement"
        class="relative bg-black/75 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/70 shadow-[0_0_25px_rgba(168,85,247,0.4)] animate-pulse-slow"
      >
        <!-- Effet grille rétro en overlay -->
        <div
          class="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-10 pointer-events-none"
        ></div>

        <!-- Effet scanlines -->
        <div
          class="absolute inset-0 bg-[url('/scanline.png')] bg-repeat opacity-5 pointer-events-none"
        ></div>

        <!-- En-tête avec design amélioré -->
        <div
          class="relative bg-gradient-to-r from-purple-900/90 via-indigo-900/50 to-purple-900/90 px-6 py-6 border-b-2 border-cyan-500/70"
        >
          <!-- Ligne néon horizontale -->
          <div
            class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-pink-500/0 via-cyan-400 to-pink-500/0 shadow-[0_0_8px_#0ff]"
          ></div>

          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div class="mb-4 sm:mb-0">
              <router-link
                to="/annonces"
                class="group inline-flex items-center text-cyan-400 hover:text-pink-400 mb-3 font-orbitron transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span class="relative">
                  <span class="relative z-10">RETOUR</span>
                  <span
                    class="absolute inset-x-0 bottom-0 h-[1px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                  ></span>
                </span>
              </router-link>

              <h1
                class="relative text-3xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-300 to-cyan-400 tracking-wider uppercase"
              >
                {{ announcement.title }}
                <span
                  v-if="announcement.featured"
                  class="ml-2 px-2 py-0.5 bg-pink-700/30 text-pink-400 text-xs uppercase rounded-sm inline-block align-middle border border-pink-500/50"
                >
                  Featured
                </span>
                <!-- Ajouter un underline néon -->
                <span
                  class="absolute bottom-[-5px] left-0 w-1/3 h-[2px] bg-gradient-to-r from-cyan-400 to-pink-500 shadow-[0_0_5px_#0ff]"
                ></span>
              </h1>
            </div>

            <!-- Actions admin avec design amélioré -->
            <div v-if="isAdmin" class="flex space-x-2">
              <button
                @click="navigateToEdit"
                class="relative overflow-hidden bg-gradient-to-r from-purple-800 to-cyan-800 text-white py-2 px-4 rounded-sm font-orbitron text-sm uppercase tracking-widest border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300 group"
              >
                <!-- Effet de survol néon -->
                <span
                  class="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"
                ></span>

                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
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
                  MODIFIER
                </div>
              </button>
            </div>
          </div>

          <div
            class="mt-4 flex flex-wrap items-center text-sm text-gray-400 font-light"
          >
            <div class="flex items-center mr-6 mb-2 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2 text-pink-400 group-hover:text-cyan-400 transition-colors duration-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-mono">{{
                formatDate(announcement.createdAt)
              }}</span>
            </div>
            <span
              v-if="announcement.createdBy"
              class="flex items-center mb-2 group"
            >
              <span class="mr-2 text-gray-500">•</span>
              <span class="mr-2 text-gray-400">Par</span>
              <div class="relative">
                <img
                  :src="
                    announcement.createdBy.avatarUrl ||
                    'https://cdn.discordapp.com/embed/avatars/0.png'
                  "
                  alt="Avatar"
                  class="w-6 h-6 rounded-full mr-2 border-2 border-cyan-500/50 group-hover:border-pink-500/70 transition-colors duration-300 p-[2px] bg-black/50"
                />
                <!-- Glow effect -->
                <div
                  class="absolute inset-0 rounded-full bg-cyan-400/20 group-hover:bg-pink-400/20 blur-sm -z-10 transition-colors duration-300"
                ></div>
              </div>
              <span
                class="font-mono text-cyan-300 group-hover:text-pink-300 transition-colors duration-300"
                >{{ announcement.createdBy.username }}</span
              >
            </span>
          </div>
        </div>

        <!-- Contenu principal avec design amélioré -->
        <div class="p-6 sm:p-8 space-y-8 relative z-10">
          <!-- Vidéo YouTube avec design de console/arcade -->
          <div
            v-if="announcement.youtubeUrl && youtubeEmbedUrl"
            class="relative mb-8 aspect-video w-full overflow-hidden"
          >
            <!-- Cadre stye terminal/moniteur rétro -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-black/10 to-purple-900/30 pointer-events-none border-2 border-cyan-500/70 z-10"
            ></div>
            <div
              class="absolute inset-[-1px] border-2 border-black z-20 pointer-events-none"
            ></div>

            <!-- Lignes de bordure coin supérieur gauche -->
            <div class="absolute top-0 left-0 w-16 h-[2px] bg-pink-500"></div>
            <div class="absolute top-0 left-0 h-16 w-[2px] bg-pink-500"></div>

            <!-- Lignes de bordure coin supérieur droit -->
            <div class="absolute top-0 right-0 w-16 h-[2px] bg-cyan-400"></div>
            <div class="absolute top-0 right-0 h-16 w-[2px] bg-cyan-400"></div>

            <!-- Lignes de bordure coin inférieur gauche -->
            <div
              class="absolute bottom-0 left-0 w-16 h-[2px] bg-cyan-400"
            ></div>
            <div
              class="absolute bottom-0 left-0 h-16 w-[2px] bg-cyan-400"
            ></div>

            <!-- Lignes de bordure coin inférieur droit -->
            <div
              class="absolute bottom-0 right-0 w-16 h-[2px] bg-pink-500"
            ></div>
            <div
              class="absolute bottom-0 right-0 h-16 w-[2px] bg-pink-500"
            ></div>

            <iframe
              :src="youtubeEmbedUrl"
              class="w-full h-full"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <!-- Contenu HTML avec style terminal rétro -->
          <div
            class="prose prose-invert prose-cyan max-w-none bg-black/60 p-6 sm:p-8 rounded-sm border-l-4 border-t border-r border-b border-cyan-500/50 relative overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            v-html="announcement.content"
          ></div>

          <!-- Bouton de retour bas de page amélioré -->
          <div class="flex justify-center mt-10">
            <router-link
              to="/annonces"
              class="group relative bg-gradient-to-r from-purple-800 to-blue-900 hover:from-pink-600 hover:to-purple-800 text-white py-3 px-6 overflow-hidden transition-all duration-500 uppercase tracking-widest font-orbitron text-sm"
            >
              <!-- Bordure brillante -->
              <span
                class="absolute inset-0 border border-cyan-400/50 group-hover:border-pink-400/70 transition-colors duration-300"
              ></span>

              <!-- Angle supérieur gauche -->
              <span
                class="absolute h-2 w-2 top-0 left-0 border-t border-l border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"
              ></span>

              <!-- Angle supérieur droit -->
              <span
                class="absolute h-2 w-2 top-0 right-0 border-t border-r border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"
              ></span>

              <!-- Angle inférieur gauche -->
              <span
                class="absolute h-2 w-2 bottom-0 left-0 border-b border-l border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"
              ></span>

              <!-- Angle inférieur droit -->
              <span
                class="absolute h-2 w-2 bottom-0 right-0 border-b border-r border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"
              ></span>

              <!-- Effet scan -->
              <span
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              ></span>

              <div class="flex items-center relative z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                RETOUR AUX ANNONCES
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Message d'erreur avec style amélioré -->
      <div
        v-else
        class="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-black/60 border-2 border-pink-500/50 rounded-sm overflow-hidden"
      >
        <!-- Effet de glitch -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-blue-500/10 animate-pulse-slow"
        ></div>

        <!-- Lignes de coin -->
        <div class="absolute top-0 left-0 w-12 h-[2px] bg-pink-500"></div>
        <div class="absolute top-0 left-0 h-12 w-[2px] bg-pink-500"></div>
        <div class="absolute bottom-0 right-0 w-12 h-[2px] bg-pink-500"></div>
        <div class="absolute bottom-0 right-0 h-12 w-[2px] bg-pink-500"></div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 sm:h-20 sm:w-20 text-pink-500 mb-6 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p
          class="text-white font-orbitron text-center mb-6 uppercase tracking-widest text-xl"
        >
          Cette annonce n'existe pas ou a été supprimée.
        </p>
        <router-link
          to="/annonces"
          class="relative overflow-hidden bg-gradient-to-r from-cyan-900 to-purple-900 hover:from-pink-700 hover:to-purple-800 text-white py-3 px-6 uppercase tracking-widest font-orbitron text-sm border border-pink-500/50 hover:border-cyan-400 transition-all duration-300 group"
        >
          <!-- Effet de scan -->
          <span
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
          ></span>

          <div class="flex items-center relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            RETOUR AUX ANNONCES
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import announcementService from "../services/announcementService";
import { useUserStore } from "../stores/userStore";
import type { Announcement } from "../types/Announcement";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const announcement = ref<Announcement | null>(null);
const loading = ref(true);

const isAdmin = computed(() => {
  const user = userStore.user;
  return user && (user.role === "admin" || user.role === "superadmin");
});

const youtubeEmbedUrl = computed(() => {
  if (!announcement.value?.youtubeUrl) return null;

  // Extract YouTube video ID from various URL formats
  const url = announcement.value.youtubeUrl;
  let videoId = "";

  if (url.includes("youtube.com/watch?v=")) {
    videoId = new URL(url).searchParams.get("v") || "";
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("youtube.com/embed/")[1].split("?")[0];
  }

  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
});

onMounted(async () => {
  const id = route.params.id as string;

  try {
    announcement.value = await announcementService.getAnnouncement(id);
  } catch (error) {
    console.error("Error fetching announcement:", error);
    announcement.value = null;
  } finally {
    loading.value = false;
  }
});

const navigateToEdit = () => {
  router.push(`/annonces/${route.params.id}/edit`);
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
</script>

<style scoped>
/* Animations personnalisées */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
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
  letter-spacing: 0.1em;
  margin-top: 2em;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
}

:deep(.prose h1::after),
:deep(.prose h2::after),
:deep(.prose h3::after) {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, #06b6d4, #ec4899);
  transform-origin: left;
  transform: scaleX(0.3);
  transition: transform 0.3s ease;
}

:deep(.prose h1:hover::after),
:deep(.prose h2:hover::after),
:deep(.prose h3:hover::after) {
  transform: scaleX(1);
}

:deep(.prose a) {
  color: #06b6d4; /* text-cyan-500 */
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
  padding-bottom: 1px;
}

:deep(.prose a:hover) {
  color: #ec4899; /* text-pink-500 */
  text-shadow: 0 0 8px rgba(236, 72, 153, 0.5);
}

:deep(.prose a::after) {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(to right, #06b6d4, #ec4899);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s;
}

:deep(.prose a:hover::after) {
  transform: scaleX(1);
  transform-origin: bottom left;
}

:deep(.prose blockquote) {
  border-left: 3px solid #ec4899; /* border-pink-500 */
  background-color: rgba(31, 41, 55, 0.4);
  padding: 1rem 1.5rem;
  border-radius: 0;
  position: relative;
  margin-left: 0;
  font-style: italic;
}

:deep(.prose blockquote::before) {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, #ec4899, #06b6d4);
}

:deep(.prose ul) {
  list-style-type: none;
  padding-left: 1.5em;
}

:deep(.prose ul li) {
  position: relative;
  padding-left: 1.5em;
  margin-bottom: 0.5em;
}

:deep(.prose ul li::before) {
  content: "▶";
  color: #06b6d4; /* text-cyan-500 */
  font-size: 0.7em;
  position: absolute;
  left: 0;
  top: 0.5em;
}

:deep(.prose ul li:hover::before) {
  color: #ec4899; /* text-pink-500 */
  transform: translateX(2px);
  transition: all 0.2s ease;
}

:deep(.prose ol) {
  list-style-type: none;
  counter-reset: item;
  padding-left: 1.5em;
}

:deep(.prose ol li) {
  counter-increment: item;
  position: relative;
  padding-left: 1.5em;
  margin-bottom: 0.5em;
}

:deep(.prose ol li::before) {
  content: counter(item);
  color: #ec4899; /* text-pink-500 */
  font-weight: bold;
  position: absolute;
  left: 0;
  top: 0.1em;
  font-family: "Orbitron", sans-serif;
  font-size: 0.9em;
}

:deep(.prose img) {
  border-radius: 0;
  border: 1px solid rgba(236, 72, 153, 0.3);
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.3);
  position: relative;
}

:deep(.prose table) {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  border: 1px solid rgba(6, 182, 212, 0.3);
  overflow: hidden;
}

:deep(.prose th) {
  background-color: rgba(6, 182, 212, 0.1);
  color: #06b6d4; /* text-cyan-500 */
  font-family: "Orbitron", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.85em;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(6, 182, 212, 0.2);
}

:deep(.prose td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(6, 182, 212, 0.1);
  font-family: "Share Tech Mono", monospace;
}

:deep(.prose tr:last-child td) {
  border-bottom: none;
}

:deep(.prose tr:nth-child(even)) {
  background-color: rgba(0, 0, 0, 0.2);
}

:deep(.prose tr:hover) {
  background-color: rgba(236, 72, 153, 0.1);
  transition: background-color 0.3s ease;
}

:deep(.prose code) {
  background-color: rgba(6, 182, 212, 0.1);
  color: #ec4899;
  padding: 0.2em 0.4em;
  border-radius: 0.2em;
  font-family: "Share Tech Mono", monospace;
  border: 1px solid rgba(6, 182, 212, 0.2);
}

:deep(.prose pre) {
  background-color: rgba(0, 0, 0, 0.7);
  border-left: 3px solid #06b6d4;
  border-radius: 0;
  padding: 1em;
  overflow-x: auto;
}

:deep(.prose pre code) {
  background-color: transparent;
  border: none;
  padding: 0;
  color: #d1d5db;
}
</style>
