<template>
  <transition name="space-modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <!-- Overlay avec effet de flou et étoiles -->
      <div
        class="absolute inset-0 bg-color-bg/90 backdrop-blur-sm"
        @click="close"
      >
        <!-- Étoiles animées en arrière-plan -->
        <div
          v-for="n in 20"
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
      </div>

      <!-- Contenu de la modale -->
      <Card
        variant="primary"
        :stars="true"
        :decorated="true"
        className="relative z-10 max-w-md w-full"
        @click.stop
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-3 text-color-primary-light"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
              <Title size="xl">CHECK-IN REQUIS</Title>
            </div>

            <Badge variant="error" size="md" className="animate-pulse-slow">
              URGENT
            </Badge>
          </div>
        </template>

        <!-- Informations du tournoi -->
        <div class="space-y-6">
          <!-- Détails du tournoi avec design spatial -->
          <div class="flex items-center gap-4">
            <div class="tournament-icon relative">
              <div
                class="absolute inset-0 rounded-full bg-color-primary/10 animate-pulse-slow"
              ></div>
              <img
                v-if="tournament.game && tournament.game.imageUrl"
                :src="tournament.game.imageUrl"
                :alt="tournament.game.name"
                class="h-14 w-14 rounded-full object-cover border-2 border-color-primary-light relative z-10"
                @error="handleImageError"
              />
              <div
                v-else
                class="h-14 w-14 rounded-full bg-color-bg-light flex items-center justify-center border-2 border-color-primary-light relative z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-color-primary-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-nasa text-color-primary-light">
                {{ tournament.name }}
              </h3>
              <div class="flex flex-wrap gap-2 mt-2">
                <div class="flex items-center text-sm text-color-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1 text-color-primary-light"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {{ formatDate(tournament.date) }}
                </div>
                <div class="flex items-center text-sm text-color-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1 text-color-primary-light"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ formatTime(tournament.date) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Message d'alerte -->
          <Terminal
            command="check_tournament_status"
            title="SYSTÈME DE TOURNOI"
            className="mb-6"
          >
            <div class="text-color-error">
              ALERTE: Votre participation requiert une confirmation !
            </div>
            <div class="text-color-text-muted mt-2">
              Sans check-in, votre place pourrait être attribuée à un joueur en
              liste d'attente.
            </div>
          </Terminal>

          <!-- Confirmation de check-in -->
          <Card v-if="isCheckedIn" variant="success" className="p-3">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-color-success"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="text-color-success font-nasa">
                Votre check-in a été confirmé !
              </p>
            </div>
          </Card>
        </div>

        <!-- Actions -->
        <template #footer>
          <div class="space-y-4">
            <!-- Ligne séparatrice avec effet spatial -->
            <div
              class="w-full h-0.5 bg-gradient-to-r from-transparent via-color-primary-light/30 to-transparent"
            ></div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Bouton de check-in -->
              <Button
                v-if="!isCheckedIn"
                @click="confirmCheckIn"
                variant="success"
                size="md"
                className="w-full"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>
                Confirmer ma présence
              </Button>

              <!-- Bouton pour annuler le check-in -->
              <Button
                v-else
                @click="cancelCheckIn"
                variant="outline-error"
                size="md"
                className="w-full"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>
                Annuler mon check-in
              </Button>

              <!-- Bouton pour voir le tournoi -->
              <Button
                @click="goToTournament"
                variant="primary"
                size="md"
                className="w-full"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>
                Voir le tournoi
              </Button>

              <!-- Bouton pour ignorer -->
              <Button
                @click="close"
                variant="ghost"
                size="md"
                className="w-full"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>
                Plus tard
              </Button>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </transition>

  <!-- Intégration du toast pour les notifications -->
  <div
    v-if="toastMessage"
    class="fixed bottom-4 right-4 z-50 transform transition-all duration-500 max-w-sm"
    :class="
      toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    "
  >
    <SpaceAlert
      :variant="toastType"
      :dismissible="true"
      @dismiss="toastMessage = ''"
      className="backdrop-blur-sm"
    >
      {{ toastMessage }}
    </SpaceAlert>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import tournamentService from "../services/tournamentService";
