import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, beforeEach } from "vitest";

describe("send()", () => {
  let notifications;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("send method returns inputs in data", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    expect(notification.data.title).toBe("Welcome");
    expect(notification.data.message).toBe("Hello!");
  });

  it("send method should generate an ID", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    expect(notification).toHaveProperty("id");
  });

  it("createdAt should be a numeric timestamp", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    expect(typeof notification.createdAt).toBe("number");
  });
});
