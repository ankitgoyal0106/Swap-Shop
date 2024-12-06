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

    this.subscribe(Events.GetConvo, (data) => { //TODO: add GetConvos to Events
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
    const response = await fetch("/v1/savechat}", {
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
      return data;
  }

  async updateChat(convoData) {//updating existing conversation entry for when messageLog is updated
    const response = await fetch(`/v1/updatechat/${convoData.convoID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({msgLog: convoData.msgLog}),
    });

    if (!response.ok) {
      throw new Error("Failed to update chat");
    }

    const data = await response.json();
    return data;
  }

  async getConvo(convoData) { //fetch for a single conversation entry
    const response = await fetch(`/v1/getconvo/${convoData.convoID}`);
    if (!response.ok) {
      throw new Error("Failed to get convo info");
    }

    const data = await response.json();
    return data;
  }
  
}
