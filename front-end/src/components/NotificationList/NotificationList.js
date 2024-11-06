import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { Notification } from "../Notification/Notification.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class NotificationList extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('NotificationList');
    }
    
    render() {
        if (this.#container) {
            return this.#container;
        }

        this.#container = document.createElement('div');
        this.#container.classList.add('notif-list');
        this.#setupContainerContent();
        this.#attachEventListeners();

        return this.#container;
    }

    #setupContainerContent() {
        this.#container.innerHTML = "";
    }

    #attachEventListeners() {
        const hub = EventHub.getInstance();

        // Subscribe to necessary events

        // Attach evnet listener for clearing notifications
    }

    #pushNotification(notifData) {
        //get notif list (TODO)
        const notifContainer = document.createElement('li');

        const notif = new Notification(notifData);
        //append notif to list (TODO)
    }
}