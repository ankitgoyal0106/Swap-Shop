import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js"
import { NotificationList } from "../NotificationList/NotificationList.js"
import { ViewProfile } from "../ViewProfile/ViewProfile.js";
import { conversationList } from "../conversation/conversation.js";
import { Achievement } from "../Achievement/Achievement.js";
import {CreateItemPage} from "../itemPage/createItemPage.js";
//TODO: Import other screens here
import { EditProfilePage } from "../editProfilePage/editProfilePage.js";

export class ProfileContoller extends BaseComponent {
  #container = null;
  #currentView = 'profile';
  #notificationList = null;
  #viewProfile = null;
  #conversationList = null;
  #achievements = null;
  #createitems = null;
  //TODO: Add other screens here
  #hub = null;
  #editorPage = null;

  constructor() {
    super();
    this.#hub = EventHub.getInstance();
    this.#notificationList = new NotificationList();
    this.#viewProfile = new ViewProfile();
    this.#conversationList = new conversationList();
    this.#achievements = new Achievement();
    //TODO: Instantiate other screens here
    this.#editorPage = new EditProfilePage();
    this.#createitems = new CreateItemPage();
    this.loadCSS("ProfileController");
  }

  render() {
    this.#createContainer(); 
    this.#setupContainerContent();
    this.#attachEventListeners();
    
    this.#notificationList.render();
    this.#viewProfile.render();
    //this.#conversationList.render();
    this.#achievements.render();
    //TODO: Render other screens here
    //this.#conversationList.render();
    this.#editorPage.render();
    this.#createitems.render();

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
        <button id="createItemBtn">Create Item</button>
        <button id="viewNotifBtn">Notifications</button>
        <button id="viewConvoBtn">Conversations</button>
        <button id="viewAchievementsBtn">Achievements</button>
        <button id="editProfileBtn">Edit Profile</button>
      </div>
      <div id="viewContainer"></div>`
      ;
  }

  // Attach needed event listeners
  #attachEventListeners() {
    const viewProfileBtn = this.#container.querySelector('#viewProfileBtn');
    const createItemBtn = this.#container.querySelector('#createItemBtn');
    const viewNotifBtn = this.#container.querySelector('#viewNotifBtn');
    const viewConvoBtn = this.#container.querySelector('#viewConvoBtn');
    const viewAchievementsBtn = this.#container.querySelector('#viewAchievementsBtn');
    const editProfileBtn = this.#container.querySelector('#editProfileBtn');

    // Event listener for switching to profile view
    viewProfileBtn.addEventListener('click', () => {
      this.#toggleView('profile');
    });
    // Event listener for switching to create item view
    createItemBtn.addEventListener('click', () => {
      this.#toggleView('createItem');
    });
    // Event listener for switching to notification view
    viewNotifBtn.addEventListener('click', () => {
      this.#toggleView('notif');
    });

    // Event listener for switching to conversation listing view
    viewConvoBtn.addEventListener('click', () => {
      this.#toggleView('convo');
    });

    // Event listener for viewing achievements
    viewAchievementsBtn.addEventListener('click', () => {
      this.#toggleView('achievements');
    });


    //Event listener for switching to edit profile view
    editProfileBtn.addEventListener('click', () => {
      this.#toggleView('edit');
    });



    // Subscribe to event hub events to manage switching
    this.#hub.subscribe('SwitchProfileToCreateItem', () => {  
      this.#currentView = 'createItem';
      this.#renderCurrentView();
    });

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
    

    this.#hub.subscribe('SwitchProfileToAchievements', () => {
      this.#currentView = 'achievements';
      this.#renderCurrentView();
    })
    //TODO: Add event subscriptions and listners for other views
    this.#hub.subscribe('SwitchProfileToEdit', () => {
      this.#currentView = 'edit';
      this.#renderCurrentView();
    });
  }

  // Toggle view based on button pressed
  #toggleView(view) {
    if(view === 'createItem'){
      this.#currentView = view;
      this.#hub.publish('SwitchProfileToCreateItem', null);
    }
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

    if(view === 'achievements'){
      this.#currentView = view;
      this.#hub.publish('SwitchProfileToAchievements', null);
    }
    //TODO: Add toggles for other views
    if (view === 'edit'){
      this.#currentView = view;
      this.#hub.publish('SwitchProfileToEdit', null);
    }
  }

  // Render current view depending on #currentView
  #renderCurrentView() {
    const viewContainer = this.#container.querySelector('#viewContainer');
    viewContainer.innerHTML = '';
    if (this.#currentView === 'createItem'){
      viewContainer.appendChild(this.#createitems.render());
    }
    if (this.#currentView === 'notif'){
      viewContainer.appendChild(this.#notificationList.render());
    }

    if (this.#currentView === 'profile'){
      viewContainer.appendChild(this.#viewProfile.render());
    }

    if (this.#currentView === 'convo'){
      viewContainer.appendChild(this.#conversationList.render());
    }

    if (this.#currentView === 'achievements'){
      viewContainer.appendChild(this.#achievements.render());
      console.log('Rendering: ', this.#currentView);
    }
    //TODO: Add other views
    if (this.#currentView === 'edit'){
      viewContainer.appendChild(this.#editorPage.render());
    }
  }
}