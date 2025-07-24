import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NotificationData, NotificationManager } from "../types";

describe("subscribe()", () => {
  let notifications: NotificationManager;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("subscribe accept callback and send welcome", async () => {
    const callback = vi.fn();
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    notifications.subscribe(callback);
    await notifications.send(input);
    const note = callback.mock.calls[0][0];

    expect(note.data).toHaveProperty("title", "Welcome");
    expect(note.data).toHaveProperty("message", "Hello!");
  });
});
