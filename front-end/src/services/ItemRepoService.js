import { Events } from "../eventhub/Events.js";
import Service from "./Service.js";

export class ItemRepoService extends Service {
  constructor() {
    super();
    this.dbName = "itemDB";
    this.storeName = "items";
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        // Load items on initialization
        this.loadItemsFromDB();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, {
          keyPath: "id",
          autoIncrement: true,
        });
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject("Error initializing IndexedDB");
      };
    });
  }

  async storeItem(itemData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.add(itemData);

      request.onsuccess = () => {
        this.publish(Events.StoreItemSuccess, itemData);
        resolve("Item stored successfully");
      };

      request.onerror = () => {
        this.publish(Events.StoreItemFailure, itemData);
        reject("Error storing item: ");
      };
    });
  }

  async loadItemsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = (event) => {
        const items = event.target.result;
        items.forEach((item) => this.publish("NewItem", item));
        resolve(items);
      };

      request.onerror = () => {
        this.publish(Events.LoadItemsFailure);
        reject("Error retrieving items");
      };
    });
  }

  async clearItems() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        this.publish(Events.ClearItemsSuccess);
        resolve("All items cleared");
      };

      request.onerror = () => {
        this.publish(Events.ClearItemsFailure);
        reject("Error clearing items");
      };
    });
  }

  addSubscriptions() {
    this.subscribe(Events.StoreItem, (data) => {
      this.storeItem(data);
    });

    this.subscribe(Events.ClearItems, () => {
      this.clearItems();
    });
  }
}
