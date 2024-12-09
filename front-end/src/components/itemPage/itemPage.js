import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class ItemPage extends BaseComponent {
    container = null;
    constructor(itemData) {
        super();
        this.itemData = itemData;
        this.loadCSS("itemPage");
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'item-page';

        const title = document.createElement('h1');
        title.textContent = this.itemData.itemName;
        this.container.appendChild(title);

        // Main image display
        const mainImage = document.createElement('img');
        mainImage.className = 'main-image';
        mainImage.src = this.itemData.images[0];
        this.container.appendChild(mainImage);

        // Images container
        const imagesContainer = document.createElement('div');
        imagesContainer.className = 'images-container';
        this.itemData.images.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.addEventListener('click', () => {
                mainImage.src = url;
            });
            imagesContainer.appendChild(img);
        });
        this.container.appendChild(imagesContainer);

        // Content container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'content-container';

        const sellerProfileContainer = document.createElement('div');
        sellerProfileContainer.className = 'seller-profile-container';
        const sellerName = document.createElement('p');
        sellerName.textContent = `Seller: ${this.itemData.sellerName}`;
        sellerProfileContainer.appendChild(sellerName);
        const sellerProfileButton = document.createElement('button');
        sellerProfileButton.className = 'seller-profile-button';
        sellerProfileButton.textContent = 'View Seller Profile';
        sellerProfileButton.addEventListener('click', () => {
            // Handle seller profile button click
            alert('Seller profile button clicked');
        });
        sellerProfileContainer.appendChild(sellerProfileButton);
        contentContainer.appendChild(sellerProfileContainer);


        // Description box
        const descriptionBox = document.createElement('div');
        descriptionBox.className = 'description-box';
        const description = document.createElement('p');
        description.textContent = this.itemData.description;
        descriptionBox.appendChild(description);
        contentContainer.appendChild(descriptionBox);

        // Details box
        const detailsBox = document.createElement('div');
        detailsBox.className = 'details-box';

        const category = document.createElement('p');
        category.textContent = `Category: ${this.itemData.category}`;
        detailsBox.appendChild(category);

        const condition = document.createElement('p');
        condition.textContent = `Condition: ${this.itemData.condition}`;
        detailsBox.appendChild(condition);
        const price = document.createElement('p');
        price.textContent = `Price: $${this.itemData.price}`;
        detailsBox.appendChild(price);
        const location = document.createElement('p');
        location.textContent = `Location: ${this.itemData.itemLocation}`;
        detailsBox.appendChild(location);
        const postedAt = document.createElement('p');
        postedAt.textContent = `Posted at: ${this.itemData.postedAt}`;
        detailsBox.appendChild(postedAt);
        const amountAvailable = document.createElement('p');
        amountAvailable.textContent = `Amount Available: ${this.itemData.amountAvailable}`;
        detailsBox.appendChild(amountAvailable);
        contentContainer.appendChild(detailsBox);

        this.container.appendChild(contentContainer);
        return this.container;


    }
}