import { useNotifications } from "./hooks/UseNotification";

export default function NotificationList() {
  const { notifications, setRead } = useNotifications();

  return (
    <ul>
      {notifications.map((n) => (
        <li key={n.id}>
          <div className="note-element">
            {n.readAt ? (
              <strong> Read!⚡</strong>
            ) : (
              <button onClick={() => setRead(n.id)} className="set-read-btn">
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
  );
}
