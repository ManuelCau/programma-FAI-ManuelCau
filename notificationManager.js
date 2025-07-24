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
exports.createNotificationManager = createNotificationManager;
function createNotificationManager() {
    let notifications = [];
    let subscribers = [];
    let config = null;
    function get() {
        return __awaiter(this, void 0, void 0, function* () {
            return notifications;
        });
    }
    function send(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, message, }) {
            const input = {
                data: { title, message },
                id: Date.now(),
                sender: "Manuel",
                createdAt: Date.now(),
            };
            notifications.push(input);
            subscribers.forEach((fn) => fn(input));
            return input;
        });
    }
    function setRead(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = notifications.find((n) => n.id === id);
            if (note) {
                note.readAt = Date.now();
            }
            return;
        });
    }
    function subscribe(callback) {
        subscribers.push(callback);
    }
    function setConfig(newConfig) {
        config = newConfig;
    }
    function getConfig() {
        return config;
    }
    return { get, send, subscribe, getConfig, setRead, setConfig };
}
