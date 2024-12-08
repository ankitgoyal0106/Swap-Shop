import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { chatInterface } from "../chatroom/chatroom.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { saveEmailToLocalStorage, getEmailFromLocalStorage } from "../../services/LocalStorage.js";

export class conversationList extends BaseComponent{
    #container = null;
    
    constructor(){
        super();
        saveEmailToLocalStorage("example@umass.edu"); //TODO: REMOVE LATER
        this.userID = getEmailFromLocalStorage();
        //convoLog is array of strings of convoIDs
        
        this.convoLog = [];
        //TODO: fetching profiles from back-end
        const hub = EventHub.getInstance();
        hub.subscribe(Events.GetProfileSuccess, data => this.convoLog = data.conversationList); //on a successful retrieval, we can ge the conversationList for the user
        hub.publish(Events.GetProfile, this.userID); //query from database to retrieve profile data

        this.loadCSS("conversation");
    }

    render(){ 
        this.#container = document.createElement("div");
        this.#container.style.display = "block";
        this.#container.appendChild(this.#createConvoBar()); //renders the convoBar with backButton and addConvoButton (need to implement how to create new convos)
        this.#container.appendChild(this.#createContainer()); //renders container for conversations
        this.#container.appendChild(this.#createNewConvoBox());//renders pop up box to create new conversation
        //this.loadConvos();//load existing conversations from database and display each conversation

        return this.#container;
    }

