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

        //TODO: Make all functions for response to these events
        //Subscribe to sign up event
        hub.subscribe(Events.SignUp, signUpAchievement());

        //Subscribe to list item event
        hub.subscribe(Events.ListItem, listItemAchievement());

        //Subscribe to chat new person event
        hub.subscribe(Events.StartNewChat, newChatAchievement());

        //Subscribe to mark item as sold event
        hub.subscribe(Events.MarkItemSold, itemsSoldAchievement());

        //Subscribe to easter egg item
        hub.subscribe(Events.FindEasterEgg, easterEggAchievement());

        //Subscribe to view item event
        hub.subscribe(Events.ViewItem, viewItemsAchievement());
    }
}