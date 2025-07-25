import { createNotificationManager } from "../src/notificationManager";
import { describe, it, expect, beforeEach } from "vitest";
import { NotificationData, NotificationManager } from "../src/types";

describe("integrationTests", () => {
  let notifications: NotificationManager;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("get() shows new notifications sent ", async () => {
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    const list = await notifications.get();
    expect(list).toContainEqual(notification);
  });
});
