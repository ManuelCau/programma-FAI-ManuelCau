import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("subscribe()", () => {
  let notifications;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("subscribe accept callback and send welcome message", async () => {
    const callback = vi.fn();
    const input = { title: "Welcome", message: "Hello!" };

    notifications.subscribe(callback);
    await notifications.send(input);
    const note = callback.mock.calls[0][0];
    expect(note.data.title).toBe("Welcome");
    expect(note.data.message).toBe("You are a new subscriber");
    expect(callback).toHaveBeenCalled();
  });
});
