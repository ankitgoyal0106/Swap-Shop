# Application Data
## Overview
#### 1. User Profile
- **Description**: Contains personal information about the user, including login details and preferences.
- **Attributes**:
    - `userID` (string): A unique identifier for each buyer.
    - `name` (string): The user's full name.
    - `email` (string): The user's email address.
    - `phoneNo` (string): The user's phone number.
    - `password` (string): An encrypted version of the user's password.
    - `createdAt` (timestamp): The date and time when the account was created.
    - `updatedAt` (timestamp): The last time when the buyer's profile was updated.
- **Data Source**: user-input data when registering or updating their profile.

#### 2. Company Information
- **Description**: Contains the information about the user's company.
- **Attributes**:
    - `companyID` (string): A unique identifier for each company.
    - `companyName` (string): The name of the seller's company.
    - `companyDescription` (string): A description of the company.
- **Data Source**: user-input data while updating their profile.

#### 3. Listings Data
- **Description**:
- **Attributes**:
    - `itemName` (string):
    - `itemDescription` (string):
    - `price` (number):
    - `associatedCompany` (string (`companyID`)): 
- **Data Source**:
