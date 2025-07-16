import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, beforeEach } from "vitest";

describe("createNotificationManager", () => {
  let notifications;

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  //get

  it("get method returns an array", async () => {
    const list = await notifications.get();
    expect(Array.isArray(list)).toBe(true);
  });

  it("get method returns all the notifications", async () => {
    const ntf1 = await notifications.send({
      title: "Welcome",
      message: "Hello!",
    });
    const ntf2 = await notifications.send({
      title: "Welcome2",
      message: "Hello!2",
    });
    const list = await notifications.get();
    expect(list).toContainEqual(ntf1);
    expect(list).toContainEqual(ntf2);
  });
  //send
  it("send method returns inputs in data", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    expect(notification.data.title).toBe("Welcome");
    expect(notification.data.message).toBe("Hello!");
  });

  it("send method returns data and should generate an ID", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    expect(notification).toHaveProperty("data");
    expect(notification).toHaveProperty("id");
  });

  it("createdAt should be a numeric timestamp", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    expect(typeof notification.createdAt).toBe("number");
  });

  //setRead
  it("setRead set the read on new notifications", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    await notifications.setRead(notification.id);
    const list = await notifications.get();
    const isUpdate = list.find((n) => n.id === notification.id);
    expect(isUpdate.readAt).toBeDefined();
  });

  it("setRead returns a numeric timeStamp", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    await notifications.setRead(notification.id);
    const list = await notifications.get();
    const isUpdate = list.find((n) => n.id === notification.id);
    expect(typeof isUpdate.readAt).toBe("number");
  });

  //subscribe
  it("subscribe accept callback", () => {
    const callback = vi.fn();
    expect(() => notifications.subscribe(callback)).toHaveBeenCalled();
  });

  it("a callback is called after subscribes", async () => {
    const callback = vi.fn();
    notifications.subscribe(callback);
    await notifications.send({ title: "Welcome", message: "Hello!" });
    expect(callback).toHaveBeenCalled();
  });

  //setConfig
  it("setConfig accept API url without errors", async () => {
    const object = {
      fetchUrl: "https://url.to.backend.com",
      updateUrl: "https://url.to.backend.com/update",
      createUrl: "https://url.to.backend.com/create",
    };
    expect(() => notifications.setConfig(object)).not.toThrowError();
  });

  //integration
  it("get() shows new notifications sent ", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    const list = await notifications.get();
    expect(list).toContainEqual(notification);
  });
});
