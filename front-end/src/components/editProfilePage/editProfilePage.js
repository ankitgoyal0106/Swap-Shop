import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { getEmailFromLocalStorage } from '../../services/LocalStorage.js';
import bcryptjs from 'https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm';

export class EditProfilePage extends BaseComponent {
    #container = null;
    #hub = null;
    //#profilePicture = null;

    constructor() {
        super();
        this.loadCSS('editProfilePage');
        this.#hub = EventHub.getInstance();
    }

    render() {
        this.#container = document.createElement('div');
        this.#container.id = 'editProfile-container';
        this.#container.classList.add('editProfile-container');
        this.#buildProfileEditor();
        this.#addEventListeners();

        return this.#container;
    }

    #buildProfileEditor() {
        const editProfileForm = document.createElement('form');
        editProfileForm.id = 'editProfileForm';
        editProfileForm.classList.add('editProfileForm');

        // Adding each section of the form
        //editProfileForm.appendChild(this.#createProfileImageInput());
        this.#createTextInput('editFirstName', 'First Name', 'text').forEach(element => editProfileForm.appendChild(element));
        this.#createTextInput('editLastName', 'Last Name', 'text').forEach(element => editProfileForm.appendChild(element));
        this.#createTextInput('editPhoneInput', 'Phone Number', 'tel').forEach(element => editProfileForm.appendChild(element));
        this.#createTextInput('editPassword', 'New Password', 'password').forEach(element => editProfileForm.appendChild(element));
        this.#createTextInput('confirmEditPassword', 'Confirm New Password', 'password').forEach(element => editProfileForm.appendChild(element));
        editProfileForm.appendChild(this.#createSubmitButton());

        this.#container.appendChild(editProfileForm);
    }

    // Private method to create profile image input
    /*
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
                this.#profilePicture = URL.createObjectURL(file);
            }
        });

        return profileImage;
    }*/

    // Private method to create text inputs (e.g., name, email, phone, college)
    #createTextInput(id, placeholder, type = 'text') {
        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = placeholder + ':';
        label.classList.add('editProfileLabel');

        const input = document.createElement('input');
        input.id = id;
        input.classList.add(id);
        input.type = type;
        return [label, input];
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
            //profilePicture: this.#profilePicture,
            name: `${editFirstName} ${editLastName}`,
            email: getEmailFromLocalStorage(), // Gets email from local storage
            phoneNo: phone,
            password: hash,
            updatedAt: new Date()
        };

        // Publish the updated profile data
        this.#hub.publish(Events.ProfileEdited, updatedProfileData);
        alert('Profile updated');
        this.#container.querySelector('#editPassword').value = '';
        this.#container.querySelector('#confirmEditPassword').value = '';
    }

    #addEventListeners() {
        const hub = EventHub.getInstance();
        hub.subscribe(Events.ChangedViewToEdit, (profileData) => {
            this.#container.querySelector('#editFirstName').value = profileData.name.split(' ')[0];
            this.#container.querySelector('#editLastName').value = profileData.name.split(' ')[1];
            this.#container.querySelector('#editPhoneInput').value = profileData.phoneNo;
        });
    }
}
