import { conversationList } from "./components/conversation/conversation.js";
import { NotificationList } from "./components/NotificationList/NotificationList.js";

const app = document.getElementById("app");
app.innerHTML = "";

// const conversationComponent = new conversationList("user1");
// app.appendChild(conversationComponent.render());

const notif = new NotificationList();
app.appendChild(notif.render());