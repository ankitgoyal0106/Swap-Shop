import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

export class ProfileRepositoryService extends Service {
    constructor() {
        super();
        this.dbName = 'profileDB';
        this.storeName = 'profiles';
        this.db = null;

        // Initialize the database
        this.initDB()
            .then(() => {
                this.loadProfilesFromDB(); // Load profile on initialization
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

    async storeProfile(profileData) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add(profileData);

            request.onsuccess = () => {
                this.publish(Events.StoreProfileSuccess, profileData);
                console.log('Profile stored successfully', profileData);
                resolve('Profile stored successfully');
            };

            request.onerror = () => {
                this.publish(Events.StoreProfileFailure, profileData);
                reject('Error storing profile');
            };
        });
    }

    async loadProfilesFromDB() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            
            const request = store.getAll();

            request.onsuccess = event => {
                const profileData = event.target.result;
                if (profileData) {
                    this.publish(Events.LoadProfileSuccess, profileData);
                    resolve(profileData);
                } else {
                    this.publish(Events.LoadProfileFailure, profileData);
                    reject('Profile not found');
                }
            };

            request.onerror = () => {
                this.publish(Events.LoadProfileFailure);
                reject('Error retrieving profile');
            };
        });
    }
    
    async getProfileFromDB(userID) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            
            const request = store.get(userID); //Not sure if this is the correct way to get the user profile

            request.onsuccess = event => {
                const profileData = event.target.result;
                if (profileData) {
                    this.publish(Events.GetProfileSuccess, profileData);
                    resolve(profileData);
                } else {
                    this.publish(Events.GetProfileFailure, profileData);
                    reject('Profile not found');
                }
            };

            request.onerror = () => {
                this.publish(Events.GetProfileFailure);
                reject('Error retrieving profile');
            };
        });
    }

    async deleteProfile(userID) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(userID);

            request.onsuccess = () => {
                this.publish(Events.DeleteProfileSuccess);
                resolve('Profile deleted successfully');
            };

            request.onerror = () => {
                this.publish(Events.DeleteProfileFailure);
                reject('Error deleting profile');
            };
        });
    }

    addSubscriptions() {
        this.subscribe(Events.StoreProfile, data => {
            this.storeProfile(data);
        });

        this.subscribe(Events.GetProfile, userID => {
            this.getProfileFromDB(userID);
        });

        this.subscribe(Events.DeleteProfile, userID => {
            this.deleteProfile(userID);
        });
    }
}
