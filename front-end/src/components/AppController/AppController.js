import { explorePage } from "../explorePage/explorePage.js";
import { homeComponent } from "../homePage/homePage.js";
import { profilePage } from "../mainProfilePage/mainProfilePage.js";
import { ProfileLoginPage } from "../ProfileLoginPage/ProfileLoginPage.js";
import { EventHub } from "../../eventhub/EventHub.js";

export class AppController {
    #container = null;
    #currentView = 'home';
    #homePage = null;
    #explorePage = null;
    #profilePage = null;
    #loginPage = null;
    #hub = null;

    constructor(){
        this.#hub = EventHub.getInstance();
        this.#homePage = new homeComponent();
        this.#explorePage = new explorePage();
        this.#profilePage = new profilePage();
        this.#loginPage = new ProfileLoginPage();
    }

    render() {
        this.#createContainer();
        this.#setupContainerContent();
        this.#attachEventListeners();

        this.#homePage.render();
        this.#explorePage.render();
        this.#profilePage.render();
        this.#loginPage.render();

        this.#renderCurrentView();

        return this.#container;
    }

    #createContainer(){
        this.#container = document.createElement('div');
        this.#container.classList.add('app-controller');
    }

    #setupContainerContent(){
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

        homeBtn.addEventListener('click', () => {
            this.#toggleView('home');
        });

        exploreBtn.addEventListener('click', () => {
            this.#toggleView('explore');
        });

        profileBtn.addEventListener('click', () => {
            this.#toggleView('profile');
        });

        loginBtn.addEventListener('click', () => {
            this.#toggleView('login');
        });

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
            viewContainer.appendChild(this.#profilePage.render());
        }else if(this.#currentView === 'login'){
            viewContainer.appendChild(this.#loginPage.render());
        }
    }
}