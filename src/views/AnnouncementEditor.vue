<template>
  <div
    class="min-h-screen bg-gradient-to-b from-purple-900/30 via-black to-blue-900/20 p-4 sm:p-8 pt-20 sm:pt-24"
  >
    <div class="max-w-5xl mx-auto">
      <!-- En-tête avec titre et effet néon -->
      <h1
        class="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-300 to-cyan-400 font-audiowide uppercase tracking-widest mb-8 sm:mb-10 text-center relative"
      >
        {{ isNewAnnouncement ? "Nouvelle Annonce" : "Modifier l'Annonce" }}
        <!-- Ligne néon en dessous du titre -->
        <span
          class="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-64 h-[2px] bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0 shadow-[0_0_10px_rgba(6,182,212,0.7)]"
        ></span>
      </h1>

      <!-- Navigation de retour avec style synthwave -->
      <div class="mb-8 flex items-center">
        <router-link
          to="/annonces"
          class="group inline-flex items-center text-cyan-400 hover:text-pink-400 font-orbitron uppercase tracking-wide transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="relative">
            <span class="relative z-10">Retour aux annonces</span>
            <span
              class="absolute inset-x-0 bottom-0 h-[1px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
            ></span>
          </span>
        </router-link>
      </div>

      <!-- Panneau d'édition avec style cyberpunk -->
      <div
        class="relative bg-black/75 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/70 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
      >
        <!-- Effet grille rétro en overlay -->
        <div
          class="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-10 pointer-events-none"
        ></div>

        <!-- Effet scanlines -->
        <div
          class="absolute inset-0 bg-[url('/scanline.png')] bg-repeat opacity-5 pointer-events-none"
        ></div>

        <!-- En-tête du panneau -->
        <div
          class="relative bg-gradient-to-r from-purple-900/90 via-indigo-900/50 to-purple-900/90 px-6 py-5 border-b-2 border-cyan-500/70"
        >
          <!-- Ligne néon horizontale -->
          <div
            class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-pink-500/0 via-cyan-400 to-pink-500/0 shadow-[0_0_8px_#0ff]"
          ></div>

          <h2
            class="text-xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 tracking-wider uppercase"
          >
            {{
              isNewAnnouncement
                ? "Création d'une nouvelle annonce"
                : "Modification de l'annonce"
            }}
          </h2>
          <p class="text-gray-400 text-sm mt-1 font-mono">
            Les champs marqués d'un <span class="text-pink-500">*</span> sont
            obligatoires
          </p>
        </div>

        <!-- Formulaire avec style synthwave -->
        <form
          @submit.prevent="saveAnnouncement"
          class="p-6 sm:p-8 relative z-10"
        >
          <!-- Titre -->
          <div class="mb-8">
            <label
              for="title"
              class="mb-2 text-cyan-400 font-orbitron flex items-center tracking-wide text-sm uppercase"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-pink-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                />
              </svg>
              Titre <span class="text-pink-500">*</span>
            </label>
            <div class="relative group">
              <input
                id="title"
                v-model="form.title"
                type="text"
                class="w-full bg-black/60 border-2 border-cyan-500/40 hover:border-cyan-500/60 focus:border-cyan-500 px-4 py-3 text-white font-orbitron placeholder-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
                placeholder="Titre de l'annonce"
              />
              <!-- Effet de lueur au focus -->
              <div
                class="absolute inset-0 rounded bg-cyan-400/0 group-focus-within:bg-cyan-400/10 blur-sm -z-10 transition-colors duration-300"
              ></div>

              <!-- Coins décoratifs -->
              <div
                class="absolute h-2 w-2 top-0 left-0 border-t-2 border-l-2 border-cyan-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute h-2 w-2 top-0 right-0 border-t-2 border-r-2 border-cyan-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute h-2 w-2 bottom-0 left-0 border-b-2 border-l-2 border-cyan-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute h-2 w-2 bottom-0 right-0 border-b-2 border-r-2 border-cyan-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
          </div>

          <!-- URL YouTube -->
          <div class="mb-8">
            <label
              for="youtubeUrl"
              class="mb-2 text-cyan-400 font-orbitron flex items-center tracking-wide text-sm uppercase"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-pink-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                />
              </svg>
              URL YouTube
              <span class="text-gray-500 normal-case tracking-normal font-mono"
                >(optionnel)</span
              >
            </label>
            <div class="relative group">
              <input
                id="youtubeUrl"
                v-model="form.youtubeUrl"
                type="text"
                class="w-full bg-black/60 border-2 border-pink-500/40 hover:border-pink-500/60 focus:border-pink-500 px-4 py-3 text-white font-mono placeholder-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all duration-300"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <!-- Effet de lueur au focus -->
              <div
                class="absolute inset-0 rounded bg-pink-400/0 group-focus-within:bg-pink-400/10 blur-sm -z-10 transition-colors duration-300"
              ></div>

              <!-- Coins décoratifs -->
              <div
                class="absolute h-2 w-2 top-0 left-0 border-t-2 border-l-2 border-pink-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute h-2 w-2 top-0 right-0 border-t-2 border-r-2 border-pink-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute h-2 w-2 bottom-0 left-0 border-b-2 border-l-2 border-pink-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute h-2 w-2 bottom-0 right-0 border-b-2 border-r-2 border-pink-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
              ></div>
            </div>

            <!-- Aperçu YouTube avec bordure synthwave -->
            <div
              v-if="form.youtubeUrl && youtubeEmbedUrl"
              class="mt-6 aspect-video w-full max-w-2xl mx-auto relative"
            >
              <div
                class="relative bg-black/90 p-2 border-2 border-cyan-500/30 rounded overflow-hidden"
              >
                <!-- Lignes de bordure coin supérieur gauche -->
                <div
                  class="absolute top-0 left-0 w-16 h-[2px] bg-pink-500"
                ></div>
                <div
                  class="absolute top-0 left-0 h-16 w-[2px] bg-pink-500"
                ></div>

                <!-- Lignes de bordure coin supérieur droit -->
                <div
                  class="absolute top-0 right-0 w-16 h-[2px] bg-cyan-400"
                ></div>
                <div
                  class="absolute top-0 right-0 h-16 w-[2px] bg-cyan-400"
                ></div>

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
                  class="w-full aspect-video"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <!-- Message d'aide vidéo -->
            <div
              v-if="form.youtubeUrl && youtubeEmbedUrl"
              class="mt-2 text-xs text-gray-300 font-mono flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1 text-cyan-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                class="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
              >
                Vidéo correctement intégrée
              </span>
            </div>
          </div>

          <!-- Éditeur de contenu avec style cyberpunk -->
          <div class="mb-10">
            <label
              for="content"
              class="mb-2 text-cyan-400 font-orbitron flex items-center tracking-wide text-sm uppercase"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-pink-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                />
              </svg>
              Contenu <span class="text-pink-500">*</span>
            </label>

            <!-- Cadre Éditeur avec style cyberpunk -->
            <div class="relative group">
              <div
                id="content-editor"
                class="min-h-[300px] border-2 border-purple-500/40 hover:border-purple-500/60 focus-within:border-purple-500 rounded overflow-hidden bg-black/60 shadow-lg shadow-purple-500/20 transition-all duration-300"
              >
                <!-- L'éditeur Tiptap sera injecté ici -->
              </div>

              <!-- Effet de lueur au focus -->
              <div
                class="absolute inset-0 rounded bg-purple-400/0 group-focus-within:bg-purple-400/10 blur-sm -z-10 transition-colors duration-300"
              ></div>

              <!-- Coins décoratifs -->
              <div
                class="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-pink-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-pink-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
          </div>

          <!-- Options de publication avec style synthwave -->
          <div class="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Option Publication -->
            <div
              class="group relative overflow-hidden bg-black/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 p-4"
            >
              <!-- Effet de scan -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 pointer-events-none"
              ></div>

              <div class="flex items-center space-x-4">
                <div
                  class="relative flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-800/30 border border-cyan-500/50"
                >
                  <input
                    id="published"
                    type="checkbox"
                    v-model="form.published"
                    class="appearance-none h-6 w-6 bg-black border-2 border-cyan-500/70 checked:bg-cyan-500/80 transition-colors duration-300 rounded-sm relative z-10"
                  />
                  <svg
                    v-if="form.published"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-black absolute z-20 pointer-events-none"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <!-- Halo effet -->
                  <div
                    class="absolute inset-0 rounded-full bg-cyan-500/20 blur-sm -z-10"
                  ></div>
                </div>

                <div>
                  <label
                    for="published"
                    class="text-lg font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer"
                  >
                    Publication
                  </label>
                  <p class="mt-1 text-sm text-gray-400 font-mono">
                    L'annonce sera visible par tous les utilisateurs
                  </p>
                </div>
              </div>
            </div>

            <!-- Option Featured -->
            <div
              class="group relative overflow-hidden bg-black/50 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 p-4"
            >
              <!-- Effet de scan -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/5 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 pointer-events-none"
              ></div>

              <div class="flex items-center space-x-4">
                <div
                  class="relative flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-pink-800/30 border border-pink-500/50"
                >
                  <input
                    id="featured"
                    type="checkbox"
                    v-model="form.featured"
                    class="appearance-none h-6 w-6 bg-black border-2 border-pink-500/70 checked:bg-pink-500/80 transition-colors duration-300 rounded-sm relative z-10"
                  />
                  <svg
                    v-if="form.featured"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-black absolute z-20 pointer-events-none"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <!-- Halo effet -->
                  <div
                    class="absolute inset-0 rounded-full bg-pink-500/20 blur-sm -z-10"
                  ></div>
                </div>

                <div>
                  <label
                    for="featured"
                    class="text-lg font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 cursor-pointer"
                  >
                    Mise en avant
                  </label>
                  <p class="mt-1 text-sm text-gray-400 font-mono">
                    L'annonce sera mise en avant sur le site
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Boutons d'action avec style cyberpunk -->
          <div
            class="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
          >
            <button
              type="button"
              @click="$router.push('/annonces')"
              class="group relative px-6 py-3 bg-gray-800/90 hover:bg-gray-700/90 text-gray-300 hover:text-white rounded border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 font-orbitron text-sm uppercase tracking-wider order-2 sm:order-1 overflow-hidden"
            >
              <!-- Effet de scan -->
              <span
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"
              ></span>

              <span class="relative z-10">Annuler</span>
            </button>

            <button
              type="submit"
              class="group relative px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white rounded transition-all duration-300 flex items-center justify-center font-orbitron text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 order-1 sm:order-2 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              :disabled="saving"
            >
              <!-- Effet de scan ligne au survol -->
              <span
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 pointer-events-none"
              ></span>

              <!-- Angles décoratifs -->
              <span
                class="absolute h-2 w-2 top-0 left-0 border-t border-l border-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></span>
              <span
                class="absolute h-2 w-2 top-0 right-0 border-t border-r border-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></span>
              <span
                class="absolute h-2 w-2 bottom-0 left-0 border-b border-l border-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></span>
              <span
                class="absolute h-2 w-2 bottom-0 right-0 border-b border-r border-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></span>

              <!-- Loader et texte -->
              <div class="relative z-10 flex items-center">
                <svg
                  v-if="saving"
                  class="animate-spin mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>{{
                  isNewAnnouncement ? "Créer l'annonce" : "Mettre à jour"
                }}</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import announcementService from "../services/announcementService";