    #makeConvoObj(userGroupName,tempNames, msgs = []){
        function generateUUIDv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0; // Random number between 0 and 15
                const v = c === 'x' ? r : (r & 0x3 | 0x8); // Use 'r' for 'x', and 'r & 0x3 | 0x8' for 'y'
                return v.toString(16); // Convert to hexadecimal
            });
        }
        return {
            convoID: generateUUIDv4(),
            groupName: userGroupName, //String
            groupMembers: tempNames, //Array of Strings
            msgLog: msgs //Array of Objects
        }
    }

    #createConvoBar(){
        const convoBar = document.createElement("div");
        convoBar.classList.add("convoBar");

        const newConvoButton = document.createElement("button");
        const convoLabel = document.createTextNode("Start New Conversation!");
        newConvoButton.appendChild(convoLabel);
        newConvoButton.classList.add("newConvoButton");
        newConvoButton.addEventListener("click", () => {
            if(document.getElementById("infoBox").style.display === "block"){
                document.getElementById("infoBox").style.display = "none";
            }
            else{
                document.getElementById("infoBox").style.display = "block";
            }
        });
        convoBar.appendChild(newConvoButton);
        return convoBar;
    }

    #createContainer(){
        const convoContainer = document.createElement("div");
        convoContainer.id = "convoContainer";
        convoContainer.classList.add("convoContainer");
        if(this.convoLog != []){
            this.convoLog.forEach(id => {
                const convoElem = this.#createContainerElem(id);
                convoContainer.appendChild(convoElem);
            });
        }
        return convoContainer;
    }

    #createContainerElem(convoID){
        const convoBox = document.createElement("div");
        convoBox.classList.add("convoElement");
        //TODO: fetch conversation data structure by convoID and store into convoObj (used to extract the groupName to display in convoBox)
        let convoObj;
        const hub = EventHub.getInstance();
        hub.subscribe(Events.GetConvoSuccess, data => convoObj = data);
        hub.publish(Events.GetConvo, convoID);

        //const upper = document.createTextNode(convoObj.groupName + " | Members: " + convoObj.groupMembers.length);
        const upper = document.createTextNode(convoID);//TODO: REVERT CHANGE LATER
        convoBox.addEventListener("click", () => {
            //TODO: we want chatRoom to only be passed the convoID since email is in localStorage and msgLog is updated within it so a PUT reqeust from chatRoom interface should work
            const chatRoom = new chatInterface(convoID);
            const parent = this.#container.parentElement;
            parent.innerHTML = "";
            parent.appendChild(chatRoom.render());
        })
        convoBox.appendChild(upper);
        return convoBox;
    }

    // popup form to input usernames of people you want to have a conversation with
    #createNewConvoBox(){
        //infoBox setup
        const convoInfoBox = document.createElement("div")
        convoInfoBox.classList.add("convoInfoBox");
        convoInfoBox.id = "infoBox";
        const boxLabel = document.createTextNode("Conversation Info");
        convoInfoBox.appendChild(boxLabel);
        
        //infoBox form setup
        const infoForm = document.createElement("form");
        const groupName = document.createElement("input");
        groupName.type = "text";
        groupName.placeholder = "Enter Group Name";
        groupName.id = "groupName";
        groupName.required = true;
        infoForm.appendChild(groupName);
        const memberName = document.createElement("input");
        memberName.type = "email";
        memberName.placeholder = "Enter Participant Email"
        memberName.id = "memberName";
        memberName.required = true;
        infoForm.appendChild(memberName);

        //div to display members ready to be added
        const membersAdded = document.createElement("div");
        membersAdded.classList.add("memberBox");
        membersAdded.id = "memAddDiv";

        //add member button to add members into localStorage which holds temporary array of members to be added
        const addMemberButton = document.createElement("button");
        const addMemberLabel = document.createTextNode("Add Member");
        addMemberButton.appendChild(addMemberLabel);
        addMemberButton.addEventListener("click", () => {
            const newMember = document.getElementById("memberName");
            const newName = newMember.value;
            if(!newName){
                alert("Enter A Name");
            }
            else{
                //push memberID into temporary array (localStorage)
                let tempNames = JSON.parse(localStorage.getItem("addMembers"));
                if(tempNames === null || tempNames.length === 0){
                    tempNames = [];
                }
                //TODO: use repo service to try and grab the email of the user. If it is sucessfully fetched, can add, if not throw an error
                const hub = EventHub.getInstance();
                hub.subscribe(Events.GetProfileSuccess, () => {
                    tempNames.push(newName);
                    newMember.value = "";

                    const displayMember = document.getElementById("memAddDiv");
                    displayMember.innerHTML = "";
                    const newText = document.createTextNode(newName + " was added");
                    displayMember.appendChild(newText);
                    localStorage.setItem("addMembers", JSON.stringify(tempNames));
                });
                hub.subscribe(Events.GetProfileFailure, () => alert("Cannot Find User. Please Try Again."));
                hub.publish(Events.GetProfile, newName);
        }
        });

        //creates the group and will add a div into the convoContainer with the correct information (group name, convoID, members, member num, etc.)
        const createGroupButton = document.createElement("button");
        const createGroupLabel = document.createTextNode("Create Group");
        createGroupButton.appendChild(createGroupLabel);
        createGroupButton.addEventListener("click", () => {
            const newGroup = document.getElementById("groupName");
            const newGroupName = newGroup.value;
            if(!newGroupName){
                alert("Enter A Group Name");
            }
            else{
                const tempNames = JSON.parse(localStorage.getItem("addMembers"));
                if(tempNames === null || tempNames.length === 0){
                    alert("Group Requires at least one other member");
                }
                else{
                    document.getElementById("infoBox").style.display = "none";

                    console.log(newGroupName + " was created");
                    newGroup.value = "";

                    const newMember = document.getElementById("memberName");
                    newMember.value = "";

                    const memList = document.getElementById("memAddDiv");
                    memList.innerHTML = "";

                    localStorage.setItem("addMembers", JSON.stringify([]));
                    
                    tempNames.push(this.userID);//add current user into list of participants
                    
                    const convoObj = this.#makeConvoObj(newGroupName, tempNames);
                    const newConvoElem = this.#createContainerElem(convoObj.convoID);//TODO: REVERT CHANGE LATER TO GROUPNAME
                    const convoContainer = document.getElementById("convoContainer");
                    convoContainer.appendChild(newConvoElem);
                    console.log(this.convoLog);

                    //TODO: use repo service to create a new entry into the SQLite database
                    const hub = EventHub.getInstance();
                    //tempNames.append() //append current user to the list of participants
                    hub.publish(Events.SaveNewChat, convoObj);
                    this.convoLog.push(convoObj.convoID);
                    //TODO: PUT this.convoLog into database entry for that profile based on email
                    hub.publish(Events.ProfileEdited, {conversationListing: this.convoLog});
                }
            }
            
        });

        //resets all of the inputs for the convoInfoBox and resets localStorage
        const closeButton = document.createElement("button");
        const closeLabel = document.createTextNode("Close");
        closeButton.appendChild(closeLabel);
        closeButton.addEventListener("click", () => {
            document.getElementById("infoBox").style.display = "none";

            const newGroup = document.getElementById("groupName");
            newGroup.value = "";

            const newMember = document.getElementById("memberName");
            newMember.value = "";
            
            const memList = document.getElementById("memAddDiv");
            memList.innerHTML = "";

            localStorage.setItem("addMembers", JSON.stringify([]));
        });

        convoInfoBox.appendChild(infoForm);
        convoInfoBox.appendChild(addMemberButton);
        convoInfoBox.appendChild(createGroupButton);
        convoInfoBox.appendChild(closeButton);
        convoInfoBox.appendChild(membersAdded);
        return convoInfoBox;
    }
}