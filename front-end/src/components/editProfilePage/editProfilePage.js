import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { getEmailFromLocalStorage } from '../../services/LocalStorage.js';
//import { bcryptjs } from 'bcryptjs';

export class EditProfilePage extends BaseComponent {
    #container = null;
    #hub = null;
    #profilePicture = null;

    constructor() {
        super();
        this.loadCSS('editProfilePage');
        this.#hub = EventHub.getInstance();
    }

    //Need to add logic to get user data from the backend to populate the form
    async render() {
        this.#container = document.createElement('div');
        this.#container.id = 'editProfile-container';
        this.#container.classList.add('editProfile-container');
        this.#buildProfileEditor();
        await this.#autoFillProfileData();

        return this.#container;
    }

    #buildProfileEditor() {
        const editProfileForm = document.createElement('form');
        editProfileForm.id = 'editProfileForm';
        editProfileForm.classList.add('editProfileForm');

        // Adding each section of the form
        editProfileForm.appendChild(this.#createProfileImageInput());
        editProfileForm.appendChild(this.#createTextInput('editFirstName', 'First Name', 'text'));
        editProfileForm.appendChild(this.#createTextInput('editLastName', 'Last Name', 'text'));
        editProfileForm.appendChild(this.#createTextInput('editPhoneInput', 'Phone Number', 'tel'));
        editProfileForm.appendChild(this.#createTextInput('editPassword', 'New Password', 'password'));
        editProfileForm.appendChild(this.#createTextInput('confirmEditPassword', 'Confirm New Password', 'password'));
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

        // Add event listener to display the selected image
        const profileImageInput = profileImage.querySelector('#profileImageInput');
        const profileImageDisplay = profileImage.querySelector('#profileImageDisplay');

        // TODO: Change how the image is stored in the database
        profileImageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImageDisplay.src = e.target.result;
                };
                reader.readAsDataURL(file);
                this.#profilePicture = file;
            }
        });

        return profileImage;
    }

    // Private method to create text inputs (e.g., name, email, phone, college)
    #createTextInput(id, placeholder, type = 'text') {
        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = placeholder;
        label.classList.add('editProfileLabel');

        const input = document.createElement('input');
        input.id = id;
        input.classList.add(id);
        input.type = type;
        input.placeholder = placeholder;
        return input;
    }

    // Private method to create submit button
    #createSubmitButton() {
        const submitButton = document.createElement('button');
        submitButton.id = 'submitButton';
        submitButton.classList.add('submitButton');
        submitButton.type = 'submit';
        submitButton.textContent = 'Update';
        submitButton.addEventListener('click', this.#handleFormSubmission.bind(this));
        return submitButton;
    }

    // Private method to handle form submission
    async #handleFormSubmission(event) {
        event.preventDefault();
    
        // Query elements within the container
        const editFirstName = this.#container.querySelector('#editFirstName').value;
        const editLastName = this.#container.querySelector('#editLastName').value;
        const phone = this.#container.querySelector('#editPhoneInput').value;
        const newPassword = this.#container.querySelector('#editPassword').value;
        const confirmEditPassword = this.#container.querySelector('#confirmEditPassword').value;
    
        // Validate if passwords match
        if (newPassword !== confirmEditPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Validate phone number format
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid phone number in the format XXX-XXX-XXXX.");
            return;
        }

        // Hash the new password
        const hash = await bcryptjs.hash(newPassword, 10);

        // Prepare updated profile data
        const updatedProfileData = {
            profilePicture: this.#profilePicture,
            name: `${editFirstName} ${editLastName}`,
            email: getEmail(), // Gets email from local storage
            phone: phone,
            password: hash
        };

        // Send the profile data to the server
        const response = await fetch("/edit-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProfileData),
        });

        // Handle a failed request
        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            console.error(message);
            alert(message);
            return;
        }

        // Handle a successful request
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
        alert(data.message);
    
        // Publish the updated profile data
        this.#hub.publish(Events.ProfileEdited, updatedProfileData);
        alert('Profile updated successfully');
        console.log("Profile Data", updatedProfileData);
    }
    
    async #autoFillProfileData() {
        // Get the profile data from the server
        const response = await fetch("/profile", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getEmailFromLocalStorage()),
        });

        // Handle a failed request
        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            console.error(message);
            alert(message);
            return;
        }

        // Handle a successful request
        const userData = await response.json();
        this.#container.querySelector('#editFirstName').value = userData.name.split(' ')[0];
        this.#container.querySelector('#editLastName').value = userData.name.split(' ')[1];
        this.#container.querySelector('#editPhoneInput').value = userData.phone;
    }
}
