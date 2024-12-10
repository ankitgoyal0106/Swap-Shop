import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class CreateItemPage extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.#container = document.createElement('div');
        this.#container.style.display = "block";
        this.#container.classList.add("create-item-page");
    }

    render() {
        this.#container = document.createElement('div');
        this.#container.className = 'create-item-page';
          
        const mainContent = document.createElement('div');
        mainContent.className = 'main-content';
  
        // Append each part to the main container
        this.#container.appendChild(this.#createTitle());
        this.#container.appendChild(this.#createForm());
        this.#container.appendChild(mainContent);
    
        return this.#container;
    }

    #createTitle() {
        const title = document.createElement('h1');
        title.className = 'create-item-title';
        title.textContent = 'Create New Item';
    
        // Apply styles directly in JavaScript
        title.style.backgroundColor = '#624E88'; // Purple background
        title.style.color = '#ffffff'; // White text
        title.style.padding = '20px'; // Padding around the text
        title.style.textAlign = 'center'; // Center the text
        title.style.width = '100%'; // Full width
        title.style.fontFamily = 'Verdana, sans-serif'; // Font family
    
        return title;
    }

    #createForm() {
        const form = document.createElement("form");
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        form.style.padding = '20px';
        form.style.gap = '20px';
        form.style.width = '100%';
        form.style.maxWidth = '600px'; // Center form and limit width
        form.style.boxSizing = 'border-box';
        form.style.margin = '0 auto'; // Center the form horizontally
        form.style.fontFamily = 'Verdana, sans-serif'; // Match font with item grid
        form.style.color = 'black'; // Set text color to black
    
        // Listing ID
        const listingIDLabel = document.createElement("label");
        listingIDLabel.textContent = "Listing ID:";
        const listingIDInput = document.createElement("input");
        listingIDInput.type = "text";
        listingIDInput.id = "listing-id";
        listingIDInput.required = true;
        listingIDInput.value = this.generateUniqueId(); // Set the unique ID
        form.appendChild(listingIDLabel);
        form.appendChild(listingIDInput);
    
        // Item Name
        const itemNameLabel = document.createElement("label");
        itemNameLabel.textContent = "Item Name:";
        const itemNameInput = document.createElement("input");
        itemNameInput.type = "text";
        itemNameInput.id = "item-name";
        itemNameInput.required = true;
        form.appendChild(itemNameLabel);
        form.appendChild(itemNameInput);
    
        // Item Description
        const descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Description:";
        const descriptionInput = document.createElement("textarea");
        descriptionInput.id = "item-description";
        descriptionInput.required = true;
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
    
        // Amount Available
        const amountLabel = document.createElement("label");
        amountLabel.textContent = "Amount Available:";
        const amountInput = document.createElement("input");
        amountInput.type = "number";
        amountInput.id = "amount-available";
        amountInput.required = true;
        form.appendChild(amountLabel);
        form.appendChild(amountInput);
    
        // Category
        const categoryLabel = document.createElement("label");
        categoryLabel.textContent = "Category:";
        const categorySelect = document.createElement("select");
        categorySelect.id = "item-category";
        categorySelect.required = true;
        
        const defaultCategoryOption = document.createElement("option");
        defaultCategoryOption.value = "";
        defaultCategoryOption.textContent = "Select Category";
        categorySelect.appendChild(defaultCategoryOption);
    
        const categories = ["electronics", "clothing", "books", "furniture", "iclicker"];
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categorySelect.appendChild(option);
        });
    
        form.appendChild(categoryLabel);
        form.appendChild(categorySelect);
        
        // Image Upload
        const imageLabel = document.createElement("label");
        imageLabel.textContent = "Upload Image:";
        const imageInput = document.createElement("input");
        imageInput.type = "file";
        imageInput.id = "item-image";
        imageInput.accept = "image/*";
        imageInput.required = true;
        imageInput.multiple = true; // Allow multiple image uploads
        form.appendChild(imageLabel);
        form.appendChild(imageInput);
    
        imageInput.addEventListener("change", () => {
            if (imageInput.files.length > 0) {
                customFileLabel.textContent = Array.from(imageInput.files).map(file => file.name).join(", ");
            } else {
                customFileLabel.textContent = "No file chosen";
            }
        });
    
        // Condition
        const conditionLabel = document.createElement("label");
        conditionLabel.textContent = "Condition:";
        const conditionSelect = document.createElement("select");
        conditionSelect.id = "item-condition";
        conditionSelect.required = true;
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Condition"; 
        const newOption = document.createElement("option");
        newOption.value = "new";
        newOption.textContent = "New";
        const usedOption = document.createElement("option");
        usedOption.value = "used";
        usedOption.textContent = "Used";
        conditionSelect.appendChild(defaultOption);
        conditionSelect.appendChild(newOption);
        conditionSelect.appendChild(usedOption);
        form.appendChild(conditionLabel);
        form.appendChild(conditionSelect);
    
        // Price
        const priceLabel = document.createElement("label");
        priceLabel.textContent = "Price:";
        const priceInput = document.createElement("input");
        priceInput.type = "number";
        priceInput.id = "item-price";
        priceInput.required = true;
        form.appendChild(priceLabel);
        form.appendChild(priceInput);
    
        // Seller Email
        const sellerEmailLabel = document.createElement("label");
        sellerEmailLabel.textContent = "Seller Email:";
        const sellerEmailInput = document.createElement("input");
        sellerEmailInput.type = "email";
        sellerEmailInput.id = "seller-email";
        sellerEmailInput.required = true;
        form.appendChild(sellerEmailLabel);
        form.appendChild(sellerEmailInput);
    
        // Posted At
        const postedAtLabel = document.createElement("label");
        postedAtLabel.textContent = "Posted At (UTC):";
        const postedAtInput = document.createElement("input");
        postedAtInput.type = "datetime-local";
        postedAtInput.id = "posted-at";
        postedAtInput.required = true;
        postedAtInput.value = new Date().toISOString().slice(0, 16); // Set current date and time
        form.appendChild(postedAtLabel);
        form.appendChild(postedAtInput);
    
        // Updated At
        const updatedAtLabel = document.createElement("label");
        updatedAtLabel.textContent = "Updated At:";
        const updatedAtInput = document.createElement("input");
        updatedAtInput.type = "datetime-local";
        updatedAtInput.id = "updated-at";
        updatedAtInput.required = true;
        updatedAtInput.value = new Date().toISOString().slice(0, 16); // Set current date and time
        form.appendChild(updatedAtLabel);
        form.appendChild(updatedAtInput);
    
        // Item Location
        const itemLocationLabel = document.createElement("label");
        itemLocationLabel.textContent = "Item Location:";
        const itemLocationInput = document.createElement("input");
        itemLocationInput.type = "text";
        itemLocationInput.id = "item-location";
        itemLocationInput.required = true;
        form.appendChild(itemLocationLabel);
        form.appendChild(itemLocationInput);
    
        // Geolocation Button
        const geoButton = document.createElement("button");
        geoButton.type = "button";
        geoButton.textContent = "Use Current Location";
        geoButton.addEventListener("click", this.geoFindMe.bind(this));
        form.appendChild(geoButton);
    
        // Submit Button
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Create Item";
        form.appendChild(submitButton);
    
        // Message Element
        const messageElement = document.createElement("p");
        messageElement.id = "form-message";
        form.appendChild(messageElement);
    
        form.addEventListener('submit', this.handleSubmit.bind(this));
    
        return form;
    }

    geoFindMe() {
        const itemLocationInput = document.getElementById('item-location');
        const status = document.createElement('p');
        itemLocationInput.parentNode.insertBefore(status, itemLocationInput.nextSibling);
    
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            itemLocationInput.value = `Latitude: ${latitude}, Longitude: ${longitude}`;
            status.textContent = "";
            status.remove(); // Remove the status element
        }
    
        function error() {
            status.textContent = "Unable to retrieve your location";
        }
    
        if (!navigator.geolocation) {
            status.textContent = "Geolocation is not supported by your browser";
        } else {
            status.textContent = "Locating…";
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    generateUniqueId() {
        return 'listing-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }

    handleSubmit(event) {
        event.preventDefault();

        const listingID = document.getElementById('listing-id').value;
        const postedAt = document.getElementById('posted-at').value;
        const images = document.getElementById('item-image').files;
        const updatedAt = document.getElementById('updated-at').value;
        const itemName = document.getElementById('item-name').value;
        const itemDescription = document.getElementById('item-description').value;
        const category = document.getElementById('item-category').value;
        const condition = document.getElementById('item-condition').value;
        const price = document.getElementById('item-price').value;
        const amountAvailable = document.getElementById('amount-available').value;
        const itemLocation = document.getElementById('item-location').value;
        const sellerEmail = document.getElementById('seller-email').value;

        const imageUrls = Array.from(images).map(file => URL.createObjectURL(file));

        const listingData = {
            listingID,
            postedAt,
            images: imageUrls, // Array of strings (URLs)
            updatedAt,
            itemName,
            itemDescription,
            category,
            condition,
            price,
            amountAvailable,
            itemLocation,
            sellerEmail
        };

        // Publish new item
        this.#publishNewItem(listingData);

        // Switch to item page
        const hub = EventHub.getInstance();
        hub.publish('SwitchToItemPage', listingData);
    }

    #publishNewItem(data){
        const hub = EventHub.getInstance();
        hub.publish(Events.NewItem, data);
        hub.publish(Events.StoreItem, data);
        hub.publish(Events.ListItem);
    }
}