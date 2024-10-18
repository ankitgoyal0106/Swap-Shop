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
    - `role` (string): Defines wether the user is a buyer, seller, or both.
    - `rating` (float): The rating of how well the user is at buying, selling, and messaging.
    - `createdAt` (timestamp): The date and time when the account was created.
    - `updatedAt` (timestamp): The last time when the buyer's profile was updated.
    - `preferences` (JSON): Stores user preferences such as categories of interest.
    - `achievements` (array): A list of JSON achievements unlocked by the user.
    - `savedListings` (array): A list of `listingIDs` that the user has saved.
    - `recentlyViewed` (array): A list of `listingIDs` that were recently viewed by the user.
- **Data Source**: User-input data when registering or updating their profile.

### 2. Company Information
- **Description**: Contains the information about the user's company.
- **Attributes**:
    - `companyID` (string): A unique identifier for each company.
    - `owners` (array of strings): An array of `userIDs` of those who have access to the company.
    - `companyName` (string): The name of the seller's company.
    - `companyDescription` (string): A description of the company.
    - `companyRating` (float): The rating of how good the company is.
    - `companyLocation` (string): The location of the company.
    - `companyEmail` (string): The email address associated with the company.
- **Data Source**: User-input data while updating their profile.

### 3. Listings Data
- **Description**: Represents items posted for sale or exchange by users.
- **Attributes**:
    - `listingID` (string): A unique identifier for each listing.
    - `itemName` (string): The name of the listed item.
    - `itemDescription` (string): A description of the listed item.
    - `category` (String): The category or type of item.
    - `price` (float): The price of the listed item.
    - `associatedCompany` (string): The `companyID` of the company that the item is associated with.
    - `postedAt` (timestamp): The date and time when the item was posted.
    - `itemLocation` (string): The location of the listing.
    - `images` (array of string): Links to images uploaded for item.
    - `amountAvailable` (float): The amount of items that are available.
    - `updatedAt` (timestamp): The last time the listing was updated.
- **Data Source**: This will be data entered by the user upon the listing of a new item for their company.

### 4. Messages
- **Description**: Stores messages exchanged between buyers and sellers.
- **Attributes**:
    - `messageID` (string): A unique identifier for each message.
    - `conversationID` (string): The ID of the conversation (group of messages) between two users.
    - `senderID` (string): The `userID` of the sender.
    - `receiverID` (string): The `userID` of the receiver.
    - `content` (string): The actual message text.
    - `sentAt` (timestamp): The date and time when the message was sent.
    - `readStatus` (boolean): Whether the message has been read by the receiver.
- **Data Source** User-input data through in-app messaging.

### 5. Suggestions Data
- **Description**: Represents product or listing suggestions tailored for users based on their previous activity and preferences.
- **Attributes**:
    - `suggestionID` (string): A unique identifier for each suggestion.
    - `userID` (string): The `userID` of the user receiving the suggestion.
    - `recommendedItems` (array): A list of `listingIDs` to be suggested.
    - `suggestedAt` (timestamp): The date and time when the suggestion was generated.
    - `viewedSuggestions` (array): A list of the recently viewed suggestions for a user.
- **Data Source**: System-generated based on user interaction and browsing history.

## Data Relationships
- **User Profiles and Listings**: Each `userID` can be associated with multiple `listingIDs` representing items the user has posted for sale.
- **User Profiles and Messages**: Each `userID` can be associated with multiple `conversationIDs` for messaging between buyers and sellers.
- **User Profiles and Achievements**: Each `userID` can be associated with multiple `achievementIDs`.
- **User Profiles and Suggestions**: Each `userID` can be associated with multiple `suggestionIDs`.
- **User Profiles and Companies**: Each `companyID` can be associated with multiple `userIDs`. 

## Data Sources
- **User-Input Data**: This includes most attributes associated with user profiles, company information, listings, and messages.
- **System-Generated Data**: This includes unique IDs, timestamps, recommendations, and achievements.
