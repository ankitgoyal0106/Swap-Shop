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
    - `createdAt` (date): The date and time when the account was created.
    - `updatedAt` (date): The last time when the buyer's profile was updated.
    - `achievementCounts` (JSON): A list of JSON achievements unlocked by the user.
    - `savedListings` (string): A list of `listingIDs` that the user has saved.
    - `recentlyViewed` (string): A list of `listingIDs` that were recently viewed by the user.
    - `conversationList` (string): A list of `conversationID` that the user is included in 
- **Data Source**: User-input data when registering or updating their profile.

### 2. Listings Data
- **Description**: Represents items posted for sale or exchange by users.
- **Attributes**:
    - `listingID` (UIUD): A unique identifier for each listing.
    - `itemName` (string): The name of the listed item.
    - `itemDescription` (text): A description of the listed item.
    - `category` (string): The category or type of item.
    - 'condition' (string): Whether the item is used or new.
    - `price` (float): The price of the listed item.
    - `associatedUser` (string): The `userID` of the user that the item is posted by.
    - `postedAt` (date): The date and time when the item was posted.
    - `itemLocation` (string): The location of the listing.
    - `images` (BLOB): Links to images uploaded for item.
    - `amountAvailable` (integer): The amount of items that are available.
    - `updatedAt` (date): The last time the listing was updated.
    - 'sellerEmail' (string): The email of the seller listing the item.
- **Data Source**: This will be data entered by the user upon the listing of a new item on the Create Item Page Form.

### 3. Conversation
- **Description**: Stores all conversation data exchanged between buyers and sellers.
- **Attributes**:
    - `convoID` (string): The ID of the conversation (group of messages) between two users.
    - `groupName` (string): The name of the chatroom.
    - `groupMembers` (string): A list of all the participants in the chat.
    - `msgLog` (string): An array of message objects {name:, msg:} that represent the messages sent between users. It stores messages exchanged between buyers and sellers.

- **Data Source** User-input data through in-app messaging.

## Data Relationships
- **User Profiles and Listings**: Each `userID` can be associated with multiple `listingIDs` representing items the user has posted for sale.
- **User Profiles and Messages**: Each `userID` can be associated with multiple `conversationIDs` for messaging between buyers and sellers.
- - **Conversations and Messages**: Each `conversationIDs` can be associated with multiple `userIDs`, and `Messages` for messaging between buyers and sellers.
- **User Profiles and Achievements**: Each `userID` can be associated with multiple `achievementIDs`.

## Data Sources
- **User-Input Data**: This includes most attributes associated with user profiles, listings, and messages.
- **System-Generated Data**: This includes unique IDs, timestamps, recommendations, and achievements.
