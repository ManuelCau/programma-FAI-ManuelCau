import { createNotificationManager } from "../notificationManager.js";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { NotificationData, NotificationManager } from "../types.js";

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

  it("send method call POST when data is fetched", async () => {
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => {},
    } as Response);
    notifications.setConfig({
      fetchUrl: "https://url.to.backend.com",
      updateUrl: "https://url.to.backend.com/update",
      createUrl: "https://url.to.backend.com/create",
    });
    const input: NotificationData = { title: "Welcome", message: "Hello!" };
    await notifications.send(input);

    expect(fetch).toHaveBeenCalled();
    const [url, options] = fetch.mock.calls[0];
    expect(options?.method).toBe("POST");
    expect(url).toBe("https://url.to.backend.com/create");
  });
});
