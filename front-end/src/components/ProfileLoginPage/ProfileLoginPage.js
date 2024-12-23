import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { Registration } from "../registrationPage/registrationPage.js";
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { saveEmailToLocalStorage } from '../../services/LocalStorage.js';

export class ProfileLoginPage extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS("ProfileLoginPage");
    }

    render() {
        this.#container = document.createElement('div');
        this.#addLoginFeature();

        return this.#container;
    }

    #addLoginFeature() {
        const login = document.createElement('div');
        login.innerHTML = `
            <div class="container">
                <div class="login-form-container">
                    <div class="login-form-content">
                        <h2>Welcome back!</h2>
                        <p>Enter to browse our selections.</p>

                        <form id="loginForm">
                            <label for="email">Email *</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email address" required><br>

                            <label for="password">Password *</label>
                            <div class="password-container">
                                <input type="password" id="password" name="password" placeholder="Enter password" required>
                            </div>

                            <!-- <button type="submit" class="btn-primary">Log In</button> -->
                            <input type="submit" value="Log In" class="btn-primary" />
                        </form>

                        <p class="register-link">Don't have an account? <a href="#" id="registerBtn">Register here </a></p>

                    </div>
                </div>
            </div>
        `

        login.querySelector('#registerBtn').addEventListener('click', function () { 
            const hub = EventHub.getInstance();
            hub.publish('SwitchToRegisterPage', null);
        });

        login.querySelector('#loginForm').addEventListener('submit', (event) => {
            event.preventDefault();

            const credentials = {
                email: event.target.email.value,
                password: event.target.password.value
            };

            const hub = EventHub.getInstance();
            hub.publish(Events.Login, credentials)
            hub.subscribe(Events.LoginSuccess, (profileData) => {
                saveEmailToLocalStorage(profileData.user.email);
                hub.publish(Events.SwitchToHomePage, null);
            });
        });

        this.#container.appendChild(login);
    }
}