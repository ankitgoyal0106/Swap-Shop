import { ProfileRepoFactory } from "./services/ProfileRepoFactory.js";
import { ItemRepoFactory } from "./services/ItemRepoFactory.js";
import { AppController } from "./components/AppController/AppController.js";

document.addEventListener("DOMContentLoaded", function () {
 const appController = new AppController();

  //INITIALIZATION  FOR THE "APP"
  const app = document.getElementById("app");
  app.appendChild(appController.render());

 // Begin profile repository service (Defaulting to indexedDB rn)
 const profileRepository = ProfileRepoFactory.get();
 // Begin item repository service (Defaulting to indexedDB rn)
 const itemRepository = ItemRepoFactory.get();

});

//NAVIGATION BAR SET UP
const toggleBtn = document.querySelector(".navbar__toggleBtn");
const menu = document.querySelector(".navbar__menu");
const icons = document.querySelector(".navbar__icons");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  icons.classList.toggle("active");
});
