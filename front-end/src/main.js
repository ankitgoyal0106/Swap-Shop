import { ProfileRepositoryService } from "./services/ProfileRepositoryService.js";
import { AppController } from "./components/AppController/AppController.js";

document.addEventListener("DOMContentLoaded", function () {
 const appController = new AppController();

  //INITIALIZATION  FOR THE "APP"
  const app = document.getElementById("app");
  app.appendChild(appController.render());

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
