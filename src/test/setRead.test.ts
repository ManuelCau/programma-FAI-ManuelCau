import { createNotificationManager } from "../notificationManager.js";
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  Notification,
  NotificationData,
  NotificationManager,
} from "../types.js";

describe("setRead", () => {
  let notifications: NotificationManager;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("setRead sets the readAt on new notifications", async () => {
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    await notifications.setRead(notification.id);
    const list = await notifications.get();
    const isUpdate = list.find((n) => n.id === notification.id);
    expect(isUpdate?.readAt).toBeDefined();
  });

  it("setRead returns a numeric timestamp", async () => {
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    await notifications.setRead(notification.id);
    const list = await notifications.get();
    const isUpdate = list.find((n) => n.id === notification.id);
    expect(typeof isUpdate?.readAt).toBe("number");
  });

  it("setRead call PATCH when a notification is read", async () => {
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
    } as Response);

    notifications.setConfig({
      fetchUrl: "https://url.to.backend.com",
      updateUrl: "https://url.to.backend.com/update",
      createUrl: "https://url.to.backend.com/create",
    });

    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    await notifications.setRead(notification.id);

    expect(fetch).toHaveBeenCalledWith(
      "https://url.to.backend.com/update",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ id: notification.id, read: true }),
      })
    );
  });
});
