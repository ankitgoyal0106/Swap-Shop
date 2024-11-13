import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class homeComponent extends BaseComponent{
    render() {
      const homePage = document.createElement('div');
      homePage.innerHTML = `
        <h2>Home Page</h2>
        <p>Welcome to the home page! Here is some interesting content.</p>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      `;
      return homePage;
    }
  }
