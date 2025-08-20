import { useEffect, useRef, useState } from "react";
import {
  Notification,
  NotificationManagerConfig,
  SendPayload,
} from "../../types";
import { createNotificationManager } from "../../notificationManager";

export function useNotifications(myConfig: NotificationManagerConfig) {
  const manager = useRef(createNotificationManager()).current;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const isInitialized = useRef(false);

  useEffect(() => {
    manager.setConfig(myConfig);
    console.log("Caricamento...⚡");
    manager.get().then((initialGet) => {
      console.log(
        initialGet.length > 0
          ? "Caricamento notifiche completato 🚀"
          : "Nessuna notifica per te 🌜"
      );
      setNotifications(initialGet);
    });
  }, [myConfig, manager]);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    manager.subscribe((notif) => {
      setNotifications((prevNote) => {
        if (prevNote.some((n) => n.id === notif.id)) return prevNote;
        return [...prevNote, notif];
      });
    });
  }, [manager]);

  const send = async (payload: SendPayload) => {
    return await manager.send(payload);
  };
  const setRead = async (id: number) => {
    await manager.setRead(id);
    setNotifications((prevNote) =>
      prevNote.map((n) => (n.id === id ? { ...n, readAt: Date.now() } : n))
    );
  };

  return {
    notifications,
    send,
    setRead,
  };
}
