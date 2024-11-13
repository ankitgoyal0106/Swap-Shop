// import { conversationList } from "./components/conversation/conversation.js";
import { LoginComponent } from "./components/ProfileLoginPage/profileLogin.js";
const app = document.getElementById("app");
app.innerHTML = "";

// const conversationComponent = new conversationList("user1");
// app.appendChild(conversationComponent.render());

const profilePageLogin = new LoginComponent();
app.appendChild(profilePageLogin.render());