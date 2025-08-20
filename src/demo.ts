import { createNotificationManager } from "./notificationManager.ts";
import {
  Notification,
  NotificationData,
  NotificationManagerConfig,
} from "./types.js";

async function demo() {
  const manager = createNotificationManager();

  const config: NotificationManagerConfig = {
    fetchUrl: "https://url.to.backend.com",
    updateUrl: "https://url.to.backend.com/update",
    createUrl: "https://url.to.backend.com/create",
    channels: {
      email: "https://url.to.backend.com/email",
      sms: "https://url.to.backend.com/sms",
    },
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
