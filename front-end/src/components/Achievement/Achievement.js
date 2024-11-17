import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class Achievement extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('Achievement');
      }

    
    render() {
        const container = document.createElement('div');
        container.classList.add('achievements');
    
        const achievementText = document.createElement('p');
        achievementText.textContent = "Congratulations! You've earned 100 points!";
        container.appendChild(achievementText);
    
        return container;
    }
}