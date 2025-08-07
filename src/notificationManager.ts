import { json } from "stream/consumers";
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
      const response = await fetch(config.fetchUrl);
      if (response.ok) {
        const dataFetch: Notification[] = await response.json();
        notifications = dataFetch;
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
      await fetch(config.createUrl, {
        method: "POST",
        headers: { "Content type": "application/json" },
        body: JSON.stringify(input),
      });
    }

    return input;
  }

  async function setRead(id: number): Promise<void> {
    const note = notifications.find((n) => n.id === id);
    if (note) {
      note.readAt = Date.now();
      if (config?.updateUrl) {
        await fetch(config.updateUrl, {
          method: "PATCH",
          headers: { "Content type": "application/json" },
          body: JSON.stringify({ id, read: true }),
        });
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
