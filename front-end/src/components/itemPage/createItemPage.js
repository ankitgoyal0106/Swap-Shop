import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class CreateItemPage extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.#container = document.createElement('div');
        this.#container.style.display = "block";
        this.#container.classList.add("create-item-page");
    }

    render() {
        const form = document.createElement("form");

        // Image URL
        const imageLabel = document.createElement("label");
        imageLabel.textContent = "Image URL:";
        const imageInput = document.createElement("input");
        imageInput.type = "text";
        imageInput.id = "item-image";
        imageInput.required = true;
        form.appendChild(imageLabel);
        form.appendChild(imageInput);

        // Description
        const descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Description:";
        const descriptionInput = document.createElement("textarea");
        descriptionInput.id = "item-description";
        descriptionInput.required = true;
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);

        // Price
        const priceLabel = document.createElement("label");
        priceLabel.textContent = "Price:";
        const priceInput = document.createElement("input");
        priceInput.type = "number";
        priceInput.id = "item-price";
        priceInput.required = true;
        form.appendChild(priceLabel);
        form.appendChild(priceInput);

        // Submit Button
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Create Item";
        form.appendChild(submitButton);

        form.addEventListener('submit', this.handleSubmit);

        this.#container.appendChild(form);
        return this.#container;
    }

    handleSubmit(event) {
        event.preventDefault();
        const image = document.getElementById('item-image').value;
        const description = document.getElementById('item-description').value;
        const price = document.getElementById('item-price').value;

        console.log('Item Created:', { image, description, price });
        // Add logic to handle item creation, e.g., sending data to a server
    }
}