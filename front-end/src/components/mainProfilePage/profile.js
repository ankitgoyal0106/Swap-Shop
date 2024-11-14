import { BaseComponent } from "../BaseComponent/BaseComponent.js";
  
  export class profilePage extends BaseComponent {
    #container = null;
    #itemsGrid = null;
    #editProfileButton = null;
    #userInfoSection = null;
    #addNewItemButton = null;
  
    constructor() {
    super();
    this.user = {
            name: 'John',
            // You can add more user details here
          };
      this.userItems = this.#getUserItems();
      this.loadCSS("profile");
    }
  
    render() {
      this.#container = document.createElement('div');
      this.#container.className = 'explore-page';
      
      this.#container.appendChild(this.#createTitle());

      this.#container.appendChild(this.#createUserInfoSection());

      this.#container.appendChild(this.#createButtonsSection());

      this.#container.appendChild(this.#createItemsGrid());

      return this.#container;
    }
  
    #createTitle() {
      const title = document.createElement('h1');
      title.className = 'explore-title';
      title.textContent = 'Profile Page!';
      return title;
    }
    #createUserInfoSection() {
      this.#userInfoSection = document.createElement('div');
      this.#userInfoSection.className = 'user-info-section';

      const userName = document.createElement('h1');
      userName.className = 'user-name';
      userName.textContent = this.user.name;

      // Additional user info can be added here

      this.#userInfoSection.appendChild(userName);
      return this.#userInfoSection;
  }

  #createButtonsSection() {
    const buttonsSection = document.createElement('div');
    buttonsSection.className = 'buttons-section';

   // Edit Profile Button
    this.#editProfileButton = document.createElement('button');
    this.#editProfileButton.className = 'edit-profile-button';
    this.#editProfileButton.textContent = 'Edit Profile';
    this.#editProfileButton.addEventListener('click', () => this.#handleEditProfile());

  // Add New Item Button
    this.#addNewItemButton = document.createElement('button');
    this.#addNewItemButton.className = 'add-new-item-button';
    this.#addNewItemButton.textContent = 'Add New Item';
    this.#addNewItemButton.addEventListener('click', () => this.#handleAddNewItem());

    buttonsSection.append(this.#editProfileButton);
    buttonsSection.append(this.#addNewItemButton);
    return buttonsSection;
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
    #createItemsGrid() {
      this.#itemsGrid = document.createElement('div');
      this.#itemsGrid.className = 'items-grid';

      // Display user's items
      this.userItems.forEach(item => {
        const itemCard = this.#createItemCard(item);
        this.#itemsGrid.appendChild(itemCard);
      });

      return this.#itemsGrid;
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


    #handleEditProfile() {
    // Implement edit profile functionality
      alert('Edit Profile button clicked');
    }
    #handleAddNewItem() {
    // Implement add new item functionality
      alert('Add New Item button clicked');
    }
}