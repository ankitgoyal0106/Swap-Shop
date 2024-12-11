import { explorePage } from "../explorePage/explorePage.js";
import { homeComponent } from "../homePage/homePage.js";
import { profilePage } from "../mainProfilePage/mainProfilePage.js";
import { ProfileLoginPage } from "../ProfileLoginPage/ProfileLoginPage.js";
import { Registration } from "../registrationPage/registrationPage.js";
import {CreateItemPage} from "../itemPage/createItemPage.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { ItemPage } from "../itemPage/itemPage.js";
import { getEmailFromLocalStorage } from "../../services/LocalStorage.js";
import { logout } from "../../utility/Logout.js";
import { ProfileRepoFactory } from "../../services/ProfileRepoFactory.js";
import { ItemRepoFactory } from "../../services/ItemRepoFactory.js";
import { ChatRepoFactory } from "../../services/ChatRepoFactory.js";

export class AppController {
    #container = null;
    #currentView = 'home';
    #homePage = null;
    #explorePage = null;
    #profilePage = null;
    #loginPage = null;
    #registerPage = null;
    #createItemPage = null;
    #itemPage = null;
    #hub = null;

    constructor(){
        const imagePaths = [
            'images/jewelry.PNG', 
            'images/painting.PNG', 
            'images/farmers-market.jpeg',
            'images/shop.jpeg',
            'images/shop2.jpeg',
            'images/stickers.PNG'
          ]; 
        this.#hub = EventHub.getInstance();
        this.#homePage = new homeComponent();
        this.#explorePage = new explorePage();
        this.#profilePage = new profilePage();
        this.#loginPage = new ProfileLoginPage();
        this.#registerPage = new Registration();
        this.#createItemPage = new CreateItemPage();
        this.#itemPage = new ItemPage({
            itemName: "Item",
            description: "This is an item.",
            category: "Electronics",
            condition: "New",
            price: "4.78",
            itemLocation: "Here",
            images: imagePaths
        });
        ProfileRepoFactory.get("remote"); //TODO: check if this can
        ItemRepoFactory.get();
        ChatRepoFactory.get();
    }

    render() {
        this.#createContainer();
        this.#setupContainerContent();
        this.#attachEventListeners();

        this.#homePage.render();
        this.#explorePage.render();
        this.#profilePage.render();
        this.#loginPage.render();
        this.#registerPage.render();
        this.#createItemPage.render();
        this.#itemPage.render();

        this.#renderCurrentView();

        return this.#container;
    }

    #createContainer(){
        this.#container = document.createElement('div');
        this.#container.classList.add('app-controller');
    }

    #setupContainerContent(){
        const navBar = document.querySelector('.navbar__menu');
        if (localStorage.getItem('email') !== null) {
            navBar.innerHTML = '';
            navBar.innerHTML = `
                <li><a href="#" id="homeBtn">Home</a></li>
                <li><a href="#" id="exploreBtn">Explore</a></li>
                <li><a href="#" id="profileBtn">Profile</a></li>
                <li><a href="#" id="logoutBtn">Logout</a></li>
            `;
        } else {
            navBar.innerHTML = '';
            navBar.innerHTML = `
                <li><a href="#" id="homeBtn">Home</a></li>
                <li><a href="#" id="loginBtn">Login</a></li>
            `;
        }
        this.#container.innerHTML = `
            <div id="viewContainer"></div>
            `
            ;
    }

    #attachEventListeners(){
        const homeBtn = document.getElementById('homeBtn');
        const exploreBtn = document.getElementById('exploreBtn');
        const profileBtn = document.getElementById('profileBtn');
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        homeBtn.addEventListener('click', () => {
            this.#toggleView('home');
        });

        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                this.#toggleView('explore');
            });
        }

        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                this.#toggleView('profile');
            });
        }

        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                this.#toggleView('login');
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.#hub.publish(Events.Logout, null);
                navBar.innerHTML = '';
                navBar.innerHTML = `
                    <li><a href="#" id="homeBtn">Home</a></li>
                    <li><a href="#" id="loginBtn">Login</a></li>
                `;
                logout();
            });
        }

        this.#hub.subscribe('SwitchToHomePage', () => {
            this.#currentView = 'home';
            this.#renderCurrentView();
        });

        this.#hub.subscribe('SwitchToExplorePage', () => {
            this.#currentView = 'explore';
            this.#renderCurrentView();
        });

        this.#hub.subscribe('SwitchToProfilePage', () => {
            this.#currentView = 'profile';
            this.#renderCurrentView();
        });

        this.#hub.subscribe('SwitchToLoginPage', () => {
            this.#currentView = 'login';
            this.#renderCurrentView();
        });

        this.#hub.subscribe('SwitchToRegisterPage', () => {
            this.#currentView = 'register';
            this.#renderCurrentView();
        });
        this.#hub.subscribe('SwitchToCreateItemPage', () => {
            this.#currentView = 'createItem';
            this.#renderCurrentView();
        });
        this.#hub.subscribe('SwitchToItemPage', () => {
            this.#currentView = 'item';
            this.#renderCurrentView();
        });
        const navBar = document.querySelector('.navbar__menu');
        this.#hub.subscribe(Events.LoginSuccess, () =>{
            navBar.innerHTML = '';
            navBar.innerHTML = `
                <li><a href="#" id="homeBtn">Home</a></li>
                <li><a href="#" id="exploreBtn">Explore</a></li>
                <li><a href="#" id="profileBtn">Profile</a></li>
                <li><a href="#" id="logoutBtn">Logout</a></li>
            `;
            this.#attachEventListeners();
        });
        this.#hub.subscribe(Events.LogoutSuccess, () => {
            navBar.innerHTML = '';
            navBar.innerHTML = `
                <li><a href="#" id="homeBtn">Home</a></li>
                <li><a href="#" id="loginBtn">Login</a></li>
            `;
            this.#attachEventListeners();
        });
    }

    #toggleView(view) {
        if(view === 'home'){
            this.#currentView = view;
            this.#hub.publish('SwitchToHomePage', null);
        }else if(view === 'explore'){
            this.#currentView = view;
            this.#hub.publish('SwitchToExplorePage', null);
        }else if(view === 'profile'){
            this.#currentView = view;
            this.#hub.publish('SwitchToProfilePage', null);
        }else if(view === 'login'){
            this.#currentView = view;
            this.#hub.publish('SwitchToLoginPage', null);
        }else if(view === 'register'){
            this.#currentView = view;
            this.#hub.publish('SwitchToRegisterPage', null);
        }else if(view === 'createItem'){
            this.#currentView = view;
            this.#hub.publish('SwitchToCreateItemPage', null);
        }else if(view === 'item'){
            this.#currentView = view;
            this.#hub.publish('SwitchToItemPage', null);
        }
    }

    #renderCurrentView(){
        const viewContainer = this.#container.querySelector('#viewContainer');
        viewContainer.innerHTML = '';

        if(this.#currentView === 'home') {
            viewContainer.appendChild(this.#homePage.render());
        }else if(this.#currentView === 'explore'){
            viewContainer.appendChild(this.#explorePage.render());
        }else if(this.#currentView === 'profile'){
            this.#hub.subscribe(Events.GetProfileSuccess, (data) => {
                if (this.#currentView === 'profile') {
                    const hub = EventHub.getInstance();
                    hub.publish(Events.ChangedViewToProfile, data.profile);
                }
            });
            this.#hub.publish(Events.GetProfile, getEmailFromLocalStorage());
            viewContainer.appendChild(this.#profilePage.render());
        }else if(this.#currentView === 'login'){
            viewContainer.appendChild(this.#loginPage.render());
        }else if(this.#currentView === 'register'){
            viewContainer.appendChild(this.#registerPage.render());
        }else if(this.#currentView === 'createItem'){
            viewContainer.appendChild(this.#createItemPage.render());
        }else if(this.#currentView === 'item'){
            viewContainer.appendChild(this.#itemPage.render());
        }
    }
}