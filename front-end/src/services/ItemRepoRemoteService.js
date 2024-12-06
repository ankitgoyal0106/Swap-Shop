import Service from "./Service.js";
import { Events } from "../eventhub/Events.js";
//TODO: Import base64

export class ItemRepoRemoteService extends Service {
  constructor() {
    super();
    this.#initItems();
  }

  addSubscriptions() {
    this.subscribe(Events.StoreItem, (data) => {
      this.storeItem(data);
    });

    this.subscribe(Events.ClearItems, () => {
      this.clearItems();
    });
  }

  async #initItems() {
    const response = await fetch("http://localhost:3000/v1/items");
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const data = await response.json();

    data.items.forEach(async (item) => {
      //TODO: Add base 64 conversion

      this.publish(Events.NewItem, item);
    });
  }

  async storeItem(itemData) {
    //TODO: Add base 64 conversion
    console.log("Attempting to store");
    console.log(JSON.stringify(itemData));
    const response = await fetch("http://localhost:3000/v1/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      throw new Error("Failed to store item");
    }

    const data = await response.json();
    return data;
  }

  //TODO: Add base 64 method here

  async clearItems() {
    const response = await fetch("/v1/items", {
      method: "DELETE",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to clear items");
    }

    // Notify subscribers that items have been cleared from the server.
    // This is likely needed to update the UI.
    this.publish(Events.ClearItemsSuccess);

    return data;
  }

  async getItems() {
    const response = await fetch("/v1/items");
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const data = await response.json();
    return data.items;
  }
  
}
