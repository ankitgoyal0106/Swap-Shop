//import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import {CreateItemPage} from "./components/itemPage/createItemPage.js";

const app = document.getElementbyId("app");
app.innerHTML = "";

const app2 = document.getElementbyId("app");
app2.innerHTML = "";

const create = CreateItemPage();
app.appendChild(create.render());
