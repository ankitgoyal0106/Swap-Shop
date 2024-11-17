

import { conversationList } from "./components/conversation/conversation.js";
import { explorePage } from "./components/explorePage/explorePage.js";
import { homeComponent } from "./components/homePage/homePage.js";
import {CreateItemPage} from "./components/itemPage/createItemPage.js";

import { ProfileRepositoryService } from "./services/ProfileRepositoryService.js";
import { AppController } from "./components/AppController/AppController.js";


document.addEventListener("DOMContentLoaded", function () {
 const appController = new AppController();

  //INITIALIZATION  FOR THE "APP"
  const app = document.getElementById("app");
  app.appendChild(appController.render());


  // Event listener for the Explore button
  document.getElementById('exploreBtn').addEventListener('click', function () {
    // Implement the explorePage functionality here
    const explorePageComponent = new explorePage();
    app.innerHTML = '';
    app.appendChild(explorePageComponent.render());
  });

  // Event listener for the Profile button 
  document.getElementById('profileBtn').addEventListener('click', function () {
    // Implement the profilePage functionality here
    // const profilePageComponent = new profileComponent();
    // app.innerHTML = '';
    // app.appendChild(profilePageComponent.render());
  });

  // Event listener for the Create Item button 
  document.getElementById('itemBtn').addEventListener('click', function () {
    // Implement the profilePage functionality here
    const createItemComponent = new CreateItemPage();
    app.innerHTML = '';
    app.appendChild(createItemComponent.render());
  });

 // Begin the IndexDB for Profile Data
 //TODO: Implement profile repository factory services
 const profileRepository = new ProfileRepositoryService();

});

//NAVIGATION BAR SET UP
const toggleBtn = document.querySelector(".navbar__toggleBtn");
const menu = document.querySelector(".navbar__menu");
const icons = document.querySelector(".navbar__icons");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  icons.classList.toggle("active");
});
