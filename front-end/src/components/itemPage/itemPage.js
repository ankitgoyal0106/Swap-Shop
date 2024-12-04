import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class ItemPage extends BaseComponent {
    container = null;
    constructor(itemData) {
        super();
        this.itemData = itemData;
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'item-page';

        const title = document.createElement('h1');
        title.textContent = this.itemData.itemName;
        this.container.appendChild(title);

        const description = document.createElement('p');
        description.textContent = this.itemData.description;
        this.container.appendChild(description);

        const category = document.createElement('p');
        category.textContent = `Category: ${this.itemData.category}`;
        this.container.appendChild(category);

        const condition = document.createElement('p');
        condition.textContent = `Condition: ${this.itemData.condition}`;
        this.container.appendChild(condition);

        const price = document.createElement('p');
        price.textContent = `Price: $${this.itemData.price}`;
        this.container.appendChild(price);

        const location = document.createElement('p');
        location.textContent = `Location: ${this.itemData.itemLocation}`;
        this.container.appendChild(location);

        const imagesContainer = document.createElement('div');
        this.itemData.images.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.style.width = '100px';
            img.style.height = '100px';
            imagesContainer.appendChild(img);
        });
        this.container.appendChild(imagesContainer);

        return this.container;
    }
}