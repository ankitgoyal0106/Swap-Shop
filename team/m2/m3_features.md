# Application Features 
Here we outline the list of key features that we implemented during this milestone. For each feature, there is a short description of the feature, a point value based on the complexity of the feature and a team member that was assigned to the feature. 

### Small Features (1 point)

1. **Feature Name:** Home Page
**Description:** The first page that loads when a user accesses the web application. Provides information about SwapShop and showcases some images of the UMass Farmers market to help further explain our cause. It includes headings, paragraphs and some images that a user can click a button to cycle through some images.
**Point Value:** 1 point
**Team Member:** Emily Larkin



### Medium Features (3 points)

1. **Feature Name:** Navigation Bar
**Description:** The navigation bar is located at the top of the web application and allows users to view new webpages within the div element. When a user clicks the name of the page that they want to go to, the AppController is notified and will create a new instance of the specified page. This will get exported and will load into the div of the page so that the new page is rendered. 
**Point Value:** 3 points
**Team Member:** Emily Larkin

2. **Feature Name:** App Controller
**Description:** The AppController manages all the new instances of the new pages after a user requests to change to a different page. The AppController imports all necessary classes, creates new instances of the pages, manages event listeners when a button on the navigation bar is clicked and renders the instances of the pages by loading them into the div. 
**Point Value:** 3 points
**Team Member:** Nathan Palmer and Emily Larkin

3. **Feature Name:** Achievements Page
**Description:** The achievements page lists all achievements that a user can acquire during their time using the app. Once a user completes an action, the eventHub will "log" these actions and notify that an achievement has been unlocked. Once unlocked, the user will be able to view all their achievements on their achievements page. For now, this page contains a draft images of the achievement badges and they are all visible. Currently, no data storage is utilized yet but in the future this will require more complex interactions.
**Point Value:** 3 points
**Team Member:** Nathan Palmer and Emily Larkin


### Large Features (5 points)

1. **Feature Name:** Notifications and Alerts
**Description:** Notifications and alerts have been set up to ensure that any chat messages or listing views for a user will display. Notifications can be viewed or deleted from the notifications tab in the user's profile. The notifications are monitored from the EventsHub and new notifications will be created and rendered in the notificationsListing. This implementation requires complex data processing and is dynamically updated based on events that are recorded in the eventsHub.    
**Point Value:** 5 points
**Team Member:** Nathan Palmer

2. **Feature Name:** Chat Room Interface
**Description:** The chat room interface allows two users to type a message in a box, press send and then renders the messages in a conversation for both users. This requires a complex data processing to load in the correct conversations and also requires handling complex interactions with users. Furthermore, this interface also communicates with the eventsHub to help generate notifications and alerts when messages are received and utilizes IndexedDB storage operations.
**Point Value:** 5 points
**Team Member:** Tyler Tang

**Feature Name:** Conversation Page
**Description:** Contains a list of all the current/ongoing conversations between users in "blocks" that details the number of users and the conversation name. It creates new conversation "block" when new conversations are started when a user clicks "start new conversation". It also allows users to access the conversations that are ongoing by clicking the conversation "block" which will open up the chat room interface. This requires a complex data processing to load in the correct conversations and also requires handling complex interactions and IndexedDB storage operations.  
**Point Value:** 5 points
**Team Member:** Tyler Tang