import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';

export class Registration extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('registrationPage');
    }

    render() {
        this.#container = document.createElement('div');
        this.#container.id = 'registration-container';
        this.#container.classList.add('registration-container');
        this.#buildRegistrationForm();

        return this.#container;
    }

    #buildRegistrationForm() {
        this.#container.innerHTML = `
            <h1>Register for SwapShop!</h1>
            <form id="registration-form" class="registration-form">
            </form>`;

        const form = this.#container.querySelector('#registration-form');
        const fields = [
            { label: 'First Name:', type: 'text', name: 'first-name', required: true },
            { label: 'Last Name:', type: 'text', name: 'last-name', required: true },
            { label: 'Email:', type: 'email', name: 'email', required: true },
            { label: 'Phone Number:', type: 'tel', name: 'phone-number', required: true },
            { label: 'Password:', type: 'password', name: 'password', required: true },
            { label: 'Confirm Password:', type: 'password', name: 'confirm-password', required: true }
        ];

        fields.forEach(field => {
            const { label, input } = this.#createInputField(field.label, field.type, field.name, field.required);
            form.appendChild(label);
            form.appendChild(input);
        });

        // Add dropdown for College
        const collegeOptions = ["University of Massachusetts Amherst", "Amherst College", "Hampshire College", "Mount Holyoke College", "Smith College"];
        const { label: collegeLabel, input: collegeSelect } = this.#createSelectField('College:', 'college', collegeOptions);
        form.appendChild(collegeLabel);
        form.appendChild(collegeSelect);

        // Add the submit button
        form.innerHTML += `<input id="submit-button" class="registration-button" type="submit" value="Register">`;

        form.addEventListener('submit', this.#onSubmit.bind(this));
    }

    #createInputField(labelText, inputType, inputName, isRequired) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = inputName;
        const input = document.createElement('input');
        input.type = inputType;
        input.name = inputName;
        input.classList.add('registration-input');
        if (isRequired) {
            input.required = true;
        }
        return { label, input };
    }

    #createSelectField(labelText, selectName, options) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = selectName;
        const select = document.createElement('select');
        select.name = selectName;
        select.classList.add('registration-input');
        
        options.forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            select.appendChild(option);
        });

        return { label, input: select };
    }

    async #onSubmit(event) {
        event.preventDefault();
        const form = document.querySelector('#registration-form');
        const formData = new FormData(form);
        const userData = {};

        for (const [key, value] of formData.entries()) {
            userData[key] = value;
        }

        // Validate if passwords match
        if (userData.password !== userData['confirm-password']) {
            alert("Passwords do not match!");
            return;
        }

        // Validate phone number format
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        if (!phonePattern.test(userData['phone-number'])) {
            alert("Please enter a valid phone number in the format XXX-XXX-XXXX.");
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(userData.email)) {
            alert("Please enter a valid email address.");
            return;
        }
        // Further processing of the form data, such as sending it to a server, can be done here
        const timestamp = new Date();

        // Create the user profile as an object
        const profileData = {
            name: `${userData['first-name']} ${userData['last-name']}`,
            email: userData.email,
            phoneNo: userData['phone-number'],
            college: userData.college,
            password: userData.password,
            profilePicture: null,
            createdAt: timestamp,
            updatedAt: timestamp,
            achievementCounts: {
                "listed": 0,
                "sold": 0,
                "viewed": 0,
                "easterEgg": false
            },
            savedListings: "[]",
            recentlyViewed: "[]",
            conversationList: "[]"
        };

        // Publish the profile data to the event hub
        const hub = EventHub.getInstance();
        hub.publish(Events.RegisterProfile, profileData);
        hub.subscribe(Events.Registered, (profileData) => {
            alert("Registration successful! Please log in to continue.");
            hub.publish(Events.SwitchToLoginPage, null);
        });
    }
}