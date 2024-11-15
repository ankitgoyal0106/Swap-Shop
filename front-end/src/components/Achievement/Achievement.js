import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class Achievement extends BaseComponent {
    #container = null;

    render() {
        if (this.#container) {
            return this.#container;
        }

        this.#container = document.createElement('div');
        this.#container.classList.add('achievement-item');

        //create and append text
        //create and append badge
        //create and append progress

        return this.#container;
    }
}