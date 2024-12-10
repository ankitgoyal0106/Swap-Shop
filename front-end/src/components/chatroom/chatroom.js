import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { getEmailFromLocalStorage } from "../../services/LocalStorage.js";

/*
1. create chatroom interface dynamically
2. dynamically add messages into the div
3. send message with button
*/

export class chatInterface extends BaseComponent{
    #container = null;

    constructor(convoID){
        super();
        this.userID = getEmailFromLocalStorage();
        this.convoID = convoID;
        this.groupName = JSON.parse(localStorage.getItem(this.convoID)).groupName;
        this.loadedMsgs = JSON.parse(JSON.parse(localStorage.getItem(this.convoID)).msgLog);

        //TODO: this will periodically make a fetch to the back end to keep the chat room up to date
        //new fear unlocked: if it takes too long to fetch, we might lose messages
        const switches = [Events.SwitchToHomePage,Events.SwitchToExplorePage,Events.SwitchToLoginPage,Events.SwitchToItemPage,Events.SwitchProfileToNotif,Events.SwitchProfileToView,Events.SwitchProfileToConvo, `SwitchProfileToAchievements`];

        const hub = EventHub.getInstance();

        const interval = setInterval( () => {
            //console.log("waiting...");
            hub.clearHandlers(Events.GetConvoSuccess);
            hub.subscribe(Events.GetConvoSuccess, data => {//updates loadedMsgs when there is a 200 status, otherwise gets a 304 and doesn't change
                this.loadedMsgs = JSON.parse(data.msgLog);//updates messages in memory
                localStorage.setItem(data.convoID, JSON.stringify(data)); //updates messages in localStorage to be used later
                
                const chatBox = document.getElementById("chatBox");
                chatBox.innerHTML = "";
                this.#renderMsgs(chatBox);
                chatBox.scrollTop = chatBox.scrollHeight;
            });
            hub.publish(Events.GetConvo, this.convoID);
        }, 1000);

        switches.forEach( (event) => {//want to stop running the interval when we are not looking at the chatRoom (substitute for WebSockets)
            hub.subscribe(event, data => {
                clearInterval(interval);
                //interval = null;
            });
        })
        
        this.loadCSS("chatroom");
    }

    render(){
        this.#container = document.createElement("div");
        this.#container.classList.add("container");
        this.#container.style.display = "block";
        const title = document.createElement("h1");
        title.innerText = this.groupName;
        title.classList.add("header");
        this.#container.appendChild(title);
        const chatBox = this.#createChat();
        this.#renderMsgs(chatBox);
        chatBox.scrollTop = chatBox.scrollHeight;
        this.#container.appendChild(chatBox);
        this.#container.appendChild(this.#createInputBar());
        return this.#container;
    }
    //create the chat interface to display messages in loadMsgs
    #createChat(){
        const chatBox = document.createElement("div");
        chatBox.classList.add("chatBox")
        chatBox.id = "chatBox";
        return chatBox;
    }

    //create div for each text message, two different CSS classes: one for user which are margined to the right and other users which are margined to left
    #createMsgBlock(userID, msg){
        const msgDiv = document.createElement("div");
        if(userID.localeCompare(this.userID) === 0){
            msgDiv.classList.add("userMsg");
        }
        else{
            msgDiv.classList.add("otherMsg");
        }
        const id = document.createTextNode(userID);
        const br = document.createElement("br");
        const txtMsg = document.createElement("p");
        txtMsg.innerText = msg;
        msgDiv.appendChild(id);
        msgDiv.appendChild(br);
        msgDiv.appendChild(txtMsg);
        return msgDiv;
    }

    //includes the text input for a message to be sent by currUser as well as the send button to do so
    #createInputBar(){
        const inputBar = document.createElement("div");
        inputBar.classList.add("inputBar");
        const form = document.createElement("form");
        form.style.float = "left";

        const msgInput = document.createElement("input");
        msgInput.type = "text";
        msgInput.placeholder = "Enter Message Here";
        msgInput.id = "msg";
    
        const send = () => {
            const userMsg = document.getElementById("msg");
            const chatBox = document.getElementById("chatBox");
            const newMsg = {userID: this.userID, msg:userMsg.value};
            this.loadedMsgs.push(newMsg);
            chatBox.innerHTML = "";
            this.#renderMsgs(chatBox);
            chatBox.scrollTop = chatBox.scrollHeight;
            userMsg.value = "";
            //TODO: PUT request to server with this.loadedMsgs using repo service for given convoID and update localStorage
            const cachedData = JSON.parse(localStorage.getItem(this.convoID));
            cachedData.msgLog = this.loadedMsgs;
            localStorage.setItem(this.convoID, JSON.stringify(cachedData));
            
            const hub = EventHub.getInstance();
            hub.publish(Events.UpdateChat, {convoID: this.convoID, msgLog: JSON.stringify(this.loadedMsgs)});
        }

        form.addEventListener("submit",  event => {
            //push new entry into array and reload msgLoad array 
            event.preventDefault();
            send();
        });

        const sendButton = document.createElement("button");
        sendButton.innerText = "Send";
        //sendButton.type = "button";
        sendButton.addEventListener("click", send);

        // const backButton = document.createElement("button");
        // const backLabel = document.createTextNode("Back");
        // backButton.appendChild(backLabel);
        // backButton.addEventListener("click", () => {
        //     console.log("back to conversation log page");
        // });

        //inputBar.appendChild(backButton);
        form.appendChild(msgInput);
        inputBar.appendChild(form);
        inputBar.appendChild(sendButton);
        return inputBar;
    }

    #renderMsgs(chatBox){
        this.loadedMsgs.forEach(m =>{
            chatBox.appendChild(this.#createMsgBlock(m.userID, m.msg));
        });
    }
}