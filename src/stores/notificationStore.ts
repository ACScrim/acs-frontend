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
  type: "tournaments" | "badges" | "system" | "update";
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
  // Fonction pour initialiser IndexedDB
  const initializeIndexedDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("ACS_Notifications", 2); // Même version que SW

      request.onerror = () => {
        console.error("Erreur lors de l'ouverture d'IndexedDB:", request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        const db = request.result;
        resolve(db);
      };

      request.onupgradeneeded = () => {
        console.log("Création/mise à jour de la base de données IndexedDB");
        const db = request.result;
        
        // Supprimer l'ancien object store s'il existe
        if (db.objectStoreNames.contains("notifications")) {
          db.deleteObjectStore("notifications");
        }
        
        // Créer le nouvel object store
        const store = db.createObjectStore("notifications", { keyPath: "id" });
        store.createIndex("timestamp", "timestamp", { unique: false });
        store.createIndex("read", "read", { unique: false });
        store.createIndex("type", "type", { unique: false });
        console.log("Object store 'notifications' créé avec succès");
      };
    });
  };

  // Fonction pour lire depuis IndexedDB
  const loadNotificationsFromIndexedDB = async (): Promise<Notification[]> => {
    try {
      const db = await initializeIndexedDB();
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(["notifications"], "readonly");
        const store = transaction.objectStore("notifications");
        const index = store.index("timestamp");

        const getAllRequest = index.getAll();
        
        getAllRequest.onsuccess = () => {
          // Trier par timestamp décroissant
          const notifications = getAllRequest.result.sort(
            (a, b) => b.timestamp - a.timestamp
          );
          resolve(notifications);
        };

        getAllRequest.onerror = () => {
          console.error("Erreur lors de la récupération des notifications:", getAllRequest.error);
          resolve([]);
        };

        transaction.onerror = () => {
          console.error("Erreur de transaction:", transaction.error);
          resolve([]);
        };
      });
    } catch (error) {
      console.error("Erreur lors de l'initialisation d'IndexedDB:", error);
      return [];
    }
  };

  const initializeNotifications = async () => {
    // Charger depuis IndexedDB au lieu du localStorage
    const storedNotifications = await loadNotificationsFromIndexedDB();
    notifications.value = storedNotifications;

    listenForServiceWorkerMessages();

    if (!notificationService.isSupported()) {
      error.value =
        "Les notifications ne sont pas supportées par ce navigateur";
      return;
    }

    permission.value = Notification.permission;

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
              method: "GET",
              credentials: "include",
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

  const saveNotificationsToIndexedDB = async () => {
    try {
      const db = await initializeIndexedDB();
      
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(["notifications"], "readwrite");
        const store = transaction.objectStore("notifications");

        // Vider le store d'abord
        const clearRequest = store.clear();
        
        clearRequest.onsuccess = () => {
          // Garder seulement les 50 dernières notifications
          const recentNotifs = notifications.value.slice(0, 50);
          
          // Ajouter toutes les notifications récentes
          const promises = recentNotifs.map(notification => {
            return new Promise<void>((resolve, reject) => {
              const addRequest = store.add(notification);
              addRequest.onsuccess = () => resolve();
              addRequest.onerror = () => reject(addRequest.error);
            });
          });

          Promise.all(promises)
            .then(() => resolve())
            .catch(reject);
        };

        clearRequest.onerror = () => {
          console.error("Erreur lors du vidage du store:", clearRequest.error);
          reject(clearRequest.error);
        };

        transaction.onerror = () => {
          console.error("Erreur de transaction:", transaction.error);
          reject(transaction.error);
        };
      });
    } catch (err) {
      console.error("Erreur lors de la sauvegarde des notifications:", err);
      throw err;
    }
  };

  // Fonction pour ajouter/mettre à jour une notification spécifique
  const saveNotificationToIndexedDB = async (notification: Notification) => {
    try {
      const db = await initializeIndexedDB();
      
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(["notifications"], "readwrite");
        const store = transaction.objectStore("notifications");

        // Utiliser put pour ajouter ou mettre à jour
        const putRequest = store.put(notification);
        
        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => {
          console.error("Erreur lors de la sauvegarde:", putRequest.error);
          reject(putRequest.error);
        };

        transaction.onerror = () => {
          console.error("Erreur de transaction:", transaction.error);
          reject(transaction.error);
        };
      });
    } catch (err) {
      console.error("Erreur lors de la sauvegarde de la notification:", err);
      throw err;
    }
  };

  // Fonction pour supprimer une notification d'IndexedDB
  const deleteNotificationFromIndexedDB = async (notificationId: string) => {
    try {
      const db = await initializeIndexedDB();
      
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(["notifications"], "readwrite");
        const store = transaction.objectStore("notifications");

        const deleteRequest = store.delete(notificationId);
        
        deleteRequest.onsuccess = () => resolve();
        deleteRequest.onerror = () => {
          console.error("Erreur lors de la suppression:", deleteRequest.error);
          reject(deleteRequest.error);
        };

        transaction.onerror = () => {
          console.error("Erreur de transaction:", transaction.error);
          reject(transaction.error);
        };
      });
    } catch (err) {
      console.error("Erreur lors de la suppression de la notification:", err);
      throw err;
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

  const listenForServiceWorkerMessages = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', async (event) => {
        if (event.data.type === 'NEW_NOTIFICATION') {
          const notification = event.data.notification;
          
          // Ajouter à la liste des notifications (sans sauvegarder - déjà fait par SW)
          notifications.value.unshift(notification);
          
          // Limiter le nombre de notifications affichées
          if (notifications.value.length > 100) {
            notifications.value = notifications.value.slice(0, 100);
          }
        }
      });
    }
  };

  // Fonction pour recharger les notifications depuis IndexedDB
  const refreshNotifications = async () => {
    const storedNotifications = await loadNotificationsFromIndexedDB();
    notifications.value = storedNotifications;
  };

  const markAsRead = async (notificationId: string) => {
    const notification = notifications.value.find(
      (n) => n.id === notificationId
    );
    if (notification) {
      notification.read = true;
      
      // Mettre à jour dans IndexedDB
      try {
        await saveNotificationToIndexedDB(notification);
      } catch (err) {
        console.error("Erreur lors de la mise à jour de la notification:", err);
      }
    }
  };

  const markAllAsRead = async () => {
    notifications.value.forEach((n) => (n.read = true));
    
    // Sauvegarder toutes les modifications dans IndexedDB
    try {
      await saveNotificationsToIndexedDB();
    } catch (err) {
      console.error("Erreur lors de la mise à jour des notifications:", err);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    const index = notifications.value.findIndex((n) => n.id === notificationId);
    if (index > -1) {
      notifications.value.splice(index, 1);
      
      // Supprimer d'IndexedDB
      try {
        await deleteNotificationFromIndexedDB(notificationId);
      } catch (err) {
        console.error("Erreur lors de la suppression de la notification:", err);
      }
    }
  };

  const clearAllNotifications = async () => {
    notifications.value = [];
    
    // Vider IndexedDB
    try {
      await saveNotificationsToIndexedDB();
    } catch (err) {
      console.error("Erreur lors du vidage des notifications:", err);
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

    // Ajouter à la liste locale
    notifications.value.unshift(notification);
    
    // Sauvegarder dans IndexedDB
    try {
      await saveNotificationToIndexedDB(notification);
    } catch (err) {
      console.error("Erreur lors de la sauvegarde de la notification:", err);
    }

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

  // Méthodes spécifiques pour les tournois
  const notifyNewTournament = async (tournament: any) => {
    await addLocalNotification({
      title: "🏆 Nouveau tournoi disponible !",
      body: `${tournament.name} - Inscriptions ouvertes`,
      type: "tournaments",
      url: `/tournois-a-venir`,
      data: { tournamentId: tournament._id },
      tag: `tournament-${tournament._id}`,
    });
  };

  const notifyTournamentReminder = async (tournament: any) => {
    await addLocalNotification({
      title: "⏰ Rappel de tournoi",
      body: `${tournament.name} commence bientôt !`,
      type: "tournaments",
      url: `/tournois/${tournament._id}`,
      data: { tournamentId: tournament._id },
      tag: `reminder-${tournament._id}`,
    });
  };

  const notifyNewBadge = async (badge: any) => {
    await addLocalNotification({
      title: "🏅 Nouveau badge obtenu !",
      body: `Félicitations ! Vous avez obtenu : ${badge.title}`,
      type: "badges",
      url: "/badges",
      data: { badgeId: badge._id },
      tag: `badge-${badge._id}`,
    });
  };

  // Utilitaires privés
  const generateId = (): string => {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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
    refreshNotifications,
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
