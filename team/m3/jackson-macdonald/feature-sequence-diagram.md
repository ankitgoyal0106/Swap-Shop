# Feature Sequence Diagram for ExplorePage Searching

### Description
- This view is accessible through the explore button on the navigation bar.
- Presents all item listings that contain the search field in their title or description, and the chosen category.
- Clicking on the search button will filter the correct items and display them in the item grid

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant JS
    participant localStorage
    participant Server

    User->>UI: user inputs search field and category from dropdown menu
    User->>UI: clicks on search button 
    UI->>JS: handles events for when serach button is pressed by calling update Item Grid 
    JS->>Server: Requests all listings to filter
    Server-->>JS: Sends all listings to be filtered
    JS->>localStorage: Sends all filtered items that will be displayed to local storage
    localStorage-->>JS: returns all items that fit the search input or category
    JS-->>UI: Rerenders the item grid that the user has
