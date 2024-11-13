import { BaseComponent } from '../BaseComponent/BaseComponent.js';

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
            <h1>Registration</h1>
            <form id="registration-form" class="registration-form">
            </form>`;

        const form = this.#container.querySelector('#registration-form');
        const fields = [
            { label: 'First Name:', type: 'text', name: 'first-name', required: true },
            { label: 'Last Name:', type: 'text', name: 'last-name', required: true },
            { label: 'Email:', type: 'email', name: 'email', required: true },
            { label: 'Phone Number:', type: 'tel', name: 'phone-number', required: true },
            { label: 'Password:', type: 'password', name: 'password', required: true },
            { label: 'Confirm Password:', type: 'password', name: 'confirm-password', required: true },
            { label: 'College:', type: 'text', name: 'college', required: true },
            { label: 'Role:', type: 'text', name: 'role', required: true }
        ];
    
        fields.forEach(field => {
            const { label, input } = this.#createInputField(field.label, field.type, field.name, field.required);
            form.appendChild(label);
            form.appendChild(input);
        });
    
        form.innerHTML += `<input id="submit-button" class="registration-button" type="submit" value="Register">`;
    
        form.addEventListener('submit', this.#onSubmit);
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

    #onSubmit(event) {
        event.preventDefault();
        console.log("Form submitted");
    }
}
