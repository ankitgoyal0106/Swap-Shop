import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class EditProfilePage extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('editProfilePage');
    }

    render() {
        this.#container = document.createElement('div');
        this.#container.id = 'editProfile-container';
        this.#container.classList.add('editProfile-container');
        this.#buildProfileEditor();

        return this.#container;
    }

    #buildProfileEditor() {
        const editProfileForm = document.createElement('form');
        editProfileForm.id = 'editProfileForm';
        editProfileForm.classList.add('editProfileForm');

        // Adding each section of the form
        editProfileForm.appendChild(this.#createProfileImageInput());
        editProfileForm.appendChild(this.#createTextInput('firstName', 'First Name', 'text'));
        editProfileForm.appendChild(this.#createTextInput('lastName', 'Last Name', 'text'));
        editProfileForm.appendChild(this.#createTextInput('emailInput', 'Email', 'email'));
        editProfileForm.appendChild(this.#createTextInput('phoneInput', 'Phone Number', 'tel'));
        editProfileForm.appendChild(this.#createRoleInput());
        editProfileForm.appendChild(this.#createSubmitButton());

        this.#container.appendChild(editProfileForm);
    }

    // Private method to create profile image input
    #createProfileImageInput() {
        const profileImage = document.createElement('div');
        profileImage.id = 'profileImage';
        profileImage.classList.add('profileImage');
        profileImage.innerHTML = `
            <img src="https://via.placeholder.com/150" alt="profile image" id="profileImageDisplay">
            <input type="file" value="Upload Image" id="profileImageInput" name="profileImageInput" accept="image/*">
        `;
        return profileImage;
    }

    // Private method to create text inputs (e.g., name, email, phone, college)
    #createTextInput(id, placeholder, type = 'text') {
        const input = document.createElement('input');
        input.id = id;
        input.classList.add(id);
        input.type = type;
        input.placeholder = placeholder;
        return input;
    }

    // Private method to create a role selection dropdown
    #createRoleInput() {
        const roleInput = document.createElement('select');
        roleInput.id = 'roleInput';
        roleInput.classList.add('roleInput');
        roleInput.innerHTML = `
            <option value="" disabled selected>Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="both">Both</option>
        `;
        return roleInput;
    }

    // Private method to create submit button
    #createSubmitButton() {
        const submitButton = document.createElement('button');
        submitButton.id = 'submitButton';
        submitButton.classList.add('submitButton');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        return submitButton;
    }
}
