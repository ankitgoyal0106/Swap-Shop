import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class Notification extends BaseComponent {
    #container = null;

    constructor(notification = {}) {
        super();
        this.notication = notification;
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
        const notifText = document.createElement('span');
        notifText.textContent = this.notification.text;
        return notifText;
    }
}