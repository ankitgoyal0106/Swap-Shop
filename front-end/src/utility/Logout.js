import { EventHub } from "../eventhub/EventHub.js";
import { Events } from "../eventhub/Events.js";
import { getEmailFromLocalStorage, clearLocalStorage } from "../services/LocalStorage.js";

export function logout() {
    const email = getEmailFromLocalStorage();
    clearLocalStorage();
    const hub = EventHub.getInstance();
    hub.publish(Events.SwitchToHomePage, null);
    hub.publish(Events.LogoutSuccess, email);
}