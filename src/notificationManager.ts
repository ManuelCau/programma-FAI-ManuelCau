import {
  Notification,
  NotificationData,
  NotificationManager,
  NotificationManagerConfig,
} from "./types.ts";

export function createNotificationManager(): NotificationManager {
  let notifications: Notification[] = [];
  let subscribers: ((notification: Notification) => void)[] = [];
  let config: NotificationManagerConfig | null = null;

  async function get(): Promise<Notification[]> {
    if (config?.fetchUrl) {
      try {
        const response = await fetch(config.fetchUrl);
        if (!response.ok) {
          throw new Error(
            `Data error: ${response.status} ${response.statusText}`
          );
        }
        const dataFetch: Notification[] = await response.json();
        notifications = dataFetch;
      } catch (error) {
        console.error("There are some errors on data fetch", error);
      }
    }
    return notifications;
  }

  async function send({
    title,
    message,
  }: NotificationData): Promise<Notification> {
    const input: Notification = {
      data: { title, message },
      id: Date.now(),
      createdAt: Date.now(),
    };

    notifications.push(input);
    subscribers.forEach((fn) => fn(input));

    if (config?.createUrl) {
      try {
        const response = await fetch(config.createUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },  
          body: JSON.stringify(input),
        });
        if (!response.ok) {
          throw new Error(
            `Data send errors: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Data send error", error);
      }
    }

    return input;
  }

  async function setRead(id: number): Promise<void> {
    const note = notifications.find((n) => n.id === id);
    if (note) {
      note.readAt = Date.now();
      if (config?.updateUrl) {
        try {
          const response = await fetch(config.updateUrl, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },  
            body: JSON.stringify({ id, read: true }),
          });
          if (!response.ok) {
            throw new Error(
              `Data PATCH errors: ${response.status} ${response.statusText}`
            );
          }
        } catch (error) {
          console.error("Data PATCH error", error);
        }
      }
    }
  }

  function subscribe(callback: (notification: Notification) => void) {
    subscribers.push(callback);
  }

  function setConfig(newConfig: NotificationManagerConfig) {
    config = newConfig;
  }

  function getConfig(): NotificationManagerConfig | null {
    return config;
  }

  return { get, send, subscribe, getConfig, setRead, setConfig };
}
