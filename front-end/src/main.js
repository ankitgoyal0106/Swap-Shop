import { conversationList } from "./components/conversation/conversation.js";
import { explorePage } from "./components/explorePage/explorePage.js";

const app = document.getElementById("app");
app.innerHTML = "";

// const conversationComponent = new conversationList("user1");
// app.appendChild(conversationComponent.render());

const explorePageComponent = new explorePage();
app.appendChild(explorePageComponent.render());