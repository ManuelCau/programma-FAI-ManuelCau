import { FormEvent, useState } from "react";
import {
  NotificationData,
  NotificationManagerConfig,
  SendPayload,
} from "../types";
import { useNotifications } from "./hooks/UseNotification";
import NotificationList from "./NotificationList";

export function NotificationAppDemo() {
  const { send, config } = useNotifications();
  const [data, setData] = useState<NotificationData>({
    title: "",
    message: "",
  });
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!data.title.trim() || !data.message.trim()) return;
    const dataChannels: SendPayload = { ...data, channels: selectedChannels };
    await send(dataChannels);
    setData({ title: "", message: "" });
    setSelectedChannels([]);
  };

  const toggleChannel = (channel: string) => {
    setSelectedChannels((channels) => {
      const newChannels: string[] = [];
      let hasAddedChannel = false;

      for (let i = 0; i < channels.length; i++) {
        if (channels[i] === channel) {
          hasAddedChannel = true;
        } else {
          newChannels.push(channels[i]);
        }
      }
      if (!hasAddedChannel) {
        newChannels.push(channel);
      }

      return newChannels;
    });
  };

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit} className="form">
        <h2>Notifications</h2>

        <input
          value={data.title}
          onChange={(e) =>
            setData((titleTxt) => ({ ...titleTxt, title: e.target.value }))
          }
          placeholder="Titolo"
          className="form-input"
        />
        <input
          value={data.message}
          onChange={(e) =>
            setData((msgTxt) => ({ ...msgTxt, message: e.target.value }))
          }
          placeholder="Messaggio"
          className="form-input"
        />

        <div className="checkbox">
          {Object.keys(config.channels || {}).map((key) => (
            <label key={key} className="check-label">
              <input
                type="checkbox"
                checked={selectedChannels.includes(key)}
                onChange={() => toggleChannel(key)}
              />
              {key}
            </label>
          ))}
        </div>

        <button type="submit" className="send-btn">
          SEND
        </button>
      </form>

      <div className="notification-box">
        <NotificationList />
        <NotificationList />
      </div>
    </div>
  );
}
