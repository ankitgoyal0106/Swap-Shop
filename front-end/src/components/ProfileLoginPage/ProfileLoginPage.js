import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { Registration } from "../registrationPage/registrationPage.js";

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

                            <div class="form-options">
                                <label><input type="checkbox" name="rememberMe"> Remember me</label>
                                <a href="#" class="forgot-password">Forgot your password?</a>
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
            const registrationPage = new Registration();
            document.getElementById('app').innerHTML = '';
            document.getElementById('app').appendChild(registrationPage.render());
        });

        /*
        document.querySelector('.password-toggle').addEventListener('click', function () {
            const passwordField = document.getElementById('password');
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
            } else {
                passwordField.type = 'password';
            }
        });
        */

        this.#container.appendChild(login);
    }
}