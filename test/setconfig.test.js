import { createNotificationManager, setConfig } from "../notificationManager";
import { describe, it, expect, beforeEach } from "vitest";

describe("setConfig", () => {
  let notifications;

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
    expect(notifications.config).toEqual(setConfig);
  });
});
