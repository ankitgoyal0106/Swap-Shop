import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class profilePage extends BaseComponent {
  #container = null;
  #userInfoSection = null;
  #itemsGrid = null;
  #editProfileButton = null;
  #addNewItemButton = null;
  #loginRegisterButton = null;

  constructor() {
    super();
    // this.user = user; // Assuming 'user' is an object containing user details
    // this.userItems = this.#getUserItems(); // Fetch items listed by the user
    // this.loadCSS("profile"); // Load the CSS specific to the profile page
  }

  render() {
    this.#container = document.createElement('div');
    this.#container.className = 'profile-page';

    // // Create and append sections
    this.#container.appendChild(this.#createUserInfoSection());
    this.#container.appendChild(this.#createButtonsSection());
    this.#container.appendChild(this.#createItemsGrid());

    return this.#container;
  }

  #createUserInfoSection() {
    this.#userInfoSection = document.createElement('div');
    this.#userInfoSection.className = 'user-info-section';

    const userName = document.createElement('h1');
    userName.className = 'user-name';
    // userName.textContent = this.user.name;

    // Additional user info can be added here

    this.#userInfoSection.appendChild(userName);
    return this.#userInfoSection;
  }

  #createItemsGrid() {
    this.#itemsGrid = document.createElement('div');
    this.#itemsGrid.className = 'items-grid';

    // Display user's items
    // this.userItems.forEach(item => {
    //   const itemCard = this.#createItemCard(item);
    //   this.#itemsGrid.appendChild(itemCard);
    // });

    return this.#itemsGrid;
  }

  #createItemCard(item) {
    const itemCard = document.createElement('div');
    itemCard.className = 'item-card';

    const img = document.createElement('img');
    img.src = item.src; // Default image if none provided
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


  #createButtonsSection() {
    const buttonsSection = document.createElement('div');
    buttonsSection.className = 'buttons-section';

    // Login/Register Button
    this.#loginRegisterButton = document.createElement('button');
    this.#loginRegisterButton.className = 'login-register-button';
    this.#loginRegisterButton.textContent = 'Login/Register';
    this.#loginRegisterButton.addEventListener('click', () => this.#handleLoginRegister());

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

    buttonsSection.append(this.#loginRegisterButton, this.#editProfileButton, this.#addNewItemButton);
    return buttonsSection;
  } 
 
  #handleLoginRegister() {
    // Implement navigation to the login page
    window.location.href = ''; // Adjust the URL as needed
  }
  #handleEditProfile() {
    // Implement edit profile functionality
    alert('Edit Profile button clicked');
  }

  #handleAddNewItem() {
    // Implement add new item functionality
    alert('Add New Item button clicked');
  }

  #getUserItems() {
    // Fetch items listed by the user
    // Replace this with actual data fetching logic
    return [
      { src: '', title: 'User Item 1', description: 'Description for user item 1' },
      { src: '', title: 'User Item 2', description: 'Description for user item 2' },
      { src: '', title: 'User Item 3', description: 'Description for user item 3' },
      // Add more items as needed
    ];
  }
}
