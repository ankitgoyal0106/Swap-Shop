import { BaseComponent } from "../BaseComponent/BaseComponent.js";
/*
1. create chatroom interface dynamically
2. dynamically add messages into the div
3. send message with button
*/

export class chatInterface extends BaseComponent{
    #container = null;

    constructor(userID, convoID, groupName, loadedMsgs){
        super();
        this.userID = userID;
        this.convoID = convoID;
        this.groupName = groupName;
        this.loadedMsgs = loadedMsgs;
        /*
        msg{
            userID: "",
            msg: "",
            timestamp: ""
        }
        */
        this.loadCSS("chatroom");
    }

    render(){
        this.#container = document.createElement("div");
        this.#container.classList.add("container");
        this.#container.style.display = "block";
        const title = document.createElement("h1");
        title.innerText = this.groupName;
        this.#container.appendChild(title);
        const chatBox = this.#createChat();
        this.#renderMsgs(chatBox);
        this.#container.appendChild(chatBox);
        this.#container.appendChild(this.#createInputBar());
        return this.#container;
    }
    //TODO: create the chat interface to display messages in loadMsgs
    #createChat(){
        const chatBox = document.createElement("div");
        chatBox.classList.add("chatBox")
        chatBox.id = "chatBox";
        return chatBox;
    }

    //TODO: create div for each text message, two different CSS classes: one for user which are margined to the right and other users which are margined to left
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
        // const makeNewLine = textMessage =>{

        // };
        // txtMsg.innerText = msg;
        msgDiv.appendChild(id);
        msgDiv.appendChild(br);
        msgDiv.appendChild(txtMsg);
        //msgDiv.innerText = userID + "\n" + msg;
        return msgDiv;
    }

    //TODO: this will include the text input for a message to be sent by currUser as well as the send button to do so
    #createInputBar(){
        const inputBar = document.createElement("div");
        inputBar.classList.add("inputBar");
        const form = document.createElement("form");
        form.style.float = "left";

        const msgInput = document.createElement("input");
        msgInput.type = "text";
        msgInput.placeholder = "Enter Message Here";
        msgInput.id = "msg";
        msgInput.addEventListener("input", () =>{
            hide.textContent = txt.value;
            txt.style.width = hide.offsetWidth + "px";
        })
        //msgInput.classList.add("msgInput");
        form.addEventListener("submit",  event => {
            //maybe push new entry into array and reload msgLoad array 
            event.preventDefault();
            const userMsg = document.getElementById("msg");
            const chatBox = document.getElementById("chatBox");
            const newMsg = {userID: this.userID, msg:userMsg.value};
            this.loadedMsgs.push(newMsg);
            //chatBox.appendChild(msgBlock);
            chatBox.innerHTML = "";
            this.#renderMsgs(chatBox);
            chatBox.scrollTop = chatBox.scrollHeight;
            userMsg.value = "";
        });

        const sendButton = document.createElement("button");
        sendButton.innerText = "Send";
        //sendButton.type = "button";
        sendButton.addEventListener("click", () => {
            //maybe push new entry into array and reload msgLoad array 
            const userMsg = document.getElementById("msg");
            const chatBox = document.getElementById("chatBox");
            const newMsg = {userID: this.userID, msg:userMsg.value};
            this.loadedMsgs.push(newMsg);
            //chatBox.appendChild(msgBlock);
            chatBox.innerHTML = "";
            this.#renderMsgs(chatBox);
            chatBox.scrollTop = chatBox.scrollHeight;
            userMsg.value = "";
        });

        const backButton = document.createElement("button");
        const backLabel = document.createTextNode("Back");
        backButton.appendChild(backLabel);
        backButton.addEventListener("click", () => {
            console.log("back to conversation log page");
        });

        inputBar.appendChild(backButton);
        form.appendChild(msgInput);
        inputBar.appendChild(form);
        inputBar.appendChild(sendButton);
        return inputBar;
    }

    #renderMsgs(chatBox){
        this.loadedMsgs.forEach(m =>{
            console.log(chatBox);
            chatBox.appendChild(this.#createMsgBlock(m.userID, m.msg));
        });
    }
}