import type { Tournament } from "../types";
import { useUserStore } from "../stores/userStore";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  tournament: {
    type: Object as () => Tournament,
    required: true,
  },
  isCheckedIn: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "check-in-updated", "show-toast"]);
const router = useRouter();
const userStore = useUserStore();
const imageError = ref(false);

// État pour le toast
const toastMessage = ref("");
const toastType = ref<"success" | "error">("success");

// Gestion de l'erreur de chargement d'image
const handleImageError = () => {
  imageError.value = true;
};

// Formatage de la date au format français
const formatDate = (dateString: string) => {
  if (!dateString) return "Date inconnue";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return "Date invalide";
  }
};

// Formatage de l'heure au format français
const formatTime = (dateString: string) => {
  if (!dateString) return "Heure inconnue";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (e) {
    return "Heure invalide";
  }
};

// Confirmation du check-in
const confirmCheckIn = async () => {
  if (!props.tournament._id || !userStore.user?._id) return;

  try {
    await tournamentService.checkInPlayer(
      props.tournament._id,
      userStore.user._id,
      true
    );
    emit("check-in-updated", true);

    // Stockage dans le localStorage
    localStorage.setItem(`checkin-reminded-${props.tournament._id}`, "true");

    // Fermer la modale
    emit("close");

    // Émettre un événement pour afficher un toast dans le composant parent
    emit("show-toast", {
      type: "success",
      message: "Check-in confirmé ! Votre présence a bien été enregistrée.",
    });
  } catch (error) {
    console.error("Erreur lors du check-in:", error);
    emit("show-toast", {
      type: "error",
      message: "Erreur lors du check-in. Veuillez réessayer.",
    });
  }
};

// Annulation du check-in
const cancelCheckIn = async () => {
  if (!props.tournament._id || !userStore.user?._id) return;

  try {
    await tournamentService.checkInPlayer(
      props.tournament._id,
      userStore.user._id,
      false
    );
    emit("check-in-updated", false);

    showToast(
      "success",
      "Check-in annulé. Vous pouvez le confirmer à nouveau plus tard."
    );
  } catch (error) {
    console.error("Erreur lors de l'annulation du check-in:", error);
  }
};

// Fonction pour afficher un toast
const showToast = (type: "success" | "error", message: string) => {
  toastType.value = type;
  toastMessage.value = message;

  // Effacer le toast après 3 secondes
  setTimeout(() => {
    toastMessage.value = "";
  }, 3000);
};

// Navigation vers la page du tournoi
const goToTournament = () => {
  router.push(`/tournois/${props.tournament._id}`);
  close();
};

// Fermeture de la modale
const close = () => {
  emit("close");

  // Stocker dans le localStorage pour éviter de réafficher pendant 4 heures
  if (props.tournament._id) {
    const now = new Date();
    const expiryTime = now.getTime() + 1 * 60 * 60 * 1000; // 4 heures
    localStorage.setItem(
      `checkin-reminder-dismissed-${props.tournament._id}`,
      expiryTime.toString()
    );
  }
};

// Ajouter un événement pour détecter les clics sur Escape
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      document.addEventListener("keydown", handleEscKey);
    } else {
      document.removeEventListener("keydown", handleEscKey);
    }
  }
);

// Gestionnaire pour la touche Escape
const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    close();
  }
};
</script>

<style scoped>
/* Animation d'entrée/sortie pour la modale */
.space-modal-fade-enter-active,
.space-modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1);
}

.space-modal-fade-enter-from,
.space-modal-fade-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.92);
}

/* Animation de pulsation lente */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Style spécifique pour l'icône du tournoi */
.tournament-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
}

.tournament-icon::after {
  content: "";
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  border: 1px solid var(--color-primary-light);
  opacity: 0.5;
  z-index: 5;
}
</style>
