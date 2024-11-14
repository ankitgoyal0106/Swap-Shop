import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class Notification extends BaseComponent {
    #container = null;

    constructor(notification = {}) {
        super();
        this.notification = notification;
        this.loadCSS('Notification');
    }

    render() {
        if (this.#container) {
            return this.#container;
        }
        this.#container = document.createElement('div');
        this.#container.classList.add('notification-item');
        
        const text = this.#createNotifText();
        this.#container.appendChild(text);

        return this.#container;
    }
    
    // Private method to create notification text element
    #createNotifText() {
        const notifText = document.createElement('p');

        const notifType = document.createElement('span');
        notifType.classList.add('notif-type');
        notifType.textContent = this.notification.type + ": ";
        notifText.appendChild(notifType);

        const notifDet = document.createElement('span');
        notifDet.classList.add('notif-details');
        notifDet.textContent = this.notification.text;
        notifText.appendChild(notifDet);

        return notifText;
    }
}