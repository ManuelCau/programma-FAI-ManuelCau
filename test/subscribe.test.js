import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("subscribe()", () => {
  let notifications;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("subscribe accept callback", async () => {
    const callback = vi.fn();
    const input = { title: "Welcome", message: "Hello!" };

    notifications.subscribe(callback);
    await notifications.send(input);
    expect(callback).toHaveBeenCalled();
  });

  it("a welcome notification should be called after subscribes", () => {
    const callback = vi.fn();
    notifications.subscribe(callback);
    const note = callback.mock.calls[0][0];
    expect(note.data.title).toBe("Welcome");
    expect(note.data.message).toBe("You are a new subscriber");
  });
});
