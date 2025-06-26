import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { notificationService } from "../services/notificationService";

export interface Notification {
  id: string;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  url?: string;
  data?: any;
  timestamp: number;
  read: boolean;
  type: "tournament" | "badge" | "system" | "update";
}

export const useNotificationStore = defineStore("notifications", () => {
  // État
  const notifications = ref<Notification[]>([]);
  const isSubscribed = ref(false);
  const permission = ref<NotificationPermission>("default");
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const unreadCount = computed(
    () => notifications.value.filter((n) => !n.read).length
  );
  const recentNotifications = computed(() =>
    notifications.value.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10)
  );
  // Actions
  const initializeNotifications = async () => {
    if (!notificationService.isSupported()) {
      error.value =
        "Les notifications ne sont pas supportées par ce navigateur";
      return;
    }

    permission.value = Notification.permission;

    // Charger les notifications depuis le localStorage
    loadNotificationsFromStorage();

    // Vérifier si déjà abonné
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        // Vérifier auprès du serveur si l'abonnement est toujours valide
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/notifications/status`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            isSubscribed.value = data.isSubscribed;
          } else {
            // Si erreur serveur, on fait confiance au navigateur
            isSubscribed.value = true;
          }
        } catch (serverError) {
          // En cas d'erreur réseau, on fait confiance au navigateur
          isSubscribed.value = true;
        }
      } else {
        isSubscribed.value = false;
      }
    } catch (err) {
      console.error("Erreur lors de la vérification de l'abonnement:", err);
      isSubscribed.value = false;
    }
  };

  const subscribeToNotifications = async () => {
    loading.value = true;
    error.value = null;

    try {
      const subscription = await notificationService.subscribeToPush();
      isSubscribed.value = !!subscription;
      permission.value = Notification.permission;

      if (subscription) {
        await addLocalNotification({
          title: "🚀 Notifications activées",
          body: "Vous recevrez désormais les notifications des nouveaux tournois !",
          type: "system",
        });
      }
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Erreur lors de l'abonnement";
      console.error("Erreur d'abonnement aux notifications:", err);
    } finally {
      loading.value = false;
    }
  };

  const unsubscribeFromNotifications = async () => {
    loading.value = true;
    error.value = null;

    try {
      const success = await notificationService.unsubscribeFromPush();
      if (success) {
        isSubscribed.value = false;
        await addLocalNotification({
          title: "📵 Notifications désactivées",
          body: "Vous ne recevrez plus de notifications push.",
          type: "system",
        });
      }
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Erreur lors du désabonnement";
      console.error("Erreur de désabonnement des notifications:", err);
    } finally {
      loading.value = false;
    }
  };

  const addLocalNotification = async (
    notificationData: Partial<Notification>
  ) => {
    const notification: Notification = {
      id: generateId(),
      title: notificationData.title || "Notification",
      body: notificationData.body || "",
      icon: notificationData.icon || "/Logo_ACS.png",
      badge: notificationData.badge || "/Logo_ACS.png",
      timestamp: Date.now(),
      read: false,
      type: notificationData.type || "system",
      url: notificationData.url,
      data: notificationData.data,
      tag: notificationData.tag,
    };

    notifications.value.unshift(notification);
    saveNotificationsToStorage();

    // Afficher la notification si les permissions le permettent
    if (permission.value === "granted") {
      await notificationService.showLocalNotification(notification.title, {
        body: notification.body,
        icon: notification.icon,
        badge: notification.badge,
        tag: notification.tag,
        data: { url: notification.url, id: notification.id },
      });
    }

    return notification;
  };

  const markAsRead = (notificationId: string) => {
    const notification = notifications.value.find(
      (n) => n.id === notificationId
    );
    if (notification) {
      notification.read = true;
      saveNotificationsToStorage();
    }
  };

  const markAllAsRead = () => {
    notifications.value.forEach((n) => (n.read = true));
    saveNotificationsToStorage();
  };

  const deleteNotification = (notificationId: string) => {
    const index = notifications.value.findIndex((n) => n.id === notificationId);
    if (index > -1) {
      notifications.value.splice(index, 1);
      saveNotificationsToStorage();
    }
  };

  const clearAllNotifications = () => {
    notifications.value = [];
    saveNotificationsToStorage();
  };

  // Méthodes spécifiques pour les tournois
  const notifyNewTournament = async (tournament: any) => {
    await addLocalNotification({
      title: "🏆 Nouveau tournoi disponible !",
      body: `${tournament.name} - Inscriptions ouvertes`,
      type: "tournament",
      url: `/tournois-a-venir`,
      data: { tournamentId: tournament._id },
      tag: `tournament-${tournament._id}`,
    });
  };

  const notifyTournamentReminder = async (tournament: any) => {
    await addLocalNotification({
      title: "⏰ Rappel de tournoi",
      body: `${tournament.name} commence bientôt !`,
      type: "tournament",
      url: `/tournois/${tournament._id}`,
      data: { tournamentId: tournament._id },
      tag: `reminder-${tournament._id}`,
    });
  };

  const notifyNewBadge = async (badge: any) => {
    await addLocalNotification({
      title: "🏅 Nouveau badge obtenu !",
      body: `Félicitations ! Vous avez obtenu : ${badge.title}`,
      type: "badge",
      url: "/badges",
      data: { badgeId: badge._id },
      tag: `badge-${badge._id}`,
    });
  };

  // Utilitaires privés
  const generateId = (): string => {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const saveNotificationsToStorage = () => {
    try {
      // Garder seulement les 50 dernières notifications
      const recentNotifs = notifications.value.slice(0, 50);
      localStorage.setItem("acs_notifications", JSON.stringify(recentNotifs));
    } catch (err) {
      console.error("Erreur lors de la sauvegarde des notifications:", err);
    }
  };

  const loadNotificationsFromStorage = () => {
    try {
      const stored = localStorage.getItem("acs_notifications");
      if (stored) {
        notifications.value = JSON.parse(stored);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des notifications:", err);
      notifications.value = [];
    }
  };

  return {
    // État
    notifications,
    isSubscribed,
    permission,
    loading,
    error,

    // Getters
    unreadCount,
    recentNotifications,

    // Actions
    initializeNotifications,
    subscribeToNotifications,
    unsubscribeFromNotifications,
    addLocalNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,

    // Actions spécifiques
    notifyNewTournament,
    notifyTournamentReminder,
    notifyNewBadge,
  };
});
