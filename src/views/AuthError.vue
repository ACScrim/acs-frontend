<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- Grille spatiale en arrière-plan -->
    <div
      class="space-grid absolute inset-0 opacity-20 pointer-events-none z-0"
    ></div>

    <!-- Particules d'étoiles -->
    <div
      v-for="n in 15"
      :key="`star-${n}`"
      class="absolute h-1 w-1 rounded-full bg-white animate-pulse"
      :style="{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random() * 0.7 + 0.3,
      }"
    ></div>

    <!-- Planète erreur en arrière-plan -->
    <div
      class="absolute opacity-30 pointer-events-none"
      style="top: -15%; right: -15%; width: 50%; height: 50%"
    >
      <div
        class="w-full h-full rounded-full bg-color-error-dark/30 blur-2xl relative"
      >
        <div
          class="absolute inset-0 rounded-full bg-gradient-to-br from-color-error/30 to-transparent"
        ></div>
      </div>
    </div>

    <!-- Contenu principal -->
    <Card
      variant="error"
      :stars="true"
      :decorated="true"
      className="max-w-md w-full z-10 relative backdrop-blur-sm"
    >
      <div class="text-center mb-6">
        <!-- Icône d'erreur avec effet de pulsation -->
        <div class="relative inline-block mb-6">
          <div
            class="absolute inset-0 bg-color-error/20 rounded-full blur-xl animate-pulse-slow"
          ></div>
          <div
            class="relative z-10 p-4 rounded-full bg-color-bg border border-color-error/50 inline-block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-color-error"
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
        </div>

        <!-- Titre de l'erreur -->
        <Title size="2xl" :glitch="true" className="mb-4 text-color-error">
          {{ title }}
        </Title>

        <!-- Message d'erreur -->
        <p class="text-color-text mb-8">{{ message }}</p>

        <!-- Affichage spécifique pour l'erreur de serveur Discord -->
        <div v-if="errorType === 'guild_required'" class="space-y-6 mb-6">
          <Terminal
            command="check_discord_membership"
            title="AUTHENTIFICATION · DISCORD"
            className="text-left mb-6"
          >
            <div class="text-color-error">
              Erreur: Vous n'êtes pas membre du serveur Discord ACS.
            </div>
            <div class="text-color-text-muted mt-2">
              Pour accéder à la plateforme, vous devez d'abord rejoindre notre
              serveur Discord.
            </div>
          </Terminal>

          <Button
            tag="a"
            :href="inviteLink"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className="mb-4"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                />
              </svg>
            </template>
            REJOINDRE LE SERVEUR DISCORD
          </Button>

          <p class="text-color-text-muted">
            Après avoir rejoint le serveur Discord,
            <Button
              @click="retryAuth"
              variant="ghost"
              size="sm"
              className="ml-1"
            >
              reconnectez-vous
            </Button>
          </p>
        </div>

        <div v-else class="mb-6">
          <Terminal
            command="authentication_error"
            title="AUTHENTIFICATION · SYSTÈME"
            className="text-left mb-6"
          >
            <div class="text-color-error">
              Une erreur est survenue lors de l'authentification.
            </div>
            <div class="text-color-text-muted mt-2">
              Veuillez réessayer ou contacter un administrateur si le problème
              persiste.
            </div>
          </Terminal>

          <Button
            @click="retryAuth"
            variant="primary"
            size="lg"
            className="mb-4"
          >
            <template #icon>
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
            </template>
            RÉESSAYER LA CONNEXION
          </Button>
        </div>

        <Button @click="goHome" variant="ghost" size="md">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              />
            </svg>
          </template>
          RETOUR À L'ACCUEIL
        </Button>
      </div>
    </Card>

    <!-- Élément décoratif - ligne de circuit -->
    <div
      class="absolute bottom-0 left-0 right-0 h-16 overflow-hidden z-0 opacity-30"
    >
      <div class="circuit-line"></div>
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

<style scoped>
.space-grid {
  background-image: linear-gradient(
      rgba(248, 113, 113, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(248, 113, 113, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.circuit-line {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(248, 113, 113, 0.3) 10%,
    rgba(248, 113, 113, 0.5) 20%,
    rgba(248, 113, 113, 0.3) 30%,
    transparent 40%,
    transparent 60%,
    rgba(248, 113, 113, 0.3) 70%,
    rgba(248, 113, 113, 0.5) 80%,
    rgba(248, 113, 113, 0.3) 90%,
    transparent 100%
  );
  position: absolute;
  width: 200%;
  left: -50%;
  top: 50%;
  animation: slide 20s linear infinite;
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(50%);
  }
}
</style>
