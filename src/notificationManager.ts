import {
  Notification,
  NotificationManager,
  NotificationManagerConfig,
  SendPayload,
} from "./types.ts";

export function createNotificationManager(): NotificationManager {
  let notifications: Notification[] = [];
  let subscribers: ((notification: Notification) => void)[] = [];
  let config: NotificationManagerConfig | null = null;

  async function get(): Promise<Notification[]> {
    if (config?.fetchUrl) {
      try {
        const response = await fetch(config.fetchUrl);
        if (!response.ok) {
          throw new Error(
            `Data error: ${response.status} ${response.statusText}`
          );
        }
        const dataFetch: Notification[] = await response.json();
        notifications = dataFetch;
      } catch (error) {
        console.error("There are some errors on data fetch", error);
      }
    }
    return notifications;
  }

  async function send({
    title,
    message,
    channels: sendChannels,
  }: SendPayload): Promise<Notification> {
    const input: Notification = {
      data: { title, message },
      id: Date.now(),
      createdAt: Date.now(),
    };

    notifications.push(input);
    notify(input);

    if (config?.channels) {
      const allChannels = Object.keys(config.channels);
      if (sendChannels && sendChannels.length > 0) {
        input.channels = sendChannels.filter((c) => allChannels.includes(c));
      } else {
        input.channels = [];
      }
    }

    if (config?.createUrl) {
      try {
        const response = await fetch(config.createUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        if (!response.ok) {
          throw new Error(
            `Data send errors: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Data send error", error);
      }
    }

    if (config?.channels && input.channels?.length) {
      const channelsConfig = config.channels;
      type ChannelsConfigType = typeof channelsConfig;

      const calls = input.channels.map(async (ch) => {
        const url = channelsConfig[ch as keyof ChannelsConfigType];
        if (!url) return Promise.resolve();
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ channel: ch, notification: input }),
        });
        if (!res.ok) throw new Error(`Channel ${ch} failed: ${res.status}`);
      });

      try {
        const results = await Promise.allSettled(calls);
        results.forEach((r) => {
          if (r.status === "rejected") {
            console.error("Send error:", r.reason);
          }
        });
      } catch (error) {
        console.error("Error sending to channels", error);
      }
    }

    return input;
  }

  function notify(newNotification: Notification) {
    debugger;
    subscribers.forEach((fn) => fn(newNotification));
  }

  async function setRead(id: number): Promise<void> {
    const note = notifications.find((n) => n.id === id);
    if (note) {
      note.readAt = Date.now();
      if (config?.updateUrl) {
        try {
          const response = await fetch(config.updateUrl, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, read: true }),
          });
          if (!response.ok) {
            throw new Error(
              `Data PATCH errors: ${response.status} ${response.statusText}`
            );
          }
        } catch (error) {
          console.error("Data PATCH error", error);
        }
      }

      notify(note);
    }
  }

  function subscribe(callback: (notification: Notification) => void) {
    subscribers.push(callback);

    return function unsubscribe() {
      // subscribers = subscribers.filter((s) => s === callback);
    };
  }

  function setConfig(newConfig: NotificationManagerConfig) {
    config = newConfig;
  }

  function getConfig(): NotificationManagerConfig | null {
    return config;
  }

  return { get, send, subscribe, getConfig, setRead, setConfig };
}
