let appConfig = {
  apiUrl: null,
  isDev: false,
};

// Écouter les messages pour recevoir la configuration
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CONFIG') {
    appConfig = event.data.config;
    console.log('Service Worker: Configuration reçue', appConfig);
  }
});

// Service Worker pour les notifications push et PWA
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installation");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activation");
  event.waitUntil(clients.claim());
});

// Gestion des notifications push
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push reçu");

  let notificationData = {
    title: "ACS Notification",
    body: "Nouvelle notification",
    icon: "/Logo_ACS.png",
    badge: "/Logo_ACS.png",
    tag: "acs-notification",
    requireInteraction: false,
    data: {},
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      notificationData = {
        ...notificationData,
        ...payload,
      };
    } catch (error) {
      console.error("Erreur lors du parsing des données push:", error);
      notificationData.body = event.data.text();
    }
  }

  const promises = [
    saveNotificationToIndexedDB(notificationData), // Sauvegarder dans IndexedDB
    self.registration.showNotification(
      notificationData.title,
      {
        body: notificationData.body,
        icon: notificationData.icon,
        badge: notificationData.badge,
        tag: notificationData.tag,
        requireInteraction: notificationData.requireInteraction,
        data: notificationData.data,
        actions: [
          {
            action: "view",
            title: "Voir",
            icon: "/Logo_ACS.png",
          },
          {
            action: "dismiss",
            title: "Ignorer",
          },
        ],
      }
    ),
    notifyActiveClients(notificationData)
  ]

  event.waitUntil(Promise.all(promises));
});

// Gestion des clics sur les notifications
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Clic sur notification");

  event.notification.close();

  if (event.action === "dismiss") {
    return;
  }

  const notificationId = event.notification.data.notificationId
  if (notificationId) {
    fetch(`${appConfig.apiUrl}/notifications/${notificationId}/click`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clicked: true }),
    }).then(response => {
      if (!response.ok) {
        console.error("Erreur lors de la mise à jour du clic de notification:", response.statusText);
      }
    })
    .catch(error => {
      console.error("Erreur lors de la mise à jour du clic de notification:", error);
    })
  }

  // Ouvrir ou focuser l'application
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const data = event.notification.data;
        let urlToOpen = "/";

        if (data && data.url) {
          urlToOpen = data.url;
        }

        // Chercher une fenêtre ouverte avec la bonne URL
        for (const client of clientList) {
          if (client.url.includes(urlToOpen) && "focus" in client) {
            return client.focus();
          }
        }

        // Si aucune fenêtre correspondante, ouvrir une nouvelle fenêtre
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Gestion de la fermeture des notifications
self.addEventListener("notificationclose", (event) => {
  console.log("Service Worker: Notification fermée");

  // Ici on pourrait envoyer des analytics ou marquer la notification comme lue
  const data = event.notification.data;
  if (data && data.type) {
    console.log(`Notification fermée: ${data.type}`);
  }
});

// Cache des ressources pour le mode hors ligne (optionnel)
const CACHE_NAME = "acs-admin-v1";
const urlsToCache = ["/", "/manifest.json", "/Logo_ACS.png"];

self.addEventListener("fetch", (event) => {
  // On peut implémenter un cache ici si nécessaire pour le mode hors ligne
  // Pour l'instant, on laisse passer toutes les requêtes
});


// FUNCTIONS

async function saveNotificationToIndexedDB(notificationData) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ACS_Notifications", 2); // Même version que le store

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['notifications'], 'readwrite');
      const store = transaction.objectStore('notifications');

      const notification = {
        id: `sw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: notificationData.title,
        body: notificationData.body,
        icon: notificationData.icon || "/Logo_ACS.png",
        badge: notificationData.badge || "/Logo_ACS.png",
        type: notificationData.data?.type || 'system',
        url: notificationData.data?.url,
        timestamp: Date.now(),
        read: false,
        tag: notificationData.tag,
        data: notificationData.data
      };

      store.put(notification); // Utiliser put au lieu de add
      transaction.oncomplete = () => resolve(notification);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      
      // Supprimer l'ancien object store s'il existe
      if (db.objectStoreNames.contains("notifications")) {
        db.deleteObjectStore("notifications");
      }
      
      // Créer le nouvel object store avec les mêmes index que le store
      const store = db.createObjectStore('notifications', { keyPath: 'id' });
      store.createIndex('timestamp', 'timestamp', { unique: false });
      store.createIndex('read', 'read', { unique: false });
      store.createIndex('type', 'type', { unique: false });
    };
  });
}

async function notifyActiveClients(notificationData) {
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'NEW_NOTIFICATION',
      notification: {
        id: Date.now().toString(),
        title: notificationData.title,
        body: notificationData.body,
        type: notificationData.data?.type || 'system',
        url: notificationData.data?.url,
        timestamp: Date.now(),
        read: false
      }
    });
  });
}