import { createNotificationManager } from "../notificationManager.js";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { NotificationManager } from "../types.js";

describe("get()", () => {
  let notifications: NotificationManager;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("get method returns an array", async () => {
    const list = await notifications.get();
    expect(Array.isArray(list)).toBe(true);
  });

  it("get method returns all the notifications", async () => {
    const ntf1 = await notifications.send({
      title: "Welcome",
      message: "Hello!",
    });
    const ntf2 = await notifications.send({
      title: "Welcome2",
      message: "Hello!2",
    });
    const list = await notifications.get();
    expect(list).toContainEqual(ntf1);
    expect(list).toContainEqual(ntf2);
  });

  it("get methodshould call fetch if fetchUrl is configured", async () => {
    const data = [
      { id: 1, data: { title: "Welcome", message: "Hello!" }, createdAt: 0 },
    ];
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => data,
    } as Response);
    notifications.setConfig({
      fetchUrl: "https://url.to.backend.com",
      updateUrl: "https://url.to.backend.com/update",
      createUrl: "https://url.to.backend.com/create",
    });
    const result = await notifications.get();

    expect(fetch).toHaveBeenCalledWith("https://url.to.backend.com");
    expect(result).toEqual(data);
  });
});
