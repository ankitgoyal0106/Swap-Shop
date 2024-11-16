# Feature Sequence Diagram for Registration Page

### Description
- When the user does not have an account to sign in to the application, they may register on the registration page.
- The registration page collects user information such as name, email, password, college, and phone number.
- After the user submits the form for registration, the JavaScript checks that all inputs are valid and then initializes an object to store the user information and adds non-user-input data such as timestamps and other arrays to store IDs for conversations and listings.
- Currently the data is then stored in an IndexedDB, however, the storage of this data will eventually move to the back end.
- Once the data is stored, the user interface will update to a different page in the application.

```mermaid
sequenceDiagram
    Actor User
    participant UI as User Interface
    participant JS as JavaScript
    participant DB as IndexedDB
    
    User->>UI: Clicks the 'Register Here' Button on the Login Page
    UI->>JS: Handle 'Register Here' Click Event
    JS->>UI: Render the Registration Page
    User->>UI: Enters All Required Information to the Form
    User->>UI: Clicks the 'Register' Button
    UI->>JS: Handle 'Register' Click Event
    JS->>JS: Verify the Form Information
    alt Form is Completed Incorrectly
        JS->>UI: Alert Telling the User to Correct Input
        User->>UI: User Fixes Erroneous Input and Resubmits
        UI->>JS: Handle 'Register' Click Event
        JS->>JS: Verify Form Information
    end
    JS->>JS: Format User Input Into a JSON Object With All Necessary User Information
    JS->>DB: Send New JSON User Object to be Stored
    JS->>UI: Update User Interface to No Longer Display the Registration Page