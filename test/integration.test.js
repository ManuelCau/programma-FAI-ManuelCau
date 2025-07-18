import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, beforeEach } from "vitest";

describe("integrationTests", () => {
  let notifications;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("get() shows new notifications sent ", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    const list = await notifications.get();
    expect(list).toContainEqual(notification);
  });
});
