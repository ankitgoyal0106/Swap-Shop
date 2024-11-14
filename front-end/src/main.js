
import { conversationList } from "./components/conversation/conversation.js";
import { NotificationList } from "./components/NotificationList/NotificationList.js";
import { explorePage } from "./components/explorePage/explorePage.js";
import { homeComponent } from "./components/homePage/homePage.js";
import { profilePage } from "./components/mainProfilePage/mainProfilePage.js";
import { Registration } from "./components/registrationPage/registrationPage.js";
import { ProfileRepositoryService } from "./services/ProfileRepositoryService.js";

document.addEventListener("DOMContentLoaded", function () {
 
  //INITIALIZATION  FOR THE "APP"
  const app = document.getElementById("app");
  app.innerHTML = "";

 // Begin the IndexDB for Profile Data
 const profileRepository = new ProfileRepositoryService();

  // Event listener for the Home button
  document.getElementById('homeBtn').addEventListener('click', function () {
    console.log('Home button clicked');
    const homePageComponent = new homeComponent();  // Create the homeComponent instance
    app.innerHTML = '';  // Clear existing content in the app container
    app.appendChild(homePageComponent.render());  // Render the homePage content
  });

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
    const profilePageComponent = new profilePage();
    app.innerHTML = '';
    app.appendChild(profilePageComponent.render());
  });

  document.getElementById('registerBtn').addEventListener('click', function () {
    // Implement the profilePage functionality here
    const registerPageComponent = new Registration();
    app.innerHTML = '';
    app.appendChild(registerPageComponent.render());
  });
  
});


//NAVIGATION BAR SET UP
const toggleBtn = document.querySelector(".navbar__toggleBtn");
const menu = document.querySelector(".navbar__menu");
const icons = document.querySelector(".navbar__icons");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  icons.classList.toggle("active");
});
