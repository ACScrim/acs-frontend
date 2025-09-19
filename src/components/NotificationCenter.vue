<template>
  <div class="relative notification-center">
    <!-- Bouton de notification dans la navbar -->
    <button
      @click="togglePanel"
      class="relative p-2 text-color-text hover:text-color-primary transition-colors rounded-lg"
      :class="{ 'text-color-primary': isPanelOpen }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>

      <!-- Badge de notification -->
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 bg-color-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse"
      >
        {{ unreadCount > 9 ? "9+" : unreadCount }}
      </span>
    </button>

    <!-- Panel de notifications -->
    <transition name="space-fade">
      <div
        v-if="isPanelOpen"
        class="absolute top-full z-50 mt-2 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-0 sm:transform-none w-80 sm:w-96 max-w-[calc(100vw-1rem)] sm:max-w-[90vw]"
      >
        <SpaceCard
          variant="dark"
          :stars="true"
          className="shadow-2xl border border-color-primary/20"
        >
          <!-- En-tête -->
          <div class="p-3 sm:p-4 border-b border-color-primary/20">
            <div class="flex items-center justify-between">
              <h3
                class="text-color-text font-nasa text-base sm:text-lg font-bold truncate mr-2"
              >
                Notifications
              </h3>

              <div
                class="flex items-center space-x-1 sm:space-x-2 flex-shrink-0"
              >
                <!-- Bouton d'abonnement -->
                <button
                  v-if="!isSubscribed && permission !== 'denied'"
                  @click="handleSubscribe"
                  :disabled="loading"
                  class="px-2 sm:px-3 py-1 bg-color-primary/20 hover:bg-color-primary/30 text-color-primary text-xs rounded-md transition-colors font-nasa whitespace-nowrap"
                >
                  {{ loading ? "..." : "Activer" }}
                </button>

                <!-- Marquer toutes comme lues -->
                <button
                  v-if="unreadCount > 0"
                  @click="markAllAsRead"
                  class="text-color-text-muted hover:text-color-text text-xs transition-colors whitespace-nowrap hidden sm:block"
                  title="Marquer toutes comme lues"
                >
                  ✓ Tout lire
                </button>

                <!-- Version mobile du bouton "tout lire" -->
                <button
                  v-if="unreadCount > 0"
                  @click="markAllAsRead"
                  class="text-color-text-muted hover:text-color-text transition-colors sm:hidden"
                  title="Marquer toutes comme lues"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>

                <!-- Fermer -->
                <button
                  @click="closePanel"
                  class="text-color-text-muted hover:text-color-text transition-colors"
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
            </div>

            <!-- Statut des notifications -->
            <div class="mt-2 text-xs">
              <span
                v-if="permission === 'granted' && isSubscribed"
                class="text-color-success"
              >
                ● Notifications actives
              </span>
              <span
                v-else-if="permission === 'denied'"
                class="text-color-error"
              >
                ● Notifications bloquées
              </span>
              <span v-else class="text-color-warning">
                ● Notifications désactivées
              </span>
            </div>
          </div>

          <!-- Liste des notifications -->
          <div class="max-h-80 sm:max-h-96 overflow-y-auto">
            <div
              v-if="recentNotifications.length === 0"
              class="p-4 sm:p-6 text-center"
            >
              <div class="text-color-text-muted text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-2 2m0 0l-2-2m2 2v6"
                  />
                </svg>
                <span class="hidden sm:inline">Aucune notification</span>
                <span class="sm:hidden">Aucune notification</span>
              </div>
            </div>

            <div
              v-for="notification in recentNotifications"
              :key="notification.id"
              class="border-b border-color-primary/10 last:border-b-0"
            >
              <div
                class="p-3 sm:p-4 hover:bg-color-bg-light/50 transition-colors cursor-pointer"
                :class="{ 'bg-color-primary/5': !notification.read }"
                @click="handleNotificationClick(notification)"
              >
                <div class="flex items-start space-x-2 sm:space-x-3">
                  <!-- Icône de type -->
                  <div class="flex-shrink-0 mt-1">
                    <div
                      class="w-2 h-2 rounded-full"
                      :class="{
                        'bg-color-primary': notification.type === 'tournaments',
                        'bg-color-accent': notification.type === 'badges',
                        'bg-color-warning': notification.type === 'system',
                        'bg-color-secondary': notification.type === 'update',
                      }"
                    ></div>
                  </div>

                  <!-- Contenu -->
                  <div class="flex-1 min-w-0">
                    <h4
                      class="text-sm font-semibold text-color-text font-nasa leading-tight"
                      :class="{ 'text-color-primary': !notification.read }"
                    >
                      {{ notification.title }}
                    </h4>
                    <p
                      class="text-xs text-color-text-muted mt-1 line-clamp-2 sm:line-clamp-3 leading-relaxed"
                    >
                      {{ notification.body }}
                    </p>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-xs text-color-text-muted truncate mr-2">
                        {{ formatTime(notification.timestamp) }}
                      </span>
                      <button
                        @click.stop="deleteNotification(notification.id)"
                        class="text-color-text-muted hover:text-color-error text-xs transition-colors flex-shrink-0 p-1"
                        title="Supprimer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions en bas -->
          <div
            v-if="recentNotifications.length > 0"
            class="p-3 border-t border-color-primary/20 text-center"
          >
            <button
              @click="clearAllNotifications"
              class="text-color-text-muted hover:text-color-error text-xs transition-colors"
            >
              <span class="hidden sm:inline"
                >Effacer toutes les notifications</span
              >
              <span class="sm:hidden">Tout effacer</span>
            </button>
          </div>
        </SpaceCard>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useNotificationStore } from "../stores/notificationStore";
import { storeToRefs } from "pinia";
import type { Notification } from "../stores/notificationStore";

// Store et router
const notificationStore = useNotificationStore();
const router = useRouter();

// État local
const isPanelOpen = ref(false);

// Computed - Utiliser storeToRefs pour préserver la réactivité
const { recentNotifications, unreadCount, isSubscribed, permission, loading } =
  storeToRefs(notificationStore);

// Méthodes
const togglePanel = async () => {
  isPanelOpen.value = !isPanelOpen.value;

  // Rafraîchir les notifications quand on ouvre le panel
  if (isPanelOpen.value) {
    await notificationStore.refreshNotifications();
  }
};

const closePanel = () => {
  isPanelOpen.value = false;
};

const handleSubscribe = async () => {
  await notificationStore.subscribeToNotifications();
};

const markAllAsRead = () => {
  notificationStore.markAllAsRead();
};

const deleteNotification = (id: string) => {
  notificationStore.deleteNotification(id);
};

const clearAllNotifications = () => {
  notificationStore.clearAllNotifications();
  closePanel();
};

const handleNotificationClick = (notification: Notification) => {
  // Marquer comme lue
  if (!notification.read) {
    notificationStore.markAsRead(notification.id);
  }

  // Naviguer si URL fournie
  if (notification.url) {
    router.push(notification.url);
  }

  closePanel();
};

const formatTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes}min`;
  if (hours < 24) return `Il y a ${hours}h`;
  if (days < 7) return `Il y a ${days}j`;

  return new Date(timestamp).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
};

// Fermer le panel quand on clique ailleurs
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".notification-center")) {
    isPanelOpen.value = false;
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  notificationStore.initializeNotifications();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.space-fade-enter-active,
.space-fade-leave-active {
  transition: all 0.3s ease;
}

.space-fade-enter-from,
.space-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
