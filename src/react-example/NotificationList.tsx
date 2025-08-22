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

export default function NotificationList({
  interactive,
}: {
  interactive: boolean;
}) {
  const { notifications, setRead } = useNotifications(myConfig);

  return (
    <ul>
      {notifications.map((n) => (
        <li key={n.id}>
          <div className="note-element">
            <strong>{n.data.title}</strong>:{" "}
            <span className="data">{n.data.message}</span>
            {n.readAt ? <strong> "Read! ⚡"</strong> : null}
            {interactive ? (
              <button onClick={() => setRead(n.id)} className="set-read-btn">
                Set read
              </button>
            ) : null}
          </div>
          {n.channels && n.channels.length > 0 ? (
            <p> - Channels: {n.channels.join(", ")}</p>
          ) : (
            <p>- No Channel selected ❄</p>
          )}
        </li>
      ))}
    </ul>
  );
}
