import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, beforeEach } from "vitest";
import { Notification, NotificationData, NotificationManager } from "../types";

describe("send()", () => {
  let notifications: NotificationManager;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("send method returns inputs in data", async () => {
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification: Notification = await notifications.send(input);
    expect(notification.data.title).toBe("Welcome");
    expect(notification.data.message).toBe("Hello!");
  });

  it("send method should generate an ID", async () => {
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification: Notification = await notifications.send(input);
    expect(notification).toHaveProperty("id");
  });

  it("createdAt should be a numeric timestamp", async () => {
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification: Notification = await notifications.send(input);
    expect(typeof notification.createdAt).toBe("number");
  });
});
