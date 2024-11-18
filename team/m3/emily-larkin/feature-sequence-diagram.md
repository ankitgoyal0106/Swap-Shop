# Feature Sequence Diagram for the Navigation Bar 

### Description
The navigation bar allows users to access different page content when they click on the text for the corresponding page. Once the page the user wants is clicked on the navigation bar, then the div on the main page of the application is rendered with the page information for the corresponding page.

```mermaid
sequenceDiagram
    participant User
    participant AppController
    participant EventHub 
    participant PageComponents
    participant Index.html

    User->>AppController: Clicks button on Navigation Bar
    AppController->>EventHub: Publishes event
    EventHub->>AppController: Event "SwitchTo_PageName" received
    AppController->>AppController: Updates #currentView to 'home'
    AppController->>AppController: Calls #renderCurrentView() to render homePage
    AppController->>PageComponents: Renders PageName component
    PageComponents->>Index.html: Updates the DOM with PageName content
    AppController->>Index.html: Updates #viewContainer with PageName content
```

