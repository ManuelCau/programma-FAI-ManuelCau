import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, beforeEach } from "vitest";
import { Notification, NotificationData, NotificationManager } from "../types";

describe("setRead", () => {
  let notifications: NotificationManager;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("setRead sets the readAt on new notifications", async () => {
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification: Notification = await notifications.send(input);
    await notifications.setRead(notification.id);
    const list = await notifications.get();
    const isUpdate = list.find((n) => n.id === notification.id);
    expect(isUpdate?.readAt).toBeDefined();
  });

  it("setRead returns a numeric timestamp", async () => {
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification: Notification = await notifications.send(input);
    await notifications.setRead(notification.id);
    const list = await notifications.get();
    const isUpdate = list.find((n) => n.id === notification.id);
    expect(typeof isUpdate?.readAt).toBe("number");
  });
});
