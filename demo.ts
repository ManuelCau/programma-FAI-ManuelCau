import { createNotificationManager } from "./notificationManager";
import {
  Notification,
  NotificationData,
  NotificationManagerConfig,
} from "./types";

async function demo() {
  const manager = createNotificationManager();

  const config: NotificationManagerConfig = {
    fetchUrl: "https://url.to.backend.com",
    updateUrl: "https://url.to.backend.com/update",
    createUrl: "https://url.to.backend.com/create",
  };
  manager.setConfig(config);

  function onNewnotification(notification: Notification) {
    console.log("Nuova notifica ricevuta:");
    console.log(`Titolo: ${notification.data.title}`);
    console.log(`Messaggio: ${notification.data.message}`);
  }

  manager.subscribe(onNewnotification);

  const data: NotificationData = { title: "Welcome", message: "Hello!" };
  await manager.send(data);
}
demo();
