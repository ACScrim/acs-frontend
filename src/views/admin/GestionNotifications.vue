<template>
  <div class="container mx-auto p-4 pt-20">
    <SpaceCard class="mb-4" :decorated="false" :stars="true">
      <template #header>
        <div class="flex items-center gap-4">
          <SpaceCard variant="secondary" @click="tab = 'create'" :stars="tab === 'create'" :decorated="tab === 'create'"
            class="flex-1 font-heading cursor-pointer">
            Créer une notification
          </SpaceCard>
          <SpaceCard variant="secondary" @click="tab = 'stats'" :stars="tab === 'stats'" :decorated="tab === 'stats'"
            class="flex-1 font-heading cursor-pointer">
            Stats des notifications
          </SpaceCard>
        </div>
      </template>
    </SpaceCard>
    <SpaceCard v-if="tab === 'create'" variant="primary" :stars="true" :decorated="true">
      <template #header>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-color-primary-light" fill="currentColor"
            viewBox="0 0 24 24">
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <SpaceTitle size="xl">Envoyer une notification</SpaceTitle>
        </div>
      </template>

      <form class="pt-2" @submit.prevent="sendNotification">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
          <input type="text" id="title" v-model="newNotification.title" required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
        </div>

        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea id="message" v-model="newNotification.message" required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"></textarea>
        </div>

        <div class="mb-4">
          <label for="tag" class="block text-sm font-medium text-gray-700">Tag</label>
          <input id="tag" v-model="newNotification.tag"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"></input>
        </div>

        <button type="submit"
          class="px-4 py-2 bg-color-primary text-white rounded-md hover:bg-color-primary-dark transition-colors">
          Envoyer la notification
        </button>

        <p v-if="formMessage.message" class="mt-4 text-sm " :class="`text-${formMessage.type}`">
          {{ formMessage.message }}
        </p>
      </form>
    </SpaceCard>
    <SpaceCard v-else-if="tab === 'stats'" variant="primary" :stars="true" :decorated="true">
      <template #header>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-color-primary-light" fill="currentColor"
            viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v4z" />
          </svg>
          <SpaceTitle size="xl">Statistiques des notifications</SpaceTitle>
        </div>
      </template>

      <!-- Métriques globales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" v-if="stats">
        <!-- Total des notifications envoyées -->
        <SpaceCard variant="dark" className="text-center">
          <div class="p-4">
            <div class="text-3xl font-bold text-color-primary mb-2">{{ stats.total || 0 }}</div>
            <div class="text-normal-text-muted text-sm">Total envoyée{{ stats.total > 1 ? "s" : "" }}</div>
            <div class="flex items-center justify-center mt-2 text-xs">
              <span class="text-color-success">+{{ stats.totalThisWeek || 0 }} cette semaine</span>
            </div>
          </div>
        </SpaceCard>

        <!-- Utilisateurs abonnés -->
        <SpaceCard variant="dark" className="text-center">
          <div class="p-4">
            <div class="text-3xl font-bold text-color-secondary mb-2">{{ stats.subscribedUsers || 0 }}</div>
            <div class="text-normal-text-muted text-sm">Utilisateur{{ stats.subscribedUsers > 1 ? "s" : "" }} abonné{{ stats.subscribedUsers > 1 ? "s" : "" }}</div>
            <div class="flex items-center justify-center mt-2 text-xs">
              <span class="text-color-warning">+{{ stats.newSubscribersThisWeek || 0 }} cette semaine</span>
            </div>
          </div>
        </SpaceCard>

        <!-- Taux de délivrance -->
        <SpaceCard variant="dark" className="text-center">
          <div class="p-4">
            <div class="text-3xl font-bold text-color-accent mb-2">{{ stats.deliveryRate || 0 }}%</div>
            <div class="text-normal-text-muted text-sm">Taux de délivrance</div>
            <div class="w-full bg-background-bg-light rounded-full h-2 mt-2">
              <div 
                class="bg-color-accent h-2 rounded-full transition-all duration-500"
                :style="{ width: `${stats.deliveryRate || 0}%` }"
              ></div>
            </div>
          </div>
        </SpaceCard>

        <!-- Type le plus populaire -->
        <SpaceCard variant="dark" className="text-center">
          <div class="p-4">
            <div class="text-2xl font-bold text-color-primary mb-2">{{ stats.topType || 'N/A' }}</div>
            <div class="text-normal-text-muted text-sm">Type le plus populaire</div>
            <div class="text-xs text-normal-text-muted mt-1">
              {{ stats.topTypeCount || 0 }} notification{{ (stats.topTypeCount || 0) > 1 ? 's' : '' }}
            </div>
          </div>
        </SpaceCard>
      </div>

      <!-- Notifications par type -->
      <div class="mb-8">
        <h3 class="text-xl font-nasa text-normal-text mb-4 flex items-center">
          <svg class="h-5 w-5 mr-2 text-color-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Répartition par type
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Tournois -->
          <SpaceCard variant="dark" className="transform transition-all hover:scale-105 duration-200">
            <div class="p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mr-3">
                    <span class="text-xl">🏆</span>
                  </div>
                  <div>
                    <h4 class="font-nasa text-normal-text">Tournois</h4>
                    <p class="text-xs text-normal-text-muted">tournaments</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-yellow-400">{{ stats.byType?.tournaments || 0 }}</div>
                  <div class="text-xs text-normal-text-muted">cette semaine</div>
                </div>
              </div>
              <div class="w-full bg-background-bg-light rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-700"
                  :style="{ width: `${getTypePercentage('tournaments')}%` }"
                ></div>
              </div>
              <div class="text-xs text-normal-text-muted mt-1 text-center">
                {{ getTypePercentage('tournaments') }}% du total
              </div>
            </div>
          </SpaceCard>

          <!-- Badges -->
          <SpaceCard variant="dark" className="transform transition-all hover:scale-105 duration-200">
            <div class="p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mr-3">
                    <span class="text-xl">🏅</span>
                  </div>
                  <div>
                    <h4 class="font-nasa text-normal-text">Badges</h4>
                    <p class="text-xs text-normal-text-muted">badges</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-purple-400">{{ stats.byType?.badges || 0 }}</div>
                  <div class="text-xs text-normal-text-muted">cette semaine</div>
                </div>
              </div>
              <div class="w-full bg-background-bg-light rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-700"
                  :style="{ width: `${getTypePercentage('badges')}%` }"
                ></div>
              </div>
              <div class="text-xs text-normal-text-muted mt-1 text-center">
                {{ getTypePercentage('badges') }}% du total
              </div>
            </div>
          </SpaceCard>

          <!-- Rappels -->
          <SpaceCard variant="dark" className="transform transition-all hover:scale-105 duration-200">
            <div class="p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mr-3">
                    <span class="text-xl">⏰</span>
                  </div>
                  <div>
                    <h4 class="font-nasa text-normal-text">Rappels</h4>
                    <p class="text-xs text-normal-text-muted">reminders</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-blue-400">{{ stats.byType?.reminders || 0 }}</div>
                  <div class="text-xs text-normal-text-muted">cette semaine</div>
                </div>
              </div>
              <div class="w-full bg-background-bg-light rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-700"
                  :style="{ width: `${getTypePercentage('reminders')}%` }"
                ></div>
              </div>
              <div class="text-xs text-normal-text-muted mt-1 text-center">
                {{ getTypePercentage('reminders') }}% du total
              </div>
            </div>
          </SpaceCard>

          <!-- Système -->
          <SpaceCard variant="dark" className="transform transition-all hover:scale-105 duration-200">
            <div class="p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mr-3">
                    <span class="text-xl">🔧</span>
                  </div>
                  <div>
                    <h4 class="font-nasa text-normal-text">Système</h4>
                    <p class="text-xs text-normal-text-muted">system</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-green-400">{{ stats.byType?.system || 0 }}</div>
                  <div class="text-xs text-normal-text-muted">cette semaine</div>
                </div>
              </div>
              <div class="w-full bg-background-bg-light rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-700"
                  :style="{ width: `${getTypePercentage('system')}%` }"
                ></div>
              </div>
              <div class="text-xs text-normal-text-muted mt-1 text-center">
                {{ getTypePercentage('system') }}% du total
              </div>
            </div>
          </SpaceCard>
        </div>
      </div>

      <!-- Notifications récentes -->
      <div class="mb-8">
        <h3 class="text-xl font-nasa text-normal-text mb-4 flex items-center">
          <svg class="h-5 w-5 mr-2 text-color-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
          </svg>
          Notifications récentes
        </h3>
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div 
            v-for="notification in notifications" 
            :key="notification._id"
            class="border border-space-border rounded-lg p-4 bg-background-bg-light/50 hover:bg-background-bg-light transition-colors"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-3 flex-1">
                <!-- Icône de type -->
                <div class="flex-shrink-0 mt-1">
                  <div 
                    class="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    :class="{
                      'bg-gradient-to-br from-yellow-500/20 to-orange-500/20': notification.type === 'tournaments',
                      'bg-gradient-to-br from-purple-500/20 to-pink-500/20': notification.type === 'badges',
                      'bg-gradient-to-br from-blue-500/20 to-cyan-500/20': notification.type === 'reminders',
                      'bg-gradient-to-br from-green-500/20 to-emerald-500/20': notification.type === 'system',
                    }"
                  >
                    <span v-if="notification.type === 'tournaments'">🏆</span>
                    <span v-else-if="notification.type === 'badges'">🏅</span>
                    <span v-else-if="notification.type === 'reminders'">⏰</span>
                    <span v-else>🔧</span>
                  </div>
                </div>

                <!-- Contenu -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-normal-text font-nasa text-sm font-semibold">
                    {{ notification.title }}
                  </h4>
                  <p class="text-normal-text-muted text-xs mt-1 line-clamp-2">
                    {{ notification.body }}
                  </p>
                  <div class="flex items-center space-x-4 mt-2 text-xs text-normal-text-muted">
                    <span class="flex items-center">
                      <svg class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                      </svg>
                      {{ formatDate(notification.createdAt) }}
                    </span>
                    <span class="flex items-center">
                      <svg class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                      {{ notification.users.length || 0 }} destinataire{{ notification.users.length > 1 ? 's' : '' }}
                    </span>
                    <span class="flex items-center">
                      <svg class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      {{ notification.totalSent || 0 }} livrée{{ notification.totalSent > 1 ? 's' : '' }}
                    </span>
                    <span class="flex items-center">
                      <svg class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.707 7.293a1 1 0 00-1.414 0L9 10.586V7a1 1 0 10-2 0v6a1 1 0 001 1h6a1 1 0 100-2h-3.586l1.293-1.293a1 1 0 000-1.414z" clip-rule="evenodd"/>
                      </svg>
                      {{ notification.totalClicks || 0 }} cliquée{{ notification.totalClicks > 1 ? 's' : '' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Message si aucune notification -->
          <div v-if="!notifications.length" class="text-center py-8 text-normal-text-muted">
            <svg class="h-12 w-12 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
            </svg>
            <p>Aucune notification récente</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-center pt-4 border-t border-space-border">
        <button
          @click="refreshStats"
          :disabled="loadingStats"
          class="flex items-center px-4 py-2 bg-color-primary hover:bg-color-primary-dark text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <svg 
            class="h-4 w-4 mr-2"
            :class="{ 'animate-spin': loadingStats }"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
          {{ loadingStats ? 'Actualisation...' : 'Actualiser' }}
        </button>
      </div>
    </SpaceCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import SpaceCard from '../../components/ui/molecules/Card.vue';
import { notificationService, type NotificationType } from '../../services/notificationService';

const router = useRouter();

const today = new Date();

const newNotification = ref({
  title: '',
  message: '',
  tag: `custom-${Intl.DateTimeFormat("fr-FR", { day: '2-digit', month: '2-digit', year: 'numeric' }).format(today)}`, // Par défaut, la notification est de type général
});

const formMessage = ref({
  message: '',
  type: 'success',
});

const tab = ref<'create' | 'stats'>('create');
const notifications = ref<NotificationType[]>([]);
const loadingStats = ref(false);

// Interface pour les statistiques
interface NotificationStats {
  total: number;
  totalThisWeek: number;
  subscribedUsers: number;
  newSubscribersThisWeek: number;
  deliveryRate: number;
  topType: string;
  topTypeCount: number;
  byType: {
    tournaments: number;
    badges: number;
    reminders: number;
    system: number;
  };
}

// Données des statistiques
const stats = ref<NotificationStats>({
  total: 0,
  totalThisWeek: 0,
  subscribedUsers: 0,
  newSubscribersThisWeek: 0,
  deliveryRate: 0,
  topType: 'N/A',
  topTypeCount: 0,
  byType: {
    tournaments: 0,
    badges: 0,
    reminders: 0,
    system: 0,
  },
});

// Computed pour calculer le pourcentage par type
const getTypePercentage = (type: keyof NotificationStats['byType']): number => {
  if (!stats.value.total || stats.value.total === 0) return 0;
  return Math.round((stats.value.byType[type] / stats.value.total) * 100);
};

// Fonction pour formater les dates
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffMinutes < 1) return "À l'instant";
  if (diffMinutes < 60) return `Il y a ${diffMinutes}min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const loadStats = async () => {
  try {
    loadingStats.value = true;
    const response = await notificationService.getStats();
    stats.value = response;

    // Charger les notifications récentes
    const recentResponse = await notificationService.getNotifications();
    notifications.value = recentResponse;

    loadingStats.value = false;
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error);
    loadingStats.value = false;
  }
};

// Fonction pour actualiser les statistiques
const refreshStats = () => {
  loadStats();
};

watch(tab, (newTab: string) => {
  router.replace({ name: 'GestionNotifications', query: { tab: newTab } });
  
  // Charger les stats quand on passe sur l'onglet stats
  if (newTab === 'stats') {
    loadStats();
    loadingStats.value = true;
  }
});

onMounted(() => {
  const queryTab = router.currentRoute.value.query.tab as string;
  if (queryTab === 'stats' || queryTab === 'create') {
    tab.value = queryTab as 'create' | 'stats';
  } else {
    tab.value = 'create';
  }

  // Charger les notifications existantes si nécessaire
  
})

const sendNotification = async () => {
  try {
    const success = await notificationService.notifySystem(
      newNotification.value.title,
      newNotification.value.message,
      newNotification.value.tag
    );

    if (success) {
      newNotification.value.title = '';
      newNotification.value.message = '';
      newNotification.value.tag = `custom-${Intl.DateTimeFormat("fr-FR", { day: '2-digit', month: '2-digit', year: 'numeric' }).format(today)}`;
      formMessage.value.message = 'Notification envoyée avec succès !';
      formMessage.value.type = 'success';
    } else {
      formMessage.value.message = 'Erreur lors de l\'envoi de la notification.';
      formMessage.value.type = 'error';
    }
  } catch (error) {
    formMessage.value.message = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi de la notification.';
    formMessage.value.type = 'error';
  }

  setTimeout(() => {
    formMessage.value.message = '';
  }, 5000);
}
</script>

<style scoped>
.text-success {
  color: #16a34a;
  /* Couleur verte pour le succès */
}

.text-error {
  color: #dc2626;
  /* Couleur rouge pour l'erreur */
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations pour les barres de progression */
@keyframes slideIn {
  from {
    width: 0%;
  }
  to {
    width: var(--target-width);
  }
}

.progress-bar {
  animation: slideIn 0.7s ease-out;
}

/* Hover effects pour les cartes */
.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Style pour les badges de statut */
.status-badge {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>