import { conversationList } from "./components/conversation/conversation.js";

const app = document.getElementById("app");
app.innerHTML = "";

const conversationComponent = new conversationList("user1");
app.appendChild(conversationComponent.render());