import { useState } from "react";
import {
  NotificationData,
  NotificationManagerConfig,
  SendPayload,
} from "../types";
import { useNotifications } from "./hooks/UseNotification";

const myConfig: NotificationManagerConfig = {
  fetchUrl: "https://url.to.backend.com",
  updateUrl: "https://url.to.backend.com/update",
  createUrl: "https://url.to.backend.com/create",
  channels: {
    email: "https://url.to.backend.com/email",
    sms: "https://url.to.backend.com/sms",
  },
};

export default function NotificationAppDemo() {
  const { notifications, send, setRead } = useNotifications(myConfig);
  const [data, setData] = useState<NotificationData>({
    title: "",
    message: "",
  });
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const handleSendBtn = async () => {
    if (!data.title.trim() || !data.message.trim()) return;
    const dataChannels: SendPayload = { ...data, channels: selectedChannels };
    await send(dataChannels);
    setData({ title: "", message: "" });
    setSelectedChannels([]);
  };

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prevNote) =>
      prevNote.includes(channel)
        ? prevNote.filter((c) => c !== channel)
        : [...prevNote, channel]
    );
  };

  return (
    <div className="form-box">
      <div className="form">
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

        <button onClick={handleSendBtn} className="send-btn">
          SEND
        </button>
      </div>
      <div className="notification-box">
        <ul>
          {notifications.map((n) => (
            <li key={n.id}>
              <div className="note-element">
                <strong>{n.data.title}</strong>:{" "}
                <span className="data">{n.data.message}</span>
                {n.readAt ? (
                  <strong> "Read! ⚡"</strong>
                ) : (
                  <button
                    onClick={() => setRead(n.id)}
                    className="set-read-btn"
                  >
                    Set read
                  </button>
                )}
                </div>
                {n.channels && n.channels.length > 0 ? (
                  <p> - Channels: {n.channels.join(", ")}</p>
                ) : (
                  <p>- No Channel selected ❄</p>
                )}
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
