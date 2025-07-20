import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("subscribe()", () => {
  let notifications;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  /* it("subscribe accept callback", () => {
    const callback = vi.fn();
    expect(() => notifications.subscribe(callback)).toHaveBeenCalled();
  }); */

  it("a callback is called after subscribes", async () => {
    const callback = vi.fn();
    notifications.subscribe(callback);
    await notifications.send({ title: "Welcome", message: "Hello!" });
    expect(callback).toHaveBeenCalled();
  });
});
