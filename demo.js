"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const notificationManager_1 = require("./notificationManager");
function demo() {
    return __awaiter(this, void 0, void 0, function* () {
        const manager = (0, notificationManager_1.createNotificationManager)();
        const config = {
            fetchUrl: "https://url.to.backend.com",
            updateUrl: "https://url.to.backend.com/update",
            createUrl: "https://url.to.backend.com/create",
        };
        manager.setConfig(config);
        function onNewnotification(notification) {
            console.log("Nuova notifica ricevuta:");
            console.log(`Titolo: ${notification.data.title}`);
            console.log(`Messaggio: ${notification.data.message}`);
        }
        manager.subscribe(onNewnotification);
        const data = { title: "Welcome", message: "Hello!" };
        yield manager.send(data);
    });
}
demo();
