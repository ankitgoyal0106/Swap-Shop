# Feature Sequence Diagram for ConversationListing

### Description
- This view is accessible through the profilePage sidebar by pressing the "Conversations" button
- Presents a listing of all the current coversations with other users
- Clicking on a conversation will change the view to the chat room layout

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant JS
    participant localStorage
    participant Server

    alt has existing conversations
        Server-->>JS: get convoIDs of existing conversation entries
        JS->>UI: create div container for each of the conversation entries for user to interact with
    end

    User->>UI: clicks on Start Conversation button
    User->>UI: user enters group name and member names and interacts with respective buttons
    UI->>JS: handles events for when New Group and Add Member buttons are pressed
    JS->>localStorage: saves whenever Add Member button is pressed
    localStorage->>JS: returns list of members to be added to group when New Group is pressed
    JS->>JS: generates convoID for new group
    JS->>UI: creates div component in the listing with the newly added conversation info
    JS->>Server: stores conversation info

    User->>UI: clicks on a conversation entry
    UI->>JS: handles click event
    JS->>Server: requests conversation info from server
    Server-->>JS: returns conversation info (convoID)
    JS->>JS: passes conversation info into chatInterface()
    JS->>Server: request chat history for that convoID
    Server-->>JS: returns chat history
    JS->>UI: chatInterface() renders with message history

