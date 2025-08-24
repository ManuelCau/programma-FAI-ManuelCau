import { useEffect, useRef, useState } from "react";
import {
  Notification,
  NotificationManagerConfig,
  SendPayload,
} from "../../types";
import { createNotificationManager } from "../../notificationManager";

const manager = createNotificationManager();

const NOTIFICATION_MANAGER_CONFIG: NotificationManagerConfig = {
  fetchUrl: "https://url.to.backend.com",
  updateUrl: "https://url.to.backend.com/update",
  createUrl: "https://url.to.backend.com/create",
  channels: {
    email: "https://url.to.backend.com/email",
    sms: "https://url.to.backend.com/sms",
  },
};

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    manager.setConfig(NOTIFICATION_MANAGER_CONFIG);
    manager.get().then((initialGet) => {
      setNotifications(initialGet);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = manager.subscribe((notif) => {
      setNotifications((prev) => {
        const exists = prev.find((n) => n.id === notif.id);
        if (exists) {
          return prev.map((n) => {
            if (n.id === notif.id) {
              return notif;
            }
            return n;
          });
        }
        return [...prev, notif];
      });
    });
    return unsubscribe;
  }, []);

  const send = async (payload: SendPayload) => {
    return await manager.send(payload);
  };

  const setRead = async (id: number) => {
    await manager.setRead(id);
  };

  return {
    notifications,
    send,
    setRead,
    config: NOTIFICATION_MANAGER_CONFIG,
  };
}
