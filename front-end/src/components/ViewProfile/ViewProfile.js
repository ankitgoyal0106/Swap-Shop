import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { getEmailFromLocalStorage } from "../../services/LocalStorage.js";
import { ItemRepoFactory } from "../../services/ItemRepoFactory.js";

export class ViewProfile extends BaseComponent {
    #container = null;
    #changeViewCount = 0;
    #deleteItemCount = 0;

    constructor() {
        super();
        this.loadCSS('ViewProfile');
        this.#container = document.createElement('div');
        this.#container.classList.add('profile-page');
        ItemRepoFactory.get();
    }

    render(){
        this.#container.innerHTML = '';
        this.#setupContainerContent();
        this.#attachEventListeners();
        this.#changeViewCount = 0;
        this.#deleteItemCount = 0;

        return this.#container;
    }

    #setupContainerContent(){
        this.#container.appendChild(this.#createUserInfoSection());
        this.#container.appendChild(this.#createItemsGrid());
    }
    #createUserInfoSection() {
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info-section';

        /* TODO: Implement Profile Picture as stretch goal
        const profilePicture = document.createElement('img');
        profilePicture.className = 'profile-picture';
        profilePicture.id = 'home-profile-picture';
        profilePicture.src = 'https://via.placeholder.com/150';
        profilePicture.alt = 'Profile Picture';
        */

        const userName = document.createElement('h1');
        userName.className = 'user-name';
        userName.id = 'user-name';
        userName.textContent = "";
  
        // Additional user info can be added here
        const message = document.createElement('h3');
        message.textContent = 'Your Listed Items:';
        message.id = 'profile-message';
        message.className = 'profile-message';

        //userInfo.appendChild(profilePicture);
        userInfo.appendChild(userName);
        userInfo.appendChild(message);
        return userInfo;
    }

    #createItemsGrid() {
        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'items-grid';
        return itemsGrid;
      }

      #createItemCards(items, itemsGrid) {
        items.forEach(item => {
          const itemCard = this.#createItemCard(item);
          itemsGrid.appendChild(itemCard);
        });

        this.#container.appendChild(itemsGrid);
      }

      #createItemCard(item) {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';

        const itemTitle = document.createElement('h2');
        itemTitle.textContent = item.itemName;
        itemCard.appendChild(itemTitle);
        itemTitle.addEventListener('click', () => {
            console.log('Clicked on item:', item.itemName);
            const hub = EventHub.getInstance();
            hub.publish('ViewItem', item);
            hub.publish('SwitchToItemPage', item);
        });

        // const img = document.createElement('img');
        // img.alt = item.itemName; // Use the item's name as alt text
        // img.className = 'item-image';
        // itemCard.appendChild(img);

        const itemDescription = document.createElement('p');
        itemDescription.textContent = item.itemDescription;
        itemCard.appendChild(itemDescription);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.id = 'delete-btn';
        deleteBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const hub = EventHub.getInstance();
          hub.publish(Events.DeleteItem, item.listingID);
          hub.publish(Events.SwitchToProfilePage, null);
        });
        itemCard.appendChild(deleteBtn);

        return itemCard;
    }

      #getUserItems() {
        if (!getEmailFromLocalStorage()) {
          return;
        }

        const hub = EventHub.getInstance();
        const email = getEmailFromLocalStorage();
        hub.publish(Events.GetItemsWithEmail, email);
      }

      #attachEventListeners() {
        const hub = EventHub.getInstance();

        // Subscribe to events
        hub.subscribe(Events.ChangedViewToProfile, (profileData) => {
          console.log("HERE")
          this.#container.querySelector('.user-name').textContent = `Hello, ${profileData.name.split(' ')[0]}!`;
          if (this.#changeViewCount === 0) {
            this.#getUserItems();
            this.#changeViewCount++;
          }
        });
        hub.subscribe(Events.GetItemsWithEmailSuccess, (data) => {
          const itemsGrid = this.#container.querySelector('.items-grid');
          itemsGrid.innerHTML = '';
          this.#createItemCards(data.items, itemsGrid);
        });

        hub.subscribe(Events.DeleteItemSuccess, () => {
          if (this.#deleteItemCount === 0) {
            this.#deleteItemCount++;
            this.#getUserItems();
          }
        });
      }
}