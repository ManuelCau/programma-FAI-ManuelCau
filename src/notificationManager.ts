import {
  Notification,
  NotificationData,
  NotificationManager,
  NotificationManagerConfig,
} from "./types.js";

export function createNotificationManager(): NotificationManager {
  let notifications: Notification[] = [];
  let subscribers: ((notification: Notification) => void)[] = [];
  let config: NotificationManagerConfig | null = null;

  async function get(): Promise<Notification[]> {
    return notifications;
  }

  async function send({
    title,
    message,
  }: NotificationData): Promise<Notification> {
    const input: Notification = {
      data: { title, message },
      id: Date.now(),
      sender: "Manuel",
      createdAt: Date.now(),
    };

    notifications.push(input);
    subscribers.forEach((fn) => fn(input));
    return input;
  }

  async function setRead(id: number): Promise<void> {
    const note = notifications.find((n) => n.id === id);
    if (note) {
      note.readAt = Date.now();
    }
    return;
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
