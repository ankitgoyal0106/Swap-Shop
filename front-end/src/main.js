
import { conversationList } from "./components/conversation/conversation.js";
import { explorePage } from "./components/explorePage/explorePage.js";
import { homeComponent } from "./components/homePage/homePage.js";

document.addEventListener("DOMContentLoaded", function () {
 
  //INITIALIZATION FOR THE "APP"
  const app = document.getElementById("app");
  app.innerHTML = "";

  // Event listener for the Home button
  document.getElementById('homeBtn').addEventListener('click', function () {
    console.log('Home button clicked');
    const homePageComponent = new homeComponent();  
    app.innerHTML = ''; 
    app.appendChild(homePageComponent.render()); 
  });

  // Event listener for the Explore button
  document.getElementById('exploreBtn').addEventListener('click', function () {
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
});


//NAVIGATION BAR SET UP
const toggleBtn = document.querySelector(".navbar__toggleBtn");
const menu = document.querySelector(".navbar__menu");
const icons = document.querySelector(".navbar__icons");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  icons.classList.toggle("active");
});