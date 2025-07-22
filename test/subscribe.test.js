import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("subscribe()", () => {
  let notifications;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("subscribe accept callback and send welcome", async () => {
    const callback = vi.fn();
    const input = { title: "Welcome", message: "Hello!" };
    notifications.subscribe(callback);
    await notifications.send(input);
    const note = callback.mock.calls[0][0];

    expect(note.data).toHaveProperty("title", "Welcome");
    expect(note.data).toHaveProperty("message", "Hello!");
  });
});
