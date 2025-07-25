import { createNotificationManager } from "../src/notificationManager";
import { describe, it, expect, beforeEach } from "vitest";
import {
  Notification,
  NotificationData,
  NotificationManager,
} from "../src/types";

describe("send()", () => {
  let notifications: NotificationManager;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("send method returns inputs in data", async () => {
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    expect(notification.data.title).toBe("Welcome");
    expect(notification.data.message).toBe("Hello!");
  });

  it("send method should generate an ID", async () => {
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    expect(notification).toHaveProperty("id");
  });

  it("createdAt should be a numeric timestamp", async () => {
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    expect(typeof notification.createdAt).toBe("number");
  });
});
