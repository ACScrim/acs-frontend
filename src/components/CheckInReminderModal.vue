<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-backdrop">
      <div
        class="modal-content bg-black/90 backdrop-blur-sm border border-pink-500 shadow-lg shadow-pink-500/30 rounded-lg max-w-md w-full"
        @click.stop
      >
        <!-- Effet de coin cyberpunk -->
        <div class="cyber-corners"></div>

        <!-- En-tête avec titre -->
        <div
          class="modal-header bg-gray-900/80 p-4 border-b border-pink-500/30"
        >
          <h2 class="text-xl text-pink-400 font-audiowide flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2 text-pink-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              />
            </svg>
            Check-in requis
          </h2>
        </div>

        <!-- Corps de la modale -->
        <div class="modal-body p-4">
          <!-- Informations du tournoi -->
          <div class="tournament-info mb-4">
            <div class="flex items-center mb-2">
              <div class="tournament-icon bg-gray-800 p-2 rounded-full mr-3">
                <img
                  v-if="tournament.game && tournament.game.imageUrl"
                  :src="tournament.game.imageUrl"
                  :alt="tournament.game.name"
                  class="h-10 w-10 rounded-full object-cover"
                  @error="handleImageError"
                />
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-pink-500/60"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-white font-orbitron text-lg">
                  {{ tournament.name }}
                </h3>
                <div class="text-gray-400 text-sm flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1 text-pink-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ formatDate(tournament.date) }} à
                  {{ formatTime(tournament.date) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Message de rappel -->
          <div
            class="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4 mb-4"
          >
            <p class="text-white font-orbitron">
              <span class="text-pink-300 font-bold">Attention !</span> Votre
              tournoi commence bientôt.
            </p>
            <p class="text-gray-300 mt-2 text-sm">
              Vous devez confirmer votre participation avant le début du
              tournoi. Sans check-in, votre place pourrait être attribuée à un
              joueur en liste d'attente.
            </p>
          </div>

          <!-- Message sur le statut du check-in -->
          <div
            v-if="isCheckedIn"
            class="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-4"
          >
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="text-green-300 font-orbitron text-sm">
                Votre check-in a été confirmé !
              </p>
            </div>
          </div>
        </div>

        <!-- Pied de la modale avec boutons d'action -->
        <div
          class="modal-footer p-4 border-t border-pink-500/30 flex flex-col sm:flex-row gap-3 sm:justify-between"
        >
          <!-- Bouton de check-in -->
          <button
            v-if="!isCheckedIn"
            @click="confirmCheckIn"
            class="cyberpunk-btn-amber px-4 py-2 rounded-md flex items-center justify-center font-orbitron text-sm shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            <span class="mr-2">Confirmer ma présence</span>
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
          </button>

          <!-- Bouton pour annuler le check-in si déjà fait -->
          <button
            v-else
            @click="cancelCheckIn"
            class="cyberpunk-btn-gray px-4 py-2 rounded-md flex items-center justify-center font-orbitron text-sm shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            <span class="mr-2">Annuler mon check-in</span>
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
          </button>

          <!-- Bouton pour aller au tournoi -->
          <button
            @click="goToTournament"
            class="cyberpunk-btn-pink px-4 py-2 rounded-md flex items-center justify-center font-orbitron text-sm shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            <span class="mr-2">Voir le tournoi</span>
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
          </button>

          <!-- Bouton pour ignorer -->
          <button
            @click="close"
            class="cyberpunk-btn-gray bg-opacity-40 px-4 py-2 rounded-md flex items-center justify-center font-orbitron text-sm shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            <span class="mr-2">Plus tard</span>
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
          </button>
        </div>
      </div>
    </div>
  </transition>
  <Toast v-if="toastMessage" :type="toastType" :message="toastMessage" />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import tournamentService from "../services/tournamentService";
import type { Tournament } from "../types";
import { useUserStore } from "../stores/userStore";
import Toast from "../shared/Toast.vue"; // Importer le composant Toast

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
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  max-width: 500px;
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 30, 0.95),
    rgba(10, 10, 15, 0.95)
  );
  border: 1px solid rgba(236, 72, 153, 0.5);
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.3),
    inset 0 0 10px rgba(236, 72, 153, 0.1);
  clip-path: polygon(
    0 10px,
    10px 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
}

/* Animation d'entrée/sortie améliorée */
.modal-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1);
}

.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.6, 0.1, 0.8, 0.1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.92);
  filter: saturate(0);
}

/* Cyber corners pour l'effet cyberpunk amélioré */
.cyber-corners {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cyber-corners::before,
.cyber-corners::after,
.cyber-corners::before,
.cyber-corners::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  border-color: #ec4899;
  border-style: solid;
  border-width: 0;
  filter: drop-shadow(0 0 5px rgba(236, 72, 153, 0.7));
}

.cyber-corners::before {
  top: 0;
  left: 0;
  border-top-width: 2px;
  border-left-width: 2px;
}

.cyber-corners::after {
  bottom: 0;
  right: 0;
  border-bottom-width: 2px;
  border-right-width: 2px;
}

/* Amélioration des éléments internes */
.modal-header {
  background: linear-gradient(
    to right,
    rgba(31, 41, 55, 0.9),
    rgba(17, 24, 39, 0.9)
  );
  border-bottom: 1px solid rgba(236, 72, 153, 0.4);
  position: relative;
}

.modal-header::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(236, 72, 153, 0.7),
    transparent
  );
}

.modal-header h2 {
  text-shadow: 0 0 8px rgba(236, 72, 153, 0.5);
}

.modal-body {
  position: relative;
  z-index: 1;
}

.modal-body::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" fill="none" stroke="%23ec4899" stroke-width="0.5" stroke-opacity="0.05" /></svg>');
  opacity: 0.15;
  z-index: -1;
  pointer-events: none;
}

.tournament-info {
  background: rgba(20, 20, 30, 0.5);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid rgba(236, 72, 153, 0.2);
  position: relative;
  overflow: hidden;
}

.tournament-info::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent 70%);
  opacity: 0.5;
  pointer-events: none;
}

.tournament-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(236, 72, 153, 0.3);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.tournament-icon::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
  pointer-events: none;
}

/* Effet de focus des boutons pour accessibilité */
button:focus-visible {
  outline: 2px solid rgba(236, 72, 153, 0.8);
  outline-offset: 2px;
}

/* Animations subtiles */
@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.modal-content {
  animation: appear 0.5s forwards;
}

@keyframes appear {
  from {
    opacity: 0.5;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media queries pour responsive */
@media (max-width: 640px) {
  .modal-footer {
    flex-direction: column;
  }

  .modal-content {
    width: 95%;
    max-width: 95%;
    clip-path: polygon(
      0 5px,
      5px 0,
      calc(100% - 5px) 0,
      100% 5px,
      100% calc(100% - 5px),
      calc(100% - 5px) 100%,
      5px 100%,
      0 calc(100% - 5px)
    );
  }
}
</style>
