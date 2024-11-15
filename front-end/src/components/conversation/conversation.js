import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { chatInterface } from "../chatroom/chatroom.js";

export class conversationList extends BaseComponent{
    #container = null;
    
    constructor(userID, convoLog){
        super();
        this.userID = userID;
        this.convoLog = convoLog; //hashmap that maps convoID to convoObj
        this.loadCSS("conversation");
    }

    render(){ 
        this.#container = document.createElement("div");
        this.#container.style.display = "block";
        this.#container.appendChild(this.#createConvoBar()); //renders the convoBar with backButton and addConvoButton (need to implement how to create new convos)
        this.#container.appendChild(this.#createContainer()); //renders container for conversations
        this.#container.appendChild(this.#createNewConvoBox());//renders pop up box to create new conversation
        //this.#loadConvos();//load existing conversations from database and display each conversation

        return this.#container;
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

        const backButton = document.createElement("button");
        const backLabel = document.createTextNode("<< Back to Profile Page");
        backButton.appendChild(backLabel);
        backButton.classList.add("backButton");
        backButton.addEventListener("click", () => console.log("back button pressed"))//TODO: make backButton functionality

        convoBar.appendChild(newConvoButton);
        convoBar.appendChild(backButton);
        return convoBar;
    }

    #createContainer(){
        const convoContainer = document.createElement("div");
        convoContainer.id = "convoContainer";
        convoContainer.classList.add("convoContainer");
        return convoContainer;
    }

    #createContainerElem(convoObj){
        const convoBox = document.createElement("div");
        convoBox.classList.add("convoElement");
        const upper = document.createTextNode(convoObj.groupName + " | Members: " + convoObj.names.length);
        const br = document.createElement("br");
        const lower = document.createTextNode("id#" + convoObj.convoID);
        //TODO: make it so when clicked on (addEventListener) it brings to chatRoom using the convoID (innerHTML nuke)
        convoBox.addEventListener("click", () => {
            // alert(convoObj.convoID +" was pressed, move to chat room");
            // const convoObj = {
            //     groupName: "",
            //     convoID: generateConvoID(),
            //     names: ""
            // }

            //figure out a better way to do this, don't forget to check to see if that instance already exists
            const chatRoom = new chatInterface(this.userID, convoObj.convoID,convoObj.groupName, [{userID: "user1", msg:"Innovation shapes our world, driving everything from the technology we use to the ways we interact and solve problems. In an ever-evolving landscape, creativity and adaptability are more important than ever, allowing individuals and teams to push boundaries and discover new solutions. Whether in science, art, or technology, innovation thrives on curiosity and a willingness to challenge the status quo, ultimately enriching our lives and paving the way for a more connected, sustainable future."}, {userID: this.userID, msg:"what?"},{userID: "user2", msg:"sigh"}])//need to loadMsgs from IndexedDB
            this.#container.innerHTML = "";//concern here of DOM tree hell
            this.#container.appendChild(chatRoom.render());
        })
        convoBox.appendChild(upper);
        convoBox.appendChild(br);
        convoBox.appendChild(lower);
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
        memberName.type = "text";
        memberName.placeholder = "Enter Member Name"
        memberName.id = "memberName";
        memberName.required = true;
        infoForm.appendChild(memberName);

        //div to display members ready to be added
        const membersAdded = document.createElement("div");
        membersAdded.classList.add("memberBox");
        membersAdded.id = "memAddDiv";

        //add member button to add members into localStorage which holds temporary array of members to be added
        //TODO: addMemberButton
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
                //TODO: before submitting, verify whether or not that username is a valid username (existing within database or smth) before pushing to localStorage
                tempNames.push(newName);

                newMember.value = "";

                const displayMember = document.getElementById("memAddDiv");
                displayMember.innerHTML = "";
                const newText = document.createTextNode(newName + " was added");
                displayMember.appendChild(newText);
                localStorage.setItem("addMembers", JSON.stringify(tempNames));
        }
        });

        //creates the group and will add a div into the convoContainer with the correct information (group name, convoID, members, member num, etc.)
        //TODO: createGroupButton
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
                const generateConvoID = () => {
                    let genID = String(Math.random()).slice(2,12);
                    while(this.convoLog[genID] != null){
                        genID = String(Math.random()).slice(2,12);
                    }
                    return genID;
                };
                const tempNames = JSON.parse(localStorage.getItem("addMembers"));
                //potentially add current user to list of users but only display the ones that don't match the userID
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

                    const convoObj = {
                        groupName: newGroupName,
                        convoID: generateConvoID(),
                        names: tempNames
                    }
                    const newConvoElem = this.#createContainerElem(convoObj);
                    const convoContainer = document.getElementById("convoContainer");
                    //this.convoLog.push(convoObj);
                    this.convoLog[convoObj.convoID] = convoObj;//better for searching
                    convoContainer.appendChild(newConvoElem);
                    console.log(this.convoLog);

                    //TODO: needs to send data to database and do some server side stuff
                }
            }
            
        });

        //resets all of the inputs for the convoInfoBox and resets localStorage
        //TODO: closeButton
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
    
    //TODO: implement loadConvos
    loadConvos(){
        /*
        use convoID to grab existsing log of conversations from database, if does not exist, initialize empty array and save that to database
        -> returns some array then run forEach since each element will be a convoObj and render each with this.#createContainerElem(convoObj)
        and appendChild to convoContainer div !!IN REVERSE ORDER SINCE TAIL END IS MOST RECENT CONVOS!!

        return convoLog

        const convoObj = {
                        groupName: newGroupName,
                        convoID: generateConvoID(),
                        names: tempNames
                    }
        hashmap of convoLog[convoID] = convoObj
        */
        const container = document.getElementById("convoContainer");
        Object.values(this.convoLog).forEach(obj => {
            const convoElem = this.#createContainerElem(obj);
            container.appendChild(convoElem);
        });
    }

    //TODO: implement loadChatRooms
    /*
    click function for each convo div
    #loadChatRoom(convoID, messageLog){

    } 
    */
}