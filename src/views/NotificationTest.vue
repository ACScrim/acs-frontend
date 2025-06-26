<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6"
  >
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-white mb-8 text-center">
        🔔 Test des Notifications PWA
      </h1>

      <div class="grid gap-6">
        <!-- Status des notifications -->
        <div
          class="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-xl p-6"
        >
          <h2 class="text-2xl font-semibold text-white mb-4">
            📊 État des Notifications
          </h2>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Support du navigateur:</span>
              <span :class="isSupported ? 'text-green-400' : 'text-red-400'">
                {{ isSupported ? "✅ Supporté" : "❌ Non supporté" }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Permission:</span>
              <span :class="getPermissionColor(permission)">
                {{ getPermissionText(permission) }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Abonnement:</span>
              <span
                :class="isSubscribed ? 'text-green-400' : 'text-yellow-400'"
              >
                {{ isSubscribed ? "✅ Abonné" : "⏳ Non abonné" }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Service Worker:</span>
              <span :class="swStatus ? 'text-green-400' : 'text-red-400'">
                {{ swStatus ? "✅ Actif" : "❌ Inactif" }}
              </span>
            </div>
          </div>
        </div>

        <!-- Actions de test -->
        <div
          class="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-xl p-6"
        >
          <h2 class="text-2xl font-semibold text-white mb-4">
            🧪 Actions de Test
          </h2>
          <div class="grid gap-4 md:grid-cols-2">
            <button
              @click="requestPermission"
              :disabled="permission === 'granted'"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {{
                permission === "granted"
                  ? "✅ Permission accordée"
                  : "🔔 Demander permission"
              }}
            </button>

            <button
              @click="subscribeToPush"
              :disabled="!canSubscribe"
              class="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {{
                isSubscribed
                  ? "✅ Déjà abonné"
                  : "📲 S'abonner aux notifications"
              }}
            </button>

            <button
              @click="sendTestNotification"
              :disabled="!isSubscribed"
              class="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              🧪 Envoyer notification test
            </button>            <button
              @click="createTestTournament"
              :disabled="!isSubscribed"
              class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              🎮 Créer tournoi test (serveur)
            </button>
            
            <button
              @click="simulateLocalNotification"
              class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-blue-700 transition-all duration-300"
            >
              📱 Test notification locale
            </button>
          </div>
        </div>

        <!-- Logs -->
        <div
          class="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-xl p-6"
        >
          <h2 class="text-2xl font-semibold text-white mb-4">📝 Logs</h2>
          <div class="bg-slate-900 rounded-lg p-4 max-h-60 overflow-y-auto">
            <div v-if="logs.length === 0" class="text-slate-400 text-center">
              Aucun log pour le moment...
            </div>
            <div
              v-for="(log, index) in logs"
              :key="index"
              class="text-sm mb-2 font-mono"
              :class="getLogColor(log.type)"
            >
              <span class="text-slate-400">[{{ log.timestamp }}]</span>
              {{ log.message }}
            </div>
          </div>
          <button
            @click="clearLogs"
            class="mt-4 px-4 py-2 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-600 transition-colors"
          >
            Effacer les logs
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { notificationService } from "../services/notificationService";
import { useNotificationStore } from "../stores/notificationStore";

const notificationStore = useNotificationStore();

// État local
const isSupported = ref(false);
const permission = ref<NotificationPermission>("default");
const isSubscribed = ref(false);
const swStatus = ref(false);
const logs = ref<Array<{ type: string; message: string; timestamp: string }>>(
  []
);

// Computed
const canSubscribe = computed(
  () => permission.value === "granted" && !isSubscribed.value
);

// Méthodes utilitaires
const addLog = (type: string, message: string) => {
  logs.value.unshift({
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
  });
};

const getPermissionColor = (perm: NotificationPermission) => {
  switch (perm) {
    case "granted":
      return "text-green-400";
    case "denied":
      return "text-red-400";
    default:
      return "text-yellow-400";
  }
};

const getPermissionText = (perm: NotificationPermission) => {
  switch (perm) {
    case "granted":
      return "✅ Accordée";
    case "denied":
      return "❌ Refusée";
    default:
      return "⏳ En attente";
  }
};

const getLogColor = (type: string) => {
  switch (type) {
    case "success":
      return "text-green-400";
    case "error":
      return "text-red-400";
    case "warning":
      return "text-yellow-400";
    default:
      return "text-slate-300";
  }
};

// Actions
const requestPermission = async () => {
  try {
    addLog("info", "Demande de permission...");
    const result = await notificationService.requestPermission();
    permission.value = result;
    addLog("success", `Permission ${result}`);
  } catch (error) {
    addLog("error", `Erreur permission: ${error}`);
  }
};

const subscribeToPush = async () => {
  try {
    addLog("info", "Abonnement aux notifications...");
    const subscription = await notificationService.subscribeToPush();
    if (subscription) {
      isSubscribed.value = true;
      addLog("success", "Abonnement réussi !");
    } else {
      addLog("error", "Échec de l'abonnement");
    }
  } catch (error) {
    addLog("error", `Erreur abonnement: ${error}`);
  }
};

const sendTestNotification = async () => {
  try {
    addLog("info", "Envoi notification test...");

    // Test notification locale d'abord
    await notificationService.showLocalNotification("🧪 Test Local", {
      body: "Ceci est une notification locale de test",
      icon: "/Logo_ACS.png",
    });

    // Puis test notification push via serveur
    const response = await fetch("/api/notifications/test", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "🧪 Test Push",
        body: "Ceci est une notification push de test",
        data: { type: "test" },
      }),
    });

    if (response.ok) {
      addLog("success", "Notification test envoyée !");
    } else {
      const error = await response.text();
      addLog("error", `Erreur serveur: ${error}`);
    }
  } catch (error) {
    addLog("error", `Erreur test: ${error}`);
  }
};

const createTestTournament = async () => {
  try {
    addLog("info", "Création tournoi test via API...");

    // Utiliser l'API réelle pour créer un tournoi de test
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tournaments`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Tournoi Test ' + new Date().toLocaleTimeString(),
        game: '676cf6d4e29e1b7b421a0e71', // ID d'un jeu existant (vous devrez adapter)
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Demain
        description: 'Tournoi créé pour tester les notifications push',
        playerCap: 8,
        players: [],
        discordChannelName: 'test-notifications'
      })
    });
    
    if (response.ok) {
      const tournament = await response.json();
      addLog("success", `Tournoi créé: ${tournament.name} - Notification envoyée !`);
    } else {
      const error = await response.text();
      addLog("error", `Erreur API: ${error}`);
    }
    
  } catch (error) {
    addLog("error", `Erreur création tournoi: ${error}`);
  }
};

const clearLogs = () => {
  logs.value = [];
};

const checkServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      swStatus.value = !!registration.active;
      addLog("success", "Service Worker détecté");
    } catch (error) {
      swStatus.value = false;
      addLog("warning", "Service Worker non disponible");
    }
  }
};

const simulateLocalNotification = async () => {
  try {
    addLog('info', 'Test notification locale...');
    
    await notificationService.showLocalNotification('🧪 Test Local ACS', {
      body: 'Ceci est une notification de test locale',
      icon: '/Logo_ACS.png',
      tag: 'local-test'
    });
    
    addLog('success', 'Notification locale affichée !');
  } catch (error) {
    addLog('error', `Erreur notification locale: ${error}`);
  }
};

// Initialisation
onMounted(async () => {
  addLog("info", "Initialisation du test des notifications...");

  // Vérifier le support
  isSupported.value = notificationService.isSupported();
  if (!isSupported.value) {
    addLog("error", "Notifications non supportées par ce navigateur");
    return;
  }

  // Vérifier l'état actuel
  permission.value = Notification.permission;

  // Vérifier le service worker
  await checkServiceWorker();

  // Initialiser le store
  await notificationStore.initializeNotifications();
  isSubscribed.value = notificationStore.isSubscribed;

  addLog("success", "Initialisation terminée");
});
</script>
