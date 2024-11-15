import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js"
import { NotificationList } from "../NotificationList/NotificationList.js"
import { ViewProfile } from "../ViewProfile/ViewProfile.js";
//TODO: Import other screens here

export class ProfileContoller extends BaseComponent {
  #container = null;
  #currentView = 'profile';
  #notificationList = null;
  #viewProfile = null;
  //TODO: Add other screens here
  #hub = null;

  constructor() {
    super();
    this.#hub = EventHub.getInstance();
    this.#notificationList = new NotificationList();
    this.#viewProfile = new ViewProfile();
    //TODO: Instantiate other screens here
    this.loadCSS("ProfileController");
  }

  render() {
    this.#createContainer(); 
    this.#setupContainerContent();
    this.#attachEventListeners();
    
    this.#notificationList.render();
    this.#viewProfile.render();
    //TODO: Render other screens here

    this.#renderCurrentView();

    return this.#container;
  }

  // Create main container element
  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.classList.add('profile-controller');
  }

  // Set up the HTML structure of container
  #setupContainerContent(){
    //TODO: Add other buttons here
    this.#container.innerHTML = `
      <div id="sidebar">
        <button id="viewProfileBtn">View Profile</button>
        <button id="viewNotifBtn">Notifications</button>
      </div>
      <div id="viewContainer"></div>`
      ;
  }

  // Attach needed event listeners
  #attachEventListeners() {
    const viewProfileBtn = this.#container.querySelector('#viewProfileBtn');
    const viewNotifBtn = this.#container.querySelector('#viewNotifBtn');

    // Event listener for switching to profile view
    viewProfileBtn.addEventListener('click', () => {
      this.#toggleView('profile');
    });

    // Event listener for switching to notification view
    viewNotifBtn.addEventListener('click', () => {
      this.#toggleView('notif');
    });

    

    // Subscribe to event hub events to manage switching
    this.#hub.subscribe('SwitchProfileToNotif', () => {
      this.#currentView = 'notif';
      this.#renderCurrentView();
    });

    this.#hub.subscribe('SwitchProfileToView', () => {
      this.#currentView = 'profile';
      this.#renderCurrentView();
    })

    //TODO: Add event subscriptions and listners for other views

  }

  // Toggle view based on button pressed
  #toggleView(view) {
    if(view === 'notif'){
      this.#currentView = view;
      this.#hub.publish('SwitchProfileToNotif', null);
    }

    if(view === 'profile'){
      this.#currentView = view;
      this.#hub.publish('SwitchProfileToView', null);
    }
    //TODO: Add toggles for other views
  }

  // Render current view depending on #currentView
  #renderCurrentView() {
    const viewContainer = this.#container.querySelector('#viewContainer');
    viewContainer.innerHTML = '';

    if (this.#currentView === 'notif'){
      viewContainer.appendChild(this.#notificationList.render());
    }

    if (this.#currentView === 'profile'){
      viewContainer.appendChild(this.#viewProfile.render());
    }
    //TODO: Add other views
  }
}