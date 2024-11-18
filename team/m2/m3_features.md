# Application Features 
Here we outline the list of key features that we implemented during this milestone. For each feature, there is a short description of the feature, a point value based on the complexity of the feature and a team member that was assigned to the feature. 

### Small Features (1 point)

1. **Feature Name:** Home Page
**Description:** The first page that loads when a user accesses the web application. Provides information about SwapShop and showcases some images of the UMass Farmers market and some items that are sold to help further explain our cause. It includes headings, paragraphs and some images that a user can click a button to cycle through some images.
**Point Value:** 1 point
**Team Member:** Emily Larkin


### Medium Features (3-4 points)

1. **Feature Name:** Navigation Bar
**Description:** The navigation bar is located at the top of the web application and allows users to view new webpages within the div element. When a user clicks the name of the page that they want to go to, the AppController is notified and will create a new instance of the specified page. This will get exported and will load into the div of the page so that the new page is rendered. 
**Point Value:** 3 points
**Team Member:** Emily Larkin

2. **Feature Name:** App Controller
**Description:** The AppController manages all the new instances of the new pages after a user requests to change to a different page. The AppController imports all necessary classes, creates new instances of the pages, manages event listeners when a button on the navigation bar is clicked and renders the instances of the pages by loading them into the div. 
**Point Value:** 3 points
**Team Member:** Nathan Palmer and Emily Larkin

3. **Feature Name:** Achievements Page
**Description:** The achievements page lists all achievements that a user can acquire during their time using the app. Once a user completes an action, the eventHub will "log" these actions and notify that an achievement has been unlocked. Once unlocked, the user will be able to view all their achievements on their achievements page. For now, this page contains a draft images of the achievement badges and they are all visible. Currently, no data storage is utilized yet but in the future this will require more complex interactions. All badges were individually designed using Canva.
**Point Value:** 3 points
**Team Member:** Nathan Palmer and Emily Larkin

4. **Feature Name:** Explore Page
**Description:** The explore page is the place where users can view listed items. Users can utilize a filter drop down that gives them categories of items that they may be interested in. Further more, users can use the search bar to search for the exact name of something they are interested in. There are also price filters and a condition filter (new or used) that a user can also take advantage of to find an item. There is a recently viewed section that will display items that a user has recently looked at. The page will utilize a back-end database to store all item objects and these objects will be searched through based on the filters a user sets. 
**Point Value:** 3 points
**Team Member:** Jackson MacDonald

5. **Feature Name:** Explore Page Search 
**Description:** The search bar allows users to directly type in text to display items explore page. The search bar dynamically updates the items on the page based on user input, filtering by keywords. Currently, the data used is "dummy data" just to test functionality, but all data will be stored in a backend data base where each item will be stored as an object. The search will then be responsive to both user input and the data in the database.
**Point Value:** 4 points
**Team Member:** Jackson MacDonald

6. **Feature Name:** Explore Page Filters 
**Description:** The filters allows users to filter the items displayed on the explore page by category, price or condition (used or new). Once a filter has been chosen, the page will be dynamically updated to show the items that fit the filter criteria Currently, the data used is "dummy data" just to test functionality, but all data will be stored in a backend data base where each item will be stored as an object. The filter will then be responsive to both user input and the data in the database.
**Point Value:** 3 points
**Team Member:** Jackson MacDonald

7. **Feature Name:** A page for Edit profile.
**Description:** The Edit Profile page allows users to update their profile information, including fields such as First Name, Last Name, Email, Phone Number, and Password. Users can also upload or update their profile picture. Upon submission, all changes are validated to ensure data integrity (e.g., proper email format, password confirmation matching). When changes are confirmed and updated, the relevant profile page will display the modified data in real-time. This page requires handling complex form validation, user interactions, and IndexedDB storage operations for efficient data management.
**Point Value:** 3 points
**Team Member:** Scott Puopolo


### Large Features (5 points)

1. **Feature Name:** Notifications and Alerts
**Description:** Notifications and alerts have been set up to ensure that any chat messages or listing views for a user will display. Notifications can be viewed or deleted from the notifications tab in the user's profile. The notifications are monitored from the EventsHub and new notifications will be created and rendered in the notificationsListing. This implementation requires complex data processing and is dynamically updated based on events that are recorded in the eventsHub.    
**Point Value:** 5 points
**Team Member:** Nathan Palmer

2. **Feature Name:** Chat Room Interface
**Description:** The chat room interface allows two users to type a message in a box, press send and then renders the messages in a conversation for both users. This requires a complex data processing to load in the correct conversations and also requires handling complex interactions with users. Furthermore, this interface also communicates with the eventsHub to help generate notifications and alerts when messages are received and will utilize back-end storage operations.
**Point Value:** 5 points
**Team Member:** Tyler Tang

3. **Feature Name:** Conversation Page
**Description:** Contains a list of all the current/ongoing conversations between users in "blocks" that details the number of users and the conversation name. It creates new conversation "block" when new conversations are started when a user clicks "start new conversation". It also allows users to access the conversations that are ongoing by clicking the conversation "block" which will open up the chat room interface. This requires a complex data processing to load in the correct conversations and also requires handling complex interactions and will utilize backend storage operations.  
**Point Value:** 5 points
**Team Member:** Tyler Tang

4. **Feature Name:** Profile Page 
**Description:** The profile page contains all the information about a user once a user has successfully logged in. The page will render all items that the user has currently listed by accessing data from the backend server (when implemented). There is a side bar that allows users to toggle different views to "view profile", see their "notifications", see their "achievements" and access their "conversations". The different views are toggled/rendered in the profileController. This page required many different complex interactions depending on what a user clicks.
**Point Value:** 5 points
**Team Member:** Ankit Goyal and Scott Puopolo

5. **Feature Name:** Multi-step Registration Page 
**Description:** This page allows users to input details about themselves to create an account for SwapShop. The information such as name, email, phone number, password and college are all required fields for the user and are separately validated. The form includes a client-side validation and currently utilizes IndexedDB to handle both successful submissions and error states. 
**Point Value:** 5 points
**Team Member:** Scott Puopolo

6. **Feature Name:** Profile Log-In Page 
**Description:** This page allows users to provide their email and password to successfully log into their SwapShop account. Both the email and password information will be paired and stored in the back-end. Upon successful verification, the profile page to be visible to the user. There are also options to create an account if the user does not have one. If the user clicks "register here", the eventHub activates to switch to the registration page. This log-in requires many different complex interactions between various parts of the application and based on user input.
**Point Value:** 5 points
**Team Member:** Ankit Goyal

7. **Feature Name:** Create Item Pages (Making the page)
**Description:** The create item page allows a user to create a listing for an item and stores all the information as an object in IndexedDB. This the information will then be used to render a listing for other users on their explore page and will also appear within the users own profile page under their listed items. It utilizes IndexedDB to create and store the data for the item page (i.e. item name, item description, images of the item, etc.) and also requires handling complex user interactions. 
**Point Value:** 5 points
**Team Member:** Snigdha Thatikonda

8. **Feature Name:** Create Item Page Form (Making the user input form)
**Description:** The create item page form allows a user to create a listing for an item and stores all the information in an item page. The form section allows the user to input all necessary data about their listed item and utilizes IndexedDB to store the data for the item page (i.e. item name, item description, images of the item, etc.) and also requires handling complex user interactions. All of the variables from the form map to vairables that are listed in the data.md file. This also includes the use of the Geolocation API to track the users location.
**Point Value:** 5 points
**Team Member:** Snigdha Thatikonda
