import { createNotificationManager } from "../notificationManager";
import { describe, it, expect, beforeEach } from "vitest";

/* In questi giorni ho letto la documentazione di Vite e Vitest per comprendere meglio il funzionamento interno degli strumenti 
che stavo andando ad utilizzare, vedendo inoltre anche altre fonti (articoli e video di persone che eseguivano semplici test)
per capire meglio la logica di fondo.
ho riletto attentamente il pdf che mi avete mandato e ho provato a inserire alcuni test che mi sembravano sensati, prima di tutto essendo un API
ho pensato di ragionare sulle chiamate/risposte e quindi andare a impostare dei test sul comportamento nella ricezione e restituzione delle notifiche */

describe("createNotificationManager", () => {
  let notifications;

  // col beforeEach vado a settare ciò che voglio che accada prima di ogni test, in questo caso assegno alla variabile manager la funzione
  // per essare sicuro che sarà sempre in reset a ogni nuovo test

  beforeEach(() => {
    notifications = createNotificationManager();
  });

  // nel pdf leggo subito che il metodo get dovrebbe restituirmi una lista di notifiche,
  // suppongo in un array quindi provo un controllo per verificare se ottengo effettivamente un array

  it("get method returns an array", async () => {
    const list = await notifications.get();
    expect(Array.isArray(list)).toBe(true);
  });

  // è presente anche un metodo send che restituisce un oggetto che ha come parametri title e message,
  //potremmo verificare che questi campi siano presenti in quanto verranno racchiusi in data nel tipo Notification
  //verifico che notification restituisca effettivamente un oggetto

  it("send method returns data", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    expect(notification.data.title).toBe("Welcome");
    expect(notification.data.message).toBe("Hello!");
    expect(typeof notification.data).toBe("object");
  });

  // da quanto ho capito successivamente si creerà il timestamp di ricezione e lettura della notifica con relativo id,
  // verifico se all'arrivo di una notifica si genera un id

  it("verify notification id", async () => {
    const input = { title: "Welcome", message: "Hello!" };
    const notification = await notifications.send(input);
    expect(notification).toHaveProperty("id");
  });
});