import { Editor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";

const route = useRoute();
const router = useRouter();

const isNewAnnouncement = computed(() => route.path.includes("/nouveau"));
const editor = ref<Editor | null>(null);
const saving = ref(false);

const form = ref({
  title: "",
  content: "",
  youtubeUrl: "",
  published: true,
  featured: false,
});

const youtubeEmbedUrl = computed(() => {
  if (!form.value.youtubeUrl) return null;

  // Extract YouTube video ID from various URL formats
  const url = form.value.youtubeUrl;
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
  // Initialize TipTap editor with style synthwave
  editor.value = new Editor({
    element: document.querySelector("#content-editor") || undefined,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-cyan-400 hover:text-pink-400 no-underline border-b border-cyan-500/30 hover:border-pink-500/50 transition-all duration-300",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        protocols: ["http", "https", "mailto", "tel"],
      }),
      Image.configure({
        HTMLAttributes: {
          class:
            "rounded-lg border border-pink-500/30 shadow-md shadow-pink-500/20 max-w-full mx-auto my-4",
        },
      }),
      Placeholder.configure({
        placeholder: "Commencez à écrire du contenu...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-cyan focus:outline-none p-6 min-h-[300px] max-w-none bg-black/30 font-mono",
      },
      handleClick: ({ dom: event }) => {
        // Si le clic est sur un lien, ouvrir dans un nouvel onglet
        const clickedDOM = event as HTMLElement;
        if (clickedDOM.tagName === "A") {
          const href = clickedDOM.getAttribute("href");
          if (href) {
            window.open(href, "_blank", "noopener,noreferrer");
            return true; // Indiquer que l'événement a été géré
          }
        }
        return false; // Continuer avec le comportement par défaut
      },
    },
  });

  // Load announcement data if editing
  if (!isNewAnnouncement.value) {
    try {
      const id = route.params.id as string;
      const data = await announcementService.getAnnouncement(id);

      form.value = {
        title: data.title,
        content: data.content,
        youtubeUrl: data.youtubeUrl || "",
        published: data.published,
        featured: data.featured,
      };

      if (editor.value) {
        editor.value.commands.setContent(data.content);
      }
    } catch (error) {
      console.error("Error loading announcement:", error);
      router.push("/annonces");
    }
  }
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

const saveAnnouncement = async () => {
  if (!editor.value) return;

  // Update form content with editor content
  form.value.content = editor.value.getHTML();

  // Validate form
  if (!form.value.title || !form.value.content) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  saving.value = true;

  try {
    if (isNewAnnouncement.value) {
      // Create new announcement
      const createdAnnouncement = await announcementService.createAnnouncement(
        form.value
      );
      router.push(`/annonces/${createdAnnouncement._id}`);
    } else {
      // Update existing announcement
      const id = route.params.id as string;
      await announcementService.updateAnnouncement(id, form.value);
      router.push(`/annonces/${id}`);
    }
  } catch (error) {
    console.error("Error saving announcement:", error);
    alert("Une erreur est survenue lors de la sauvegarde. Veuillez réessayer.");
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
/* Animation de scan vers le bas */
@keyframes scan-down {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

/* Styles pour le contenu de l'éditeur */
:deep(.ProseMirror) {
  min-height: 300px;
  padding: 1rem;
  color: white;
  font-family: "Share Tech Mono", monospace;
  transition: all 0.3s ease;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #64748b;
  pointer-events: none;
  height: 0;
}

:deep(.ProseMirror h1) {
  color: transparent;
  background-clip: text;
  background-image: linear-gradient(to right, #06b6d4, #ec4899);
  font-family: "Orbitron", sans-serif;
  letter-spacing: 0.05em;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

:deep(.ProseMirror h2) {
  color: transparent;
  background-clip: text;
  background-image: linear-gradient(to right, #06b6d4, #a855f7);
  font-family: "Orbitron", sans-serif;
  letter-spacing: 0.05em;
  font-size: 1.25rem;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

:deep(.ProseMirror ul) {
  list-style-type: none;
  padding-left: 1.5em;
}

:deep(.ProseMirror ul li) {
  position: relative;
}

:deep(.ProseMirror ul li::before) {
  content: "►";
  color: #06b6d4;
  font-size: 0.8em;
  display: inline-block;
  width: 1.5em;
  margin-left: -1.5em;
}

:deep(.ProseMirror ol) {
  list-style-type: none;
  counter-reset: item;
  padding-left: 1.5em;
}

:deep(.ProseMirror ol li) {
  counter-increment: item;
  position: relative;
}

:deep(.ProseMirror ol li::before) {
  content: counter(item);
  color: #ec4899;
  font-weight: bold;
  display: inline-block;
  width: 1.5em;
  margin-left: -1.5em;
  margin-right: 0.5em;
  text-align: right;
  font-family: "Orbitron", sans-serif;
}

:deep(.ProseMirror blockquote) {
  border-left: 2px solid #ec4899;
  padding-left: 1rem;
  font-style: italic;
  color: #9ca3af;
}

:deep(.ProseMirror a) {
  color: #06b6d4;
  text-decoration: none;
  border-bottom: 1px solid rgba(6, 182, 212, 0.3);
  transition: all 0.2s ease;
}

:deep(.ProseMirror a:hover) {
  color: #ec4899;
  border-bottom-color: rgba(236, 72, 153, 0.5);
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.8);
}
</style>
-
