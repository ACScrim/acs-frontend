// Service de gestion des notifications push
export class NotificationService {
  private static instance: NotificationService;
  private vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Vérifie si les notifications sont supportées par le navigateur
   */
  public isSupported(): boolean {
    return (
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window
    );
  }

  /**
   * Demande la permission pour les notifications
   */
  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      throw new Error(
        "Les notifications ne sont pas supportées par ce navigateur"
      );
    }

    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      return permission;
    }

    return Notification.permission;
  }

  /**
   * S'abonne aux notifications push
   */
  public async subscribeToPush(): Promise<PushSubscription | null> {
    try {
      const permission = await this.requestPermission();

      if (permission !== "granted") {
        console.log("Permission de notification refusée");
        return null;
      }

      const registration = await navigator.serviceWorker.ready;

      // Vérifier s'il y a déjà un abonnement
      const existingSubscription =
        await registration.pushManager.getSubscription();
      if (existingSubscription) {
        return existingSubscription;
      }

      // Créer un nouvel abonnement
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey),
      });

      // Envoyer l'abonnement au serveur
      await this.sendSubscriptionToServer(subscription);

      return subscription;
    } catch (error) {
      console.error("Erreur lors de l'abonnement aux notifications:", error);
      return null;
    }
  }

  /**
   * Se désabonne des notifications push
   */
  public async unsubscribeFromPush(): Promise<boolean> {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        await this.removeSubscriptionFromServer(subscription);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erreur lors du désabonnement:", error);
      return false;
    }
  }

  /**
   * Affiche une notification locale (fallback)
   */
  public async showLocalNotification(
    title: string,
    options: NotificationOptions = {}
  ): Promise<void> {
    if (Notification.permission === "granted") {
      const notification = new Notification(title, {
        icon: "/Logo_ACS.png",
        badge: "/Logo_ACS.png",
        ...options,
      });

      notification.onclick = () => {
        window.focus();
        if (options.data?.url) {
          window.location.href = options.data.url;
        }
        notification.close();
      };
    }
  }

  /**
   * Envoie l'abonnement au serveur backend
   */
  private async sendSubscriptionToServer(
    subscription: PushSubscription
  ): Promise<void> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notifications/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            subscription: subscription.toJSON(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'abonnement au serveur");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'abonnement:", error);
      throw error;
    }
  }

  /**
   * Supprime l'abonnement du serveur
   */
  private async removeSubscriptionFromServer(
    subscription: PushSubscription
  ): Promise<void> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notifications/unsubscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            subscription: subscription.toJSON(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la suppression de l'abonnement du serveur"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'abonnement:", error);
      throw error;
    }
  }

  /**
   * Convertit une clé VAPID base64 en Uint8Array
   */
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export const notificationService = NotificationService.getInstance();
