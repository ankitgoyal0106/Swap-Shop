import { BaseComponent } from "../BaseComponent/BaseComponent.js";
// for(let i = 0; i < 10; i++){//attach listeners to each of these divs
//     const convo1 = document.createElement("div");
//     convo1.classList.add("convoElement");
//     const text1 = document.createTextNode("Convo" + i);
//     convo1.appendChild(text1);
//     convoContainer.appendChild(convo1);
// }

export class conversationList extends BaseComponent{
    #container = null;
    
    constructor(userID){
        super();
        this.userID = userID;
        //convoList --> use userID to grab list of convoID's and info for a user 
        this.loadCSS("conversation");
    }

    render(){ 
        this.#container = document.createElement("div");
        this.#createConvoBar(); //renders the convoBar with backButton and addConvoButton (need to implement how to create new convos)
        this.#createContainer(); //renders container for conversations

        //load existing conversations from database and display each conversation
        this.#loadConvos();

        return this.#container;
    }

    #createConvoBar(){
        const convoBar = document.createElement("div");
        convoBar.classList.add("convoBar");

        const newConvoButton = document.createElement("button");
        const convoLabel = document.createTextNode("Start New Conversation!");
        newConvoButton.appendChild(convoLabel);
        newConvoButton.classList.add("newConvoButton");
        newConvoButton.addEventListener("click", this.#addConvo);//IMPLEMENT

        const backButton = document.createElement("button");
        const backLabel = document.createTextNode("Back to Profile Page");
        backButton.appendChild(backLabel);
        backButton.classList.add("backButton");
        backButton.addEventListener("click", this.#backToProfile)//IMPLEMENT

        convoBar.appendChild(newConvoButton);
        convoBar.appendChild(backButton);
        this.#container.appendChild(convoBar);
    }

    #createContainer(){
        const convoContainer = document.createElement("div");
        convoContainer.classList.add("convoContainer");
        this.#container.appendChild(convoContainer);
    }

    #loadConvos(){//take conversationIDs, name of group (figure out default), and number of members
        /*
        make div for each one convoElement and display each part of the conversation as needed
        */

    }

    #addConvo(){//adds a new conversation to list, might need a new page/form to input usernames (verification of users to add to the group)
        /*
        ask user for participant names to add to conversation and set default name if not given input
        */
        console.log("add button pressed");
    }

    #backToProfile(){//clears innerHTML and loads the default profile page
        console.log("back button pressed");
    }
}