import { useEffect, useRef, useState } from "react";
import {
  Notification,
  NotificationManagerConfig,
  SendPayload,
} from "../../types";
import { createNotificationManager } from "../../notificationManager";

const manager = createNotificationManager();

export function useNotifications(myConfig: NotificationManagerConfig) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const isInitialized = useRef(false);

  useEffect(() => {
    manager.setConfig(myConfig);
    manager.get().then((initialGet) => {
      setNotifications(initialGet);
    });
  }, [myConfig, manager]);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const unsubscribe = manager.subscribe((notif) => {
      setNotifications((prev) => {
        const exists = prev.find((n) => n.id === notif.id);
        if (exists) {
          return prev.map((n) => {
            if (n.id === notif.id) {
              debugger;
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
  };
}
