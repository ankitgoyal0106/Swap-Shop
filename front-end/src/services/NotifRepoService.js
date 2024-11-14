import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

export class NotifRepoService extends Service {
  constructor() {
    super();
    this.dbName = 'taskDB';
    this.storeName = 'notifs';
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        // Load tasks on initialization
        this.loadNotifsFromDB();
      })
      .catch(error => {
        console.error(error);
      });
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      };

      request.onsuccess = event => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = event => {
        reject('Error initializing IndexedDB');
      };
    });
  }

  async storeNotif(notifData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(notifData);

      request.onsuccess = () => {
        this.publish(Events.StoreNotificationSuccess, notifData);
        resolve('Notification stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreNotificationFailure, notifData);
        reject('Error storing notification: ');
      };
    });
  }

  async loadNotifsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const notifs = event.target.result;
        notifs.forEach(notif => this.publish('NewNotification', notif));
        this.publish(Events.LoadNotificationsSuccess);
        resolve(notifs);
      };

      request.onerror = () => {
        this.publish(Events.LoadNotificationsFailure);
        reject('Error retrieving notifications');
      };
    });
  }

  async clearNotifs() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        this.publish(Events.ClearNotificationsSuccess);
        resolve('All notifications cleared');
      };

      request.onerror = () => {
        this.publish(Events.ClearNotificationsFailure);
        reject('Error clearing notifications');
      };
    });
  }

  addSubscriptions() {
    this.subscribe(Events.StoreNotification, data => {
      this.storeNotif(data);
    });

    this.subscribe(Events.ClearNotifications, () => {
      this.clearNotifs();
    });
  }
}
