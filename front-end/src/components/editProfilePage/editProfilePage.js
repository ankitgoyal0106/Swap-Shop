import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';

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
    render() {
        this.#container = document.createElement('div');
        this.#container.id = 'editProfile-container';
        this.#container.classList.add('editProfile-container');
        this.#buildProfileEditor();
        //this.#autoFillProfileData();

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
        editProfileForm.appendChild(this.#createTextInput('editEmailInput', 'Email', 'email'));
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
    #handleFormSubmission(event) {
        event.preventDefault();
    
        // Query elements within the container
        const editFirstName = this.#container.querySelector('#editFirstName').value;
        const editLastName = this.#container.querySelector('#editLastName').value;
        const email = this.#container.querySelector('#editEmailInput').value;
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

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        // Prepare updated profile data
        const updatedProfileData = {
            profilePicture: this.#profilePicture,
            name: `${editFirstName} ${editLastName}`,
            email: email,
            phone: phone,
            password: btoa(newPassword), // Base64 encoding (use secure methods in production)
        };
    
        // Publish the updated profile data
        this.#hub.publish(Events.ProfileEdited, updatedProfileData);
        alert('Profile updated successfully');
        console.log("Profile Data", updatedProfileData);
    }
    // TODO: Implement logic to autofill profile data
    /*
    #autoFillProfileData() {
        
    }*/
}
