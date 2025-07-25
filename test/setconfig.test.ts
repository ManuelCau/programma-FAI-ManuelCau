import { createNotificationManager } from "../src/notificationManager";
import { describe, it, expect, beforeEach } from "vitest";
import { NotificationManager } from "../types";

describe("setConfig", () => {
  let notifications: NotificationManager;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  it("setConfig should return config property", async () => {
    const config = {
      fetchUrl: "https://url.to.backend.com",
      updateUrl: "https://url.to.backend.com/update",
      createUrl: "https://url.to.backend.com/create",
    };
    notifications.setConfig(config);
    expect(notifications.getConfig()).toEqual(config);
  });
});
