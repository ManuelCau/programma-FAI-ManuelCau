import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, beforeEach } from "vitest";

describe("setRead", () => {
  let notifications;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("setRead set the read on new notifications", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    await notifications.setRead(notification.id);
    const list = await notifications.get();
    const isUpdate = list.find((n) => n.id === notification.id);
    expect(isUpdate.readAt).toBeDefined();
  });

  it("setRead returns a numeric timeStamp", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    await notifications.setRead(notification.id);
    const list = await notifications.get();
    const isUpdate = list.find((n) => n.id === notification.id);
    expect(typeof isUpdate.readAt).toBe("number");
  });
});
