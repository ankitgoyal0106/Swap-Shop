import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { getEmailFromLocalStorage } from "../../services/LocalStorage.js";

export class ViewProfile extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('ViewProfile');
    }

    render(){
        this.#container = document.createElement('div');
        this.#container.classList.add('user-info-section');
        this.#setupContainerContent();
        this.#attachEventListeners();

        return this.#container;
    }

    #setupContainerContent(){
        this.#container.appendChild(this.#createUserInfoSection());
        this.#container.appendChild(this.#createItemsGrid());
    }
    #createUserInfoSection() {
        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info-section');

        const profilePicture = document.createElement('img');
        profilePicture.className = 'profile-picture';
        profilePicture.id = 'home-profile-picture';
        profilePicture.src = 'https://via.placeholder.com/150';
        profilePicture.alt = 'Profile Picture';

        const userName = document.createElement('h1');
        userName.className = 'user-name';
        userName.textContent = "Hello, FirstName!";
  
        // Additional user info can be added here
  
        userInfo.appendChild(profilePicture);
        userInfo.appendChild(userName);
        return userInfo;
    }

    #createItemsGrid() {
        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'items-grid';
  
        const items = this.#getUserItems();

        // Display user's items
        items.forEach(item => {
          const itemCard = this.#createItemCard(item);
          itemsGrid.appendChild(itemCard);
        });
  
        return itemsGrid;
      }

      #createItemCard(item) {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
  
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        itemCard.appendChild(img);
  
        const itemTitle = document.createElement('h2');
        itemTitle.textContent = item.title;
        itemCard.appendChild(itemTitle);
  
        const itemDescription = document.createElement('p');
        itemDescription.textContent = item.description;
        itemCard.appendChild(itemDescription);
  
        return itemCard;
      }

      #getUserItems() {
        // Hardcoded items listed by the user
        return [
          { src: '', title: 'User Item 1', description: 'Description for user item 1' },
          { src: '', title: 'User Item 2', description: 'Description for user item 2' },
          { src: '', title: 'User Item 3', description: 'Description for user item 3' },
          { src: '', title: 'User Item 4', description: 'Description for user item 4' },
          { src: '', title: 'User Item 5', description: 'Description for user item 5' },
          { src: '', title: 'User Item 6', description: 'Description for user item 6' },
          // Add more items as needed
        ];
      }

    #attachEventListeners() {
      const hub = EventHub.getInstance();
      hub.subscribe(Events.LoginSuccess, (profileData) => {
        this.#container.querySelector('.user-name').textContent = `Hello, ${profileData.user.name.split(' ')[0]}!`;
        //if (profileData.user.profilePicture) {
        //  this.#container.querySelector('.profile-picture').src = profileData.user.profilePicture;
        //}
        // TODO: Add additional user info here that needs to be loaded upon login
      });
      hub.subscribe(Events.ProfileEditedSuccess, (profileData) => {
        this.#container.querySelector('.user-name').textContent = `Hello, ${profileData.profile.name.split(' ')[0]}!`;
        
        //if (profileData.profilePicture) {
        //  this.#container.querySelector('.profile-picture').src = profileData.profile.profilePicture;
        //}
      });
    }
}