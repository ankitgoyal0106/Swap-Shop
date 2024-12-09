import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { Events } from "../../eventhub/Events.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { getEmailFromLocalStorage } from '../../services/LocalStorage.js';

export class Achievement extends BaseComponent {
    #container = null;
    #textContent = null;
    #profileData = null;
    #hub = null;
    email = null;

    constructor() {
        super();
        this.loadCSS('Achievement');
        this.eventHub = EventHub.getInstance();
        this.email = getEmailFromLocalStorage();
        this.fetchProfileData(); 
        this.subscribeToItemEvents();
      }

    //Subscribe to the events
    subscribeToItemEvents(){
        this.eventHub.subscribe(Events.ListItem, this.handleItemListed.bind(this));
        this.eventHub.subscribe(Events.MarkItemSold, this.handleItemSold.bind(this)); 
        this.eventHub.subscribe(Events.ViewItem, this.handleItemViewed.bind(this));
    }

    //Increment the values within the profile
    async handleItemListed (){
        await this.incrementAchievementCount('listed');
    }

    async handleItemSold (){
        await this.incrementAchievementCount('sold');
    }
    
    async handleItemViewed (){
        await this.incrementAchievementCount('viewed');
    }

    async incrementAchievementCount(field) {
        try {
            // Fetch the current profile data
            const response = await fetch(`http://localhost:3000/v1/profiles/${this.email}`);
            if (!response.ok) {
                throw new Error("Profile not found");
            }

            const profileData = await response.json();
            const achievementCounts = profileData.achievementCounts || {};

            // Increment the achievement count
            achievementCounts[field] = (achievementCounts[field] || 0) + 1;


            // Update the profile
            await this.updateProfileData(achievementCounts);
        } catch (error) {
            console.error("Error incrementing achievement count:", error);
        }
    }
    
    async updateProfileData(updatedAchievementCounts) {
        try {
            const updatedProfileData = {
                ...this.#profileData, 
                achievementCounts: updatedAchievementCounts, 
            };

            const response = await fetch(`http://localhost:3000/v1/profiles:${this.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfileData),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const updatedData = await response.json();
            this.#profileData = updatedData;
            this.eventHub.publish(Events.ProfileEdited, updatedData);

        } catch (error) {
            console.error("Error updating profile data:", error);
        }
    }

    async fetchProfileData() {
        try {
            const response = await fetch(`http://localhost:3000/v1/profiles:${this.email}`);
            if (!response.ok) {
                throw new Error("Profile not found");
            }

            const profileData = await response.json();
            this.#profileData = profileData; 
            this.render();

        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('achievements');
    
        const achievementContent = document.createElement('div');
        achievementContent.className = 'achievement-content'

        const { achievementCounts } = this.#profileData;

        //Array containing all the badgeData and the condition to get them
        const badgeData = [
            { src: 'achievement-badges/welcome-badge.jpg', alt: 'Badge 1', title: 'Welcome! You made a profile', condition: true },
            { src: 'achievement-badges/list-1.png', alt: 'Badge 2', title: 'You listed one item', condition: achievementCounts.listed >= 1 },
            { src: 'achievement-badges/list-10.png', alt: 'Badge 3', title: 'You listed 10 items!', condition: achievementCounts.listed >= 10 },
            { src: 'achievement-badges/list-50.png', alt: 'Badge 4', title: 'WOW, you listed 50 items!', condition: achievementCounts.listed >= 50 },
            { src: 'achievement-badges/sell-1.png', alt: 'Badge 5', title: 'You sold your first item', condition: achievementCounts.sold >= 1 },
            { src: 'achievement-badges/sell-10.png', alt: 'Badge 6', title: 'You sold 10 items!', condition: achievementCounts.sold >= 10 },
            { src: 'achievement-badges/sell-50.png', alt: 'Badge 7', title: 'Amazing! You sold 50 items', condition: achievementCounts.sold >= 50 },
            { src: 'achievement-badges/view-1.png', alt: 'Badge 8', title: 'Congrats on viewing your first item!', condition: achievementCounts.viewed >= 1 },
            { src: 'achievement-badges/view-10.png', alt: 'Badge 9', title: 'You\'ve been busy...you viewed 10 items', condition: achievementCounts.viewed >= 10 },
            { src: 'achievement-badges/view-50.png', alt: 'Badge 10', title: 'Professional window shopper...you viewed 50 items', condition: achievementCounts.viewed >= 50 },
            { src: 'achievement-badges/easter-egg.png', alt: 'Badge 11', title: 'You Found the Easter Egg!', condition: achievementCounts.easterEgg }
        ];

        //Badge data is displayed if the conditions are met and then rendered on the page
        badgeData.forEach(badge => {
           if(badge.condition){ //check if the conditions are met
            const img = document.createElement('img');
            img.src = badge.src;
            img.alt = badge.alt;
            img.title = badge.title;
            img.className = 'badge';
            achievementContent.appendChild(img);
           }
        });
        
        container.appendChild(achievementContent);
        return container;
    }
}