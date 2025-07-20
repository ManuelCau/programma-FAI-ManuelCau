export function createNotificationManager() {
  let notifications = [];
  let subscribers = [];
  let config = {};

  function get() {
    return Promise.resolve(notifications);
  }

  function send({ title, message }) {
    const input = {
      data: { title, message },
      id: Date.now(),
      sender: "Manuel",
      createdAt: Date.now(),
    };
    notifications.push(input);
    subscribers.forEach((fn) => fn(input));
    return Promise.resolve(input);
  }

  function setRead(id) {
    const note = notifications.find((n) => n.id === id);
    if (note) {
      note.readAt = Date.now();
    }
    return Promise.resolve();
  }

  function subscribe(callback) {
    subscribers.push(callback);
  }

  function setConfig() {
    return config
  }

  return { get, send, subscribe, setRead, setConfig, setConfig };
}
