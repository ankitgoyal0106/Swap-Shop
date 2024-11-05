import { BaseComponent } from "../BaseComponent/BaseComponent.js";
// for(let i = 0; i < 10; i++){//attach listeners to each of these divs
//     const convo1 = document.createElement("div");
//     convo1.classList.add("convoElement");
//     const text1 = document.createTextNode("Convo" + i);
//     convo1.appendChild(text1);
//     convoContainer.appendChild(convo1);
// }

//when clicking on a conversation, it should pop it from convoList and append it after to make it most recent

export class conversationList extends BaseComponent{
    #container = null;
    
    constructor(userID){
        super();
        this.userID = userID;
        //convoLog --> use userID to grab list of convoID's and info for a user 
        this.convoLog = this.#loadConvos();
        this.loadCSS("conversation");
    }

    render(){ 
        this.#container = document.createElement("div");
        this.#container.style.display = "block";
        this.#container.appendChild(this.#createConvoBar()); //renders the convoBar with backButton and addConvoButton (need to implement how to create new convos)
        const container = this.#createContainer();
        //REMOVE AFTER TESTING
        // for(let i = 10; i > 0; i--){
        //     const convo1 = document.createElement("div");
        //     convo1.classList.add("convoElement");
        //     const text1 = document.createTextNode("Convo" + i);
        //     convo1.appendChild(text1);
        //     container.appendChild(convo1);
        // }
        //REMOVE AFTER TESTING
        this.#container.appendChild(container); //renders container for conversations
        this.#container.appendChild(this.#createNewConvoBox());//renders pop up box to create new conversation
        this.#loadConvos();//load existing conversations from database and display each conversation

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
            document.getElementById("infoBox").style.display = "block";
            console.log("add button pressed");
        });//IMPLEMENT

        const backButton = document.createElement("button");
        const backLabel = document.createTextNode("<< Back to Profile Page");
        backButton.appendChild(backLabel);
        backButton.classList.add("backButton");
        backButton.addEventListener("click", console.log("back button pressed"))//IMPLEMENT

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
        //TODO: make div container element with Group Name | #{ConvoID} -- Number of People
        const convoBox = document.createElement("div");
        convoBox.classList.add("convoElement");
        const text = document.createTextNode(convoObj.groupName + " | #" + convoObj.convoID + " Members: " + convoObj.names.length);
        //TODO: make it so when clicked on (addEventListener) it brings to chatRoom using the convoID
        convoBox.appendChild(text);
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
        groupName.placeholder = "Enter Group Name"
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
        membersAdded.addEventListener("storage", () =>{
            membersAdded.value = "";
            const tempNames = JSON.parse(localStorage.getItem("addMembers"));
            tempNames.forEach(name=>{
                const nameNode = document.createTextNode(name + " ");
                membersAdded.appendChild(nameNode);
            })
        });

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

                tempNames.push(newName);

                console.log(newName + " was added");
                newMember.value = "";

                localStorage.setItem("addMembers", JSON.stringify(tempNames));
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
                //TODO: craete function that generated new IDs and checks to see if they already exist
                const generateConvoID = () => {return 0;};//generate a convoID
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

                    // const memList = document.getElementById("memAddDiv");
                    // memList.value = "";
                    localStorage.setItem("addMembers", JSON.stringify([]));

                    //TODO: create div container with group info and add a href or something to send convoID to chatroom interface to load from server
                    const convoObj = {
                        groupName: newGroupName,
                        convoID: generateConvoID(),
                        names: tempNames
                    }
                    const newConvoElem = this.#createContainerElem(convoObj);
                    const convoContainer = document.getElementById("convoContainer");
                    //TODO: push into array to be rendered later on
                    convoContainer.appendChild(newConvoElem);


                    //TODO: needs to send data to database and do some server side stuff
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
            
            // const memList = document.getElementById("memAddDiv");
            // memList.value = "";
            localStorage.setItem("addMembers", JSON.stringify([]));
        });


        convoInfoBox.appendChild(infoForm);
        convoInfoBox.appendChild(addMemberButton);
        convoInfoBox.appendChild(createGroupButton);
        convoInfoBox.appendChild(closeButton);
        convoInfoBox.appendChild(membersAdded);
        return convoInfoBox;
    }
    

    #loadConvos(){//take conversationIDs, name of group (figure out default), and number of members
        /*
        make div for each one convoElement and display each part of the conversation as needed
        load it backwards since appending will be the most recent convos

        return convoLog
        */
       return [];

    }

    //click function for each convo div
    /*
    #loadChatRoom(convoID, messageLog){

    } 
    */
}