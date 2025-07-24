import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, beforeEach } from "vitest";
import { Notification, NotificationData, NotificationManager } from "../types";

describe("get()", () => {
  let notifications: NotificationManager;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("get method returns an array", async () => {
    const list = await notifications.get();
    expect(Array.isArray(list)).toBe(true);
  });

  it("get method returns all the notifications", async () => {
    const ntf1: Notification = await notifications.send({
      title: "Welcome",
      message: "Hello!",
    });
    const ntf2: Notification = await notifications.send({
      title: "Welcome2",
      message: "Hello!2",
    });
    const list = await notifications.get();
    expect(list).toContainEqual(ntf1);
    expect(list).toContainEqual(ntf2);
  });
});
