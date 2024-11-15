# Notification List

### Description:
This feature listens for notifications and posts them to the notification list in the profile page. It does so by listening to the event hub for a new notification, and then pulling the provided data into the screen. It also pushes out an event for if the notifications list should be cleared.

```mermaid
sequenceDiagram
    Other Components->>EventHub: Notification Data
    EventHub->>Notification System: Notification Data
    Notification System->>EventHub: Clear Notification Event
    EventHub->>Backend: Clear Request
    Backend-->>EventHub: Clear Success
    EventHub->>Notification System: Clear Success
```