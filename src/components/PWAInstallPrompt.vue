<template>
  <div v-if="showInstallPrompt" class="fixed bottom-4 right-4 z-50">
    <Card
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
            <Button
              @click="installApp"
              size="sm"
              variant="primary"
              :loading="installing"
            >
              Installer
            </Button>
            <Button @click="dismissPrompt" size="sm" variant="secondary">
              Plus tard
            </Button>
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
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// État des prompts
const showInstallPrompt = ref(false);
const installing = ref(false);

// Événement d'installation PWA
let deferredPrompt: any = null;

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

// Gestionnaires d'événements
const handleBeforeInstallPrompt = (e: Event) => {
  // Vérifier d'abord si on veut vraiment intercepter l'événement
  const dismissed = localStorage.getItem("pwa-dismissed");
  const dismissedTime = localStorage.getItem("pwa-dismissed-time");

  // Ne pas intercepter si déjà installé
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return; // Laisser le navigateur gérer
  }

  // Ne pas intercepter si récemment refusé
  if (dismissed && dismissedTime) {
    const timeSinceDismiss = Date.now() - parseInt(dismissedTime);
    if (timeSinceDismiss <= 7 * 24 * 60 * 60 * 1000) {
      return; // Laisser le navigateur gérer
    }
  }

  // Maintenant on peut intercepter en toute sécurité
  e.preventDefault();
  deferredPrompt = e;

  // Afficher après 10 secondes pour ne pas être intrusif
  setTimeout(() => {
    if (deferredPrompt && !showInstallPrompt.value) {
      showInstallPrompt.value = true;
    }
  }, 10000);
};

const handleAppInstalled = () => {
  console.log("PWA installée avec succès");
  showInstallPrompt.value = false;
  localStorage.setItem("pwa-installed", "true");
};

// Lifecycle
onMounted(() => {
  // Écouter l'événement d'installation PWA
  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  window.addEventListener("appinstalled", handleAppInstalled);
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
