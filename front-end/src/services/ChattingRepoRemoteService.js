import Service from "./Service.js";
import { Events } from "../eventhub/Events.js";
//TODO: Import base64

export class ChattingRepoRemoteService extends Service {
  constructor() {
    super();
    //this.#initConversations();
  }

  addSubscriptions() {
    this.subscribe(Events.SaveNewChat, (data) => { //TODO: add SaveNewChat to Events
       this.saveNewChat(data);
    });

    this.subscribe(Events.UpdateChat, (data) => { //TODO: add UpdateChat to Events
       this.updateChat(data);
    });

    this.subscribe(Events.GetConvo, (data) => { //TODO: add GetConvo to Events
       this.getConvo(data);
    });
  }

//   async #initConversations() {
//     const response = await fetch("/v1/items");
//     if (!response.ok) {
//       throw new Error("Failed to fetch items");
//     }

//     const data = await response.json();

//     data.convos.forEach(async (convo) => {
//       this.publish(Events.NewConvo, convo); //TODO: add NewConvo to Events
//     });
//   }

  async saveNewChat(convoData){//starting a new conversation with empty messageLog
    console.log("saving chat...");
    const response = await fetch("http://localhost:3000/v1/savechat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convoData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save chat");
      }
  
      const data = await response.json();
      console.log("Saved Chat");
      this.publish(Events.SaveNewChatSuccess, data);
      return data;//publish here
  }

  //updating existing conversation entry for when messageLog is updated
  async updateChat(convoData) {
    const response = await fetch(`http://localhost:3000/v1/updatechat`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(convoData),
    });

    if (!response.ok) {
      this.publish(Events.UpdateChatFailure, "Unable to update conversation");
      throw new Error("Failed to update chat");
    }
    else{
      const data = await response.json();
      //TODO: put a publish here so front end can re-render
      this.publish(Events.UpdateChatSuccess, data);//publish so front end components can be passed the data from the back end
      console.log("Updated Chat");

    }
  }

  //fetch for a single conversation entry
  async getConvo(convoID) {
    const response = await fetch(`http://localhost:3000/v1/getconvo/${convoID}`);
    
    if(!response.ok){
      this.publish(Events.GetConvoFailure, `Unable to retrieve conversation`);
      throw new Error("Failed to retrieve conversation");
    }
    else{
      const data = await response.json();
      this.publish(Events.GetConvoSuccess, data);//publish so front end components can be passed the data from the back end
      console.log("Got Convo");
    }
  }
  
}

export default new ChattingRepoRemoteService();