# Contribution Log for Jackson MacDonald

## October 10-16, 2024

- **Task:** Set up the initial group chat, and meeting.
- **Details:** Created the group chat with the members, created a when2meet to find our meeting time, coordinated a time, and booked a group study room in DuBois Library.

## October 17, 2024

- **Task:** Add description of Explore and Item page in ui-diagrams.md
- **Details:** Wrote a description for the explore page and the item page including the Use Cases.
- **Link to Commit:**
-  1. [Description for the Explore Page in UI](https://github.com/ankitgoyal0106/326-Group-Project/commit/819ac099a632852eb95f1b2c472553a15c7acee8)
   2. [Description for the Items Page in UI](https://github.com/ankitgoyal0106/326-Group-Project/commit/27e8d1b42283626c8f955a1dcb67b41f8ddc2072)
 
## November 5, 2024

- **Task:** Created the Explore Page Files
- **Details:** Created key explore page features such as itemsGrid, searchBar, and a spot for the navBar
- **Link to Commit:**
-  1. [Creation of the Explore Page Files and key features ](https://github.com/ankitgoyal0106/Swap-Shop/commit/ac4a778e5356dc5a5a0c7931ce05fe8cf1e9abeb)

 ## November 6, 2024

- **Task:** Expanded on the Explore Page Components
- **Details:** Creation of more explore page features such as item cards, item grid, title, recently viewed, recommended, category drop down, and title
- **Link to Commit:**
-  1. [Addition of explore page features](https://github.com/ankitgoyal0106/Swap-Shop/commit/bfe6660be1b842fed7ea8ae7f64f4d72ec53632a)
   2. [Addition of a previous and next button for the items ](https://github.com/ankitgoyal0106/Swap-Shop/commit/5eb277a6a8d24d98b46c36672380bef5108d5151)
   3. [Altered my plain JS to be a class with functions](https://github.com/ankitgoyal0106/Swap-Shop/commit/9de56d87ccc63029eadd3c30873cd02688ad0d6e)
 
## November 13, 2024

- **Task:** Changes to front-end Explore Page Components
- **Details:** Creation of more explore page features such as item cards, item grid, title, recently viewed, recommended, category drop down, and title
- **Link to Commit:**
-  1. [Added changes to the recently viewed and fixed CSS ](https://github.com/ankitgoyal0106/Swap-Shop/commit/2269410803be76f6a1629d21b027a13f507d9a2d)
   2. [Renders the explore page when clicked on navBar](https://github.com/ankitgoyal0106/Swap-Shop/commit/43b17258579a32e0c2b2755bd7ea306227532398)
   3. [Renders the Profile Page when clicked on navBar](https://github.com/ankitgoyal0106/Swap-Shop/commit/5fd87e4ac352c90507f7a156e2230b80f12923dc)

 
## November 14, 2024

- **Task:** Changes to the rendering of the register button on the profile page
- **Details:** Creation of the register button on the profile page that links to the form
- **Link to Commit:**
-  1. [Added register button and CSS fix to center the form](https://github.com/ankitgoyal0106/Swap-Shop/commit/46dc68125b2362c4808dd5b873166ca178dbef6b)
 
## November 15, 2024

- **Task:** Additional changes to explore page functionality 
- **Details:** Changes to the explore page to make the buttons and categories of the search bar functional for our item objects and make the correct item grid based on our search inputs
- **Link to Commit:**
-  1. [Made the search bar functional for inputs to match title or description and if the category matches the dropdown](https://github.com/ankitgoyal0106/Swap-Shop/commit/831678c7fea11d8e5417c593afe8c24dd312dac3)
   2.  [Updated data.md with Scott to fix our new vision on the project](https://github.com/ankitgoyal0106/Swap-Shop/commit/e1e1d2d61e46f637e433bf0f493369efb91289c1)
 
## December 3rd, 2024

- **Task:** Created the in-memory model for items and created an issue for Sqlite model for the item page
- **Details:** Created the in-memory model for items for functionality
- **Link to Commit:**
-  1. [Made the search bar functional for inputs to match title or description and if the category matches the dropdown](https://github.com/ankitgoyal0106/Swap-Shop/commit/2a887d3f2a6c044d514918f8f2dab5d2ed961516)
   2.  [Made the issue for SqlLiteItemModel](https://github.com/ankitgoyal0106/Swap-Shop/commit/829691d0a9c4561ac43a9dab5997a3ab1496cbe3)
 

## December 4th, 2024

- **Task:** Created the Sqlite model for the item page and made fixes after bad merge
- **Details:** Created the in-memory model for items for functionality
- **Link to Commit:**
-  1. [Inital implementation of SQLite Model for items](https://github.com/ankitgoyal0106/Swap-Shop/commit/21204731be49b454ac98712aba66fa11880bd8b5)
   2.  [Fixes for SqlLiteItemModel b/c bad merge](https://github.com/ankitgoyal0106/Swap-Shop/commit/f206302267d299f3123025ffaa5b292b9c46dc2e)
 
## December 8th, 2024

- **Task:** Fully connected the explore page to the backend to populate the item cards for users
- **Details:** Connected the front end of getItems() to the backend by using routes and the item controller to fetch the data from the SQLite database. All items stored in the backend appear and populate 
- **Link to Commit:**
-  1. [Inital fixes to the explore page routing and item controller](https://github.com/ankitgoyal0106/Swap-Shop/commit/6cd3017851deb5c39578004b960bd09754e75615#diff5386d772959d040cad1c2c20e8980e2c42624355c2cf5ade90c137203d6c2716)
   2.  [Explore page now populates with items that are fetched from the backend](https://github.com/ankitgoyal0106/Swap-Shop/commit/c7d0dc7503d4f9a9806ff0050cb6a90f60774b96)
   3.   [Many front-end fixes on the explore page](https://github.com/ankitgoyal0106/Swap-Shop/commit/eb32ef214e8f24ab965b103d61c9226861ded27a)
 
## December 9th, 2024

- **Task:** Added functionality to item cards
- **Details:** Item cards  now render the item page when clicked on, have styling changes, and are integrated into the app
- **Link to Commit:**
-  1. [Returning item information when clicked on](https://github.com/ankitgoyal0106/Swap-Shop/commit/0cfe069a7f1ccbc4a05fd13a2d6c3f1e414a9b86#diff-c9aa057753ae84cce7dd488f61b53a77d76d98d9be2d41a9a5476dd71a12e733)
   2.  [Added functionality to item cards to item page](https://github.com/ankitgoyal0106/Swap-Shop/commit/291805f3099de3e26333dab1e5d2e9a16cff398c)
 
## December 10th, 2024

- **Task:** Got the images to populate from the backend to frontend
- **Details:** Stored the images as base64 instead of blobs, fixed the create item page form, and got them to render on the front-end item cards
- **Link to Commit:**
-  1. [Got images to load on explore page (took like 4 hours) ](https://github.com/ankitgoyal0106/Swap-Shop/commit/6867a31fc97e4b9a42306548dd0542ec5bc66af7)
   
