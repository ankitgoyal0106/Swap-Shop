# Application Data
A file that describes the types of data the application will handle, but without specifying storage methods.
## Overview
### 1. User Profile
- **Description**: Contains personal information about the user, including login details and preferences.
- **Attributes**:
    - `userID` (string): A unique identifier for each buyer.
    - `name` (string): The user's full name.
    - `email` (string): The user's email address.
    - `phoneNo` (string): The user's phone number.
    - `college` (string): The college that the user attends.
    - `password` (string): An encrypted version of the user's password.
    - `profilePicture` (string): A link to the user's profile picture.
    - `createdAt` (timestamp): The date and time when the account was created.
    - `updatedAt` (timestamp): The last time when the buyer's profile was updated.
    - `achievements` (array): A list of JSON achievements unlocked by the user.
    - `savedListings` (array): A list of `listingIDs` that the user has saved.
    - `recentlyViewed` (array): A list of `listingIDs` that were recently viewed by the user.
    - `conversationList` (array): A list of `conversationID` that the user is included in 
- **Data Source**: User-input data when registering or updating their profile.

### 2. Listings Data
- **Description**: Represents items posted for sale or exchange by users.
- **Attributes**:
    - `listingID` (string): A unique identifier for each listing.
    - `itemName` (string): The name of the listed item.
    - `itemDescription` (string): A description of the listed item.
    - `category` (String): The category or type of item.
    - `price` (float): The price of the listed item.
    - `associatedUser` (string): The `userID` of the user that the item is posted by.
    - `postedAt` (timestamp): The date and time when the item was posted.
    - `itemLocation` (string): The location of the listing.
    - `images` (array of string): Links to images uploaded for item.
    - `amountAvailable` (float): The amount of items that are available.
    - `updatedAt` (timestamp): The last time the listing was updated.
- **Data Source**: This will be data entered by the user upon the listing of a new item for their company.

### 3. Conversation
- **Description**: Stores all conversation data exchanged between buyers and sellers.
- **Attributes**:
    - `conversationID` (string): The ID of the conversation (group of messages) between two users.
    - `conversationName` (string): The name of the conversation between two users.
    - `users` (array): String of all `userID` in the conversation.
    - `messages` (array): An array of message objects specific to the conversation (Relate to Messages below)

- **Data Source** User-input data through in-app messaging.

### 4. Messages
- **Description**: Stores messages exchanged between buyers and sellers.
- **Attributes**:
    - `senderID` (string): The `userID` of the sender.
    - `content` (string): The actual message text.
    - `readStatus` (boolean): Whether the message has been read by the receiver.
- **Data Source** User-input data through in-app messaging.

## Data Relationships
- **User Profiles and Listings**: Each `userID` can be associated with multiple `listingIDs` representing items the user has posted for sale.
- **User Profiles and Messages**: Each `userID` can be associated with multiple `conversationIDs` for messaging between buyers and sellers.
- - **Conversations and Messages**: Each `conversationIDs` can be associated with multiple `userIDs`, and `Messages` for messaging between buyers and sellers.
- **User Profiles and Achievements**: Each `userID` can be associated with multiple `achievementIDs`.

## Data Sources
- **User-Input Data**: This includes most attributes associated with user profiles, listings, and messages.
- **System-Generated Data**: This includes unique IDs, timestamps, recommendations, and achievements.
