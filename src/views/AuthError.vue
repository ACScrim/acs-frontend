<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900 p-4"
  >
    <div
      class="max-w-md w-full p-6 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-red-500/40 shadow-lg"
    >
      <div class="text-center mb-6">
        <div
          class="inline-block p-3 rounded-full bg-red-900/50 border border-red-500/50 mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 class="text-xl font-audiowide text-red-400 mb-2">{{ title }}</h2>
        <p class="text-white mb-4">{{ message }}</p>

        <!-- Affichage spécifique pour l'erreur de serveur Discord -->
        <div v-if="errorType === 'guild_required'" class="mb-6">
          <a
            :href="inviteLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-orbitron rounded-md transition-colors shadow-lg shadow-indigo-600/30"
          >
            Rejoindre le serveur Discord
          </a>

          <p class="text-gray-400 text-sm mt-4">
            Après avoir rejoint le serveur Discord,
            <button
              @click="retryAuth"
              class="text-indigo-400 underline hover:text-indigo-300"
            >
              reconnectez-vous
            </button>
          </p>
        </div>

        <div v-else class="mb-6">
          <button
            @click="retryAuth"
            class="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-orbitron rounded-md transition-colors shadow-lg shadow-indigo-600/30"
          >
            Réessayer la connexion
          </button>
        </div>

        <button
          @click="goHome"
          class="px-4 py-2 text-gray-300 hover:text-white font-orbitron transition-colors"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const errorType = ref("");
const title = ref("Erreur d'authentification");
const message = ref("Une erreur est survenue lors de la connexion.");
const inviteLink = ref(
  import.meta.env.VITE_DISCORD_INVITE_LINK || "https://discord.gg/ksCGJztmBd"
);
// Récupération des variables d'environnement pour OAuth2
const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;

// Rediriger vers la page d'accueil
const goHome = () => {
  router.push("/");
};

// Réessayer l'authentification
const retryAuth = () => {
  window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=identify+guilds+email`;
};

onMounted(() => {
  // Récupérer les paramètres de l'URL
  errorType.value = route.query.type || "";

  if (route.query.message) {
    message.value = decodeURIComponent(route.query.message);
  }

  if (route.query.inviteLink) {
    inviteLink.value = decodeURIComponent(route.query.inviteLink);
  }

  // Définir le titre en fonction du type d'erreur
  switch (errorType.value) {
    case "guild_required":
      title.value = "Accès restreint";
      message.value =
        message.value ||
        "Vous devez être membre du serveur Discord ACS pour accéder à ce site.";
      break;
    case "api_error":
      title.value = "Erreur API Discord";
      message.value =
        message.value || "Impossible d'accéder à vos informations Discord.";
      break;
    default:
      title.value = "Erreur d'authentification";
  }
});
</script>
