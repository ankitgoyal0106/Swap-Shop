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
        this.#container.appendChild(this.#setupHeader());
        this.#container.innerHTML += `
            <ul id="notifList"></ul>
            <button id="clearNotifBtn">Clear All Notifications</button>
        `;
        this.#pushNotification({text: "From Nate: 'Can you meet up tomorrow?'", type: "New Chat"});
        this.#pushNotification({text: "Someone viewed your listing for Black Sweater Men's Medium!!", type: "Listing Viewed"})
    }

    #setupHeader() {
        const header = document.createElement('h1');
        header.classList.add('notif-header');
        header.textContent = 'Notifications'
        return header;
    }

    #attachEventListeners() {
        const hub = EventHub.getInstance();

        // Subscribe to new notification event
        hub.subscribe(Events.NewNotification, notifData => this.#pushNotification(notifData));

        // Attach event listener for clearing notifications
        const clearNotifBtn = this.#container.querySelector('#clearNotifBtn');
        clearNotifBtn.addEventListener('click', () => this.#clearNotifs());

        // If clear data success, clear screen
        hub.subscribe(Events.ClearNotificationsSuccess, () => this.#clearNotifList());
    }

    #pushNotification(notifData) {
        const notifs = this.#container.querySelector('#notifList');
        const notifContainer = document.createElement('li');

        const notif = new Notification(notifData);
        notifs.appendChild(notif.render());
    }

    #clearNotifs(){
        const hub = EventHub.getInstance();
        hub.publish(Events.ClearNotifications, null);
    }

    #clearNotifList(){
        const notifList = this.#container.querySelector('#notifList');
        notifList.innerHTML = '';
    }
}