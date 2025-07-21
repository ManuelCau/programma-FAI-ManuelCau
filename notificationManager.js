export function createNotificationManager() {
  let notifications = [];
  let subscribers = [];
  let config = null;

  async function get() {
    return notifications;
  }

  async function send({ title, message }) {
    const input = {
      data: { title, message },
      id: Date.now(),
      sender: "Manuel",
      createdAt: Date.now(),
    };

    notifications.push(input);
    subscribers.forEach((fn) => fn(input));
    return input;
  }

  async function setRead(id) {
    const note = notifications.find((n) => n.id === id);
    if (note) {
      note.readAt = Date.now();
    }
    return;
  }

  function subscribe(callback) {
    subscribers.push(callback);

    const welcomeNote = {
      data: { title: "Welcome", message: "You are a new subscriber" },
      id: Date.now(),
      sender: "Manuel",
      createdAt: Date.now(),
    };
    callback(welcomeNote);
  }

  function setConfig(newConfig) {
    config = newConfig;
    return;
  }

  return { get, send, subscribe, setRead, setConfig };
}
