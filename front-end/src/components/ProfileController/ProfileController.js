import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js"
import { NotificationList } from "../NotificationList/NotificationList.js"
import { ViewProfile } from "../ViewProfile/ViewProfile.js";
import { conversationList } from "../conversation/conversation.js";
//TODO: Import other screens here

export class ProfileContoller extends BaseComponent {
  #container = null;
  #currentView = 'profile';
  #notificationList = null;
  #viewProfile = null;
  #conversationList = null;
  //TODO: Add other screens here
  #hub = null;

  constructor() {
    super();
    this.#hub = EventHub.getInstance();
    this.#notificationList = new NotificationList();
    this.#viewProfile = new ViewProfile();
    this.#conversationList = new conversationList();
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
    this.#conversationList.render();

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
        <button id="viewConvoBtn">Conversations</button>
      </div>
      <div id="viewContainer"></div>`
      ;
  }

  // Attach needed event listeners
  #attachEventListeners() {
    const viewProfileBtn = this.#container.querySelector('#viewProfileBtn');
    const viewNotifBtn = this.#container.querySelector('#viewNotifBtn');
    const viewConvoBtn = this.#container.querySelector('#viewConvoBtn');

    // Event listener for switching to profile view
    viewProfileBtn.addEventListener('click', () => {
      this.#toggleView('profile');
    });

    // Event listener for switching to notification view
    viewNotifBtn.addEventListener('click', () => {
      this.#toggleView('notif');
    });

    // Event listener for switching to conversation listing view
    viewConvoBtn.addEventListener('click', () => {
      this.#toggleView('convo');
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

    this.#hub.subscribe('SwitchProfileToConvo', () => {
      this.#currentView = 'convo';
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

    if(view === 'convo'){
      this.#currentView = view;
      this.#hub.publish('SwitchProfileToConvo', null);
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

    if (this.#currentView === 'convo'){
      viewContainer.appendChild(this.#conversationList.render());
    }
    //TODO: Add other views
  }
}