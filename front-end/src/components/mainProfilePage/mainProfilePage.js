import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { ProfileContoller } from "../ProfileController/ProfileController.js";
  
  export class profilePage extends BaseComponent {
    #container = null;
    #mainContent = null;
    #profileController = null;
  
    constructor() {
      super();
      this.#profileController = new ProfileContoller();
      this.loadCSS("mainProfilePage");
    }
  
    render() {
      if(this.#container) {
        return this.#container;
      }
      this.#container = document.createElement('div');
      this.#container.className = 'profile-page';
      
      this.#container.appendChild(this.#createTitle());
      
      this.#mainContent = document.createElement('div');
      this.#mainContent.className = 'main-content';
      this.#container.appendChild(this.#profileController.render());

      return this.#container;
    }
  
    #createTitle() {
      const title = document.createElement('h1');
      title.className = 'profile-title';
      title.textContent = 'User Profile';
      return title;
    }
}