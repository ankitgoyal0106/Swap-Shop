import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { Achievement } from "../Achievement/Achievement.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class AchievementPage extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('AchievementPage');
    }

    render() {
        if (this.#container) {
            return this.#container;
        }

        this.#container = document.createElement('div');
        this.#container.classList.add('achievement-page');
        this.#setupContainerContent();
        this.#attachEventListeners();

        return this.#container;
    }

    #setupContainerContent() {
        this.#container.innerHTML = `
            <h2>Achievements</h2>
            <ul id="achievementList"></ul>
            `;
    }

    #attachEventListeners() {
        const hub = EventHub.getInstance();

        //Subscribe to sign up event
        //Subscribe to list item event
        //Subscribe to chat new person event
        //Subsribe to mark item as sold event
        //Subscribe to easter egg item
        //Subscribe to view item event
    }
}