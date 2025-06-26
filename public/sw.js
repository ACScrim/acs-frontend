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

  const notificationPromise = self.registration.showNotification(
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
  );

  event.waitUntil(notificationPromise);
});

// Gestion des clics sur les notifications
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Clic sur notification");

  event.notification.close();

  if (event.action === "dismiss") {
    return;
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
