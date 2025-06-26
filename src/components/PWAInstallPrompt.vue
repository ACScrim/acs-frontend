<template>
  <div v-if="showInstallPrompt" class="fixed bottom-4 right-4 z-50">
    <SpaceCard
      variant="primary"
      :stars="true"
      className="p-4 max-w-sm shadow-2xl"
    >
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-space-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div class="flex-1">
          <h3 class="text-space-text font-nasa text-sm font-bold mb-1">
            Installer l'app ACS Gaming
          </h3>
          <p class="text-space-text-muted text-xs mb-3">
            Accédez rapidement aux tournois depuis votre écran d'accueil
          </p>

          <div class="flex space-x-2">
            <SpaceButton
              @click="installApp"
              size="sm"
              variant="primary"
              :loading="installing"
            >
              Installer
            </SpaceButton>
            <SpaceButton @click="dismissPrompt" size="sm" variant="secondary">
              Plus tard
            </SpaceButton>
          </div>
        </div>

        <button
          @click="dismissPrompt"
          class="flex-shrink-0 text-space-text-muted hover:text-space-text transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </SpaceCard>
  </div>

  <!-- Notification pour les mises à jour -->
  <div v-if="showUpdatePrompt" class="fixed bottom-4 left-4 z-50">
    <SpaceCard
      variant="accent"
      :stars="true"
      className="p-4 max-w-sm shadow-2xl"
    >
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-space-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
        </div>

        <div class="flex-1">
          <h3 class="text-space-text font-nasa text-sm font-bold mb-1">
            Mise à jour disponible
          </h3>
          <p class="text-space-text-muted text-xs mb-3">
            Une nouvelle version de l'application est disponible
          </p>

          <div class="flex space-x-2">
            <SpaceButton
              @click="updateApp"
              size="sm"
              variant="accent"
              :loading="updating"
            >
              Mettre à jour
            </SpaceButton>
            <SpaceButton @click="dismissUpdate" size="sm" variant="secondary">
              Plus tard
            </SpaceButton>
          </div>
        </div>
      </div>
    </SpaceCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// État des prompts
const showInstallPrompt = ref(false);
const showUpdatePrompt = ref(false);
const installing = ref(false);
const updating = ref(false);

// Événement d'installation PWA
let deferredPrompt: any = null;
let swRegistration: ServiceWorkerRegistration | null = null;

// Méthodes
const installApp = async () => {
  if (!deferredPrompt) return;

  installing.value = true;

  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("PWA installée");
      showInstallPrompt.value = false;
      localStorage.setItem("pwa-dismissed", "true");
    }
  } catch (error) {
    console.error("Erreur lors de l'installation:", error);
  } finally {
    installing.value = false;
    deferredPrompt = null;
  }
};

const dismissPrompt = () => {
  showInstallPrompt.value = false;
  localStorage.setItem("pwa-dismissed", "true");
  localStorage.setItem("pwa-dismissed-time", Date.now().toString());
};

const updateApp = async () => {
  updating.value = true;

  try {
    if (swRegistration) {
      await swRegistration.update();
      window.location.reload();
    }
    showUpdatePrompt.value = false;
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
  } finally {
    updating.value = false;
  }
};

const dismissUpdate = () => {
  showUpdatePrompt.value = false;
};

// Gestionnaires d'événements
const handleBeforeInstallPrompt = (e: Event) => {
  e.preventDefault();
  deferredPrompt = e;

  // Vérifier si l'utilisateur n'a pas déjà refusé récemment
  const dismissed = localStorage.getItem("pwa-dismissed");
  const dismissedTime = localStorage.getItem("pwa-dismissed-time");

  // Ne pas afficher si déjà installé ou refusé récemment
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return; // Déjà installé
  }

  if (
    !dismissed ||
    (dismissedTime &&
      Date.now() - parseInt(dismissedTime) > 7 * 24 * 60 * 60 * 1000)
  ) {
    // Afficher après 10 secondes pour ne pas être intrusif
    setTimeout(() => {
      if (deferredPrompt && !showInstallPrompt.value) {
        showInstallPrompt.value = true;
      }
    }, 10000);
  }
};

const handleAppInstalled = () => {
  console.log("PWA installée avec succès");
  showInstallPrompt.value = false;
  localStorage.setItem("pwa-installed", "true");
};

const checkForUpdates = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;

      // Vérifier s'il y a une mise à jour en attente
      if (registration.waiting) {
        const lastUpdateCheck = localStorage.getItem("last-update-check");
        const now = Date.now();

        // Ne montrer la popup de mise à jour qu'une fois par heure
        if (
          !lastUpdateCheck ||
          now - parseInt(lastUpdateCheck) > 60 * 60 * 1000
        ) {
          showUpdatePrompt.value = true;
          localStorage.setItem("last-update-check", now.toString());
        }
      }

      // Écouter les nouvelles mises à jour
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              const lastUpdateCheck = localStorage.getItem("last-update-check");
              const now = Date.now();

              // Ne montrer qu'une fois par heure
              if (
                !lastUpdateCheck ||
                now - parseInt(lastUpdateCheck) > 60 * 60 * 1000
              ) {
                showUpdatePrompt.value = true;
                localStorage.setItem("last-update-check", now.toString());
              }
            }
          });
        }
      });

      swRegistration = registration;
    } catch (error) {
      console.error("Erreur lors de la vérification des mises à jour:", error);
    }
  }
};

// Lifecycle
onMounted(() => {
  // Écouter l'événement d'installation PWA
  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  window.addEventListener("appinstalled", handleAppInstalled);

  // Vérifier les mises à jour
  checkForUpdates();
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  window.removeEventListener("appinstalled", handleAppInstalled);
});
</script>

<style scoped>
/* Animations pour les prompts */
.prompt-enter-active,
.prompt-leave-active {
  transition: all 0.3s ease;
}

.prompt-enter-from,
.prompt-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
