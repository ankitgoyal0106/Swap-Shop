import Service from "./Service.js";
import { Events } from "../eventhub/Events.js";

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

      this.publish(Events.NewItem, item);
    });
  }

  async storeItem(itemData) {
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

  async clearItems() {
    const response = await fetch("http://localhost:3000/v1/items", {
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
    const response = await fetch("http://localhost:3000/v1/items");
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const data = await response.json();
    return data.items;
  }
  
}
