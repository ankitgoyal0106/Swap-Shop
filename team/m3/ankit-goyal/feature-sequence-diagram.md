# Feature Sequence Diagram for Profile Page

### Description
- The user can acces to the profile page by clicking on the button available on the top right corner.
- The Profile Page will display key information about the seller or buyer. It will feature a minimal yet intuitive design, showing the user's profile picture at the top, followed by their name, and bio. It will also contain tabs or sections to navigate between active listings (for sellers) or purchase history (for buyers).
- Sellers can update their listings, view ratings, and respond to messages, while buyers can track orders and leave feedback. Users can also edit their profile details. If accessed without login, the system redirects to the login page, ensuring secure access.
- User can see if they have any notifications by clicking the notification button.
  
```mermaid
sequenceDiagram
    participant User
    participant UI
    participant JS
    participant IndexedDB
    participant Server
    
    User->>UI: Clicks on Profile Button
    UI->>JS: Handle Click Event
    JS->>IndexedDB: Check if user is logged in
    alt User is logged in
        JS->>Server: Fetch User Profile Data
        Server-->>JS: Return User Data
        JS->>UI: Display User Data (Profile Picture, Name, Listings, Notifications)
        User->>UI: Clicks on Notifications
        UI->>JS: Handle Notification Click Event
        JS->>Server: Fetch Notifications
        Server-->>JS: Return Notifications Data
        JS->>UI: Display Notifications
    else User is not logged in
        JS->>UI: Redirect to Login Page
    end
    User->>UI: Clicks on Edit Profile/Listing
    UI->>JS: Handle Edit Click Event
    JS->>Server: Update Profile/Listing Data
    Server-->>JS: Acknowledge Update
    JS->>UI: Reflect Changes on UI
