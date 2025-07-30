import { createNotificationManager } from "../dist/notificationManager.js";

const manager = createNotificationManager();

async function renderNotifications() {
  const list = await manager.get();
  const notificationBox = document.querySelector(".notifications-box");

  notificationBox.style.display = list.length > 0 ? "flex" : "none";

  let ul = notificationBox.querySelector("ul");
  if (!ul) {
    ul = document.createElement("ul");
    notificationBox.appendChild(ul);
  } else {
    ul.innerHTML = "";
  }

  list.forEach((notification) => {
    const li = document.createElement("li");
    li.textContent = `${notification.data.title} - ${notification.data.message} `;
    li.style.color = "white";
    li.style.fontWeight = "bold";
    li.style.textDecoration = "none";

    if (notification.readAt) {
      const readTime = document.createElement("small");
      const time = new Date(notification.readAt).toLocaleTimeString();
      readTime.textContent = ` (Read at ${time})`;
      li.appendChild(readTime);
      li.style.fontWeight = "200";
      readTime.style.marginLeft = "10px";
      readTime.style.fontSize = "10px";
      readTime.style.color = "white";
    } else {
      const readButton = document.createElement("button");
      readButton.textContent = "Mark as read";
      readButton.style.marginLeft = "10px";
      readButton.style.padding = "10px";
      readButton.addEventListener("click", async () => {
        await manager.setRead(notification.id);
        renderNotifications();
      });
      li.appendChild(readButton);
    }

    ul.appendChild(li);
  });
}

manager.subscribe(() => {
  renderNotifications();
});

const button = document.getElementById("send-btn");
button.addEventListener("click", async () => {
  const title = document.getElementById("title-input").value;
  const message = document.getElementById("msg-input").value;

  if (title === "" || message === "") return;

  await manager.send({ title, message });
});

renderNotifications();
