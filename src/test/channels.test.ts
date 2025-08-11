import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import { createNotificationManager } from "../notificationManager";
import { NotificationManager, SendPayload } from "../types";

describe("NotificationManager Channels", () => {
  let originalFetch: typeof fetch;
  let notifications: NotificationManager;

  beforeEach(() => {
    notifications = createNotificationManager();
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    (globalThis as any).fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("should call specified channels on send()", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true } as Response);
    (globalThis as any).fetch = fetchMock;

    notifications.setConfig({
      fetchUrl: "",
      updateUrl: "",
      createUrl: "",
      channels: {
        email: "https://url.to.backend.com/email",
        sms: "https://url.to.backend.com/sms",
      },
    });

    const input: SendPayload = {
      title: "Welcome",
      message: "Hello!",
      channels: ["email"],
    };
    const note = await notifications.send(input);

    expect(note.channels).toEqual(["email"]);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://url.to.backend.com/email",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("should call all configured channels on POST", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true } as Response);
    (globalThis as any).fetch = fetchMock;

    notifications.setConfig({
      fetchUrl: "",
      updateUrl: "",
      createUrl: "",
      channels: {
        email: "https://url.to.backend.com/email",
        sms: "https://url.to.backend.com/sms",
      },
    });
    const input: SendPayload = {
      title: "Welcome",
      message: "Hello!",
    };
    const note = await notifications.send(input);
    expect(note.channels).toEqual(["email", "sms"]);
  });

  it("should not have any calls if configManager is not setted", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false } as Response);
    (globalThis as any).fetch = fetchMock;
    const input: SendPayload = {
      title: "Welcome",
      message: "Hello!",
    };
    const note = await notifications.send(input);

    expect(fetchMock).not.toHaveBeenCalled();
    const noteList = await notifications.get();
    expect(noteList).toContainEqual(note);
  });
});
