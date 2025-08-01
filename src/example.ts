import { createNotificationManager } from "../src/notificationManager.ts";
import { Notification, NotificationManager } from "../src/types.ts";

const manager: NotificationManager = createNotificationManager();
const notificationBox = document.querySelector(
  ".notifications-box"
) as HTMLDivElement;

function newNotification(notification: Notification) {
  notificationBox.style.display = "flex";

  let ul = notificationBox.querySelector("ul");
  if (!ul) {
    ul = document.createElement("ul");
    notificationBox.appendChild(ul);
  }

  const li = document.createElement("li");
  li.textContent = `${notification.data.title} - ${notification.data.message}`;
  li.style.color = "white";
  li.style.fontWeight = "bold";

  if (notification.readAt) {
    const readTime = document.createElement("small");
    const time = new Date(notification.readAt).toLocaleTimeString();
    readTime.textContent = ` (Read at ${time})`;
    readTime.style.marginLeft = "10px";
    readTime.style.fontSize = "10px";
    readTime.style.color = "white";
    li.appendChild(readTime);
    li.style.fontWeight = "200";
  } else {
    const readButton = document.createElement("button") as HTMLButtonElement;
    readButton.textContent = "Mark as read";
    readButton.style.marginLeft = "10px";
    readButton.style.padding = "10px";
    readButton.addEventListener("click", async () => {
      await manager.setRead(notification.id);
      li.remove();
      newNotification({ ...notification, readAt: Date.now() });
    });
    li.appendChild(readButton);
  }

  ul.appendChild(li);
}

const list = await manager.get();
if (list.length > 0) {
  notificationBox.style.display = "flex";
  list.forEach((n) => newNotification(n));
}

manager.subscribe((notification) => {
  newNotification(notification);
});

const button = document.getElementById("send-btn") as HTMLButtonElement;
button.addEventListener("click", async () => {
  const titleInput = document.getElementById("title-input") as HTMLInputElement;
  const messageInput = document.getElementById("msg-input") as HTMLInputElement;
  const title = titleInput.value;
  const message = messageInput.value;
  if (!title || !message) return;

  await manager.send({ title, message });
});
