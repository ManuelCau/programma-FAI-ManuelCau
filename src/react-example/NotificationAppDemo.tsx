import { FormEvent, useState } from "react";
import {
  NotificationData,
  NotificationManagerConfig,
  SendPayload,
} from "../types";
import { useNotifications } from "./hooks/UseNotification";
import NotificationList from "./NotificationList";

const myConfig: NotificationManagerConfig = {
  fetchUrl: "https://url.to.backend.com",
  updateUrl: "https://url.to.backend.com/update",
  createUrl: "https://url.to.backend.com/create",
  channels: {
    email: "https://url.to.backend.com/email",
    sms: "https://url.to.backend.com/sms",
  },
};

export function NotificationAppDemo() {
  const { send } = useNotifications(myConfig);
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
    setSelectedChannels((prevNote) => {
      const index = prevNote.findIndex((c) => c === channel);
      if (index === -1) {
        return [...prevNote, channel];
      } else {
        return [...prevNote.slice(0, index), ...prevNote.slice(index + 1)];
      }
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
          {Object.keys(myConfig.channels || {}).map((key) => (
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
        <NotificationList interactive={false} />
        <NotificationList interactive />
      </div>
    </div>
  );
}
