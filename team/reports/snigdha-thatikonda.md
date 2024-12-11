# Contribution Log for Snigdha Thatikonda

## October 19, 2024

- **Task**: Set up initial users.md file and worked on roles.md file.
- **Details**: Described target users of application and their specific needs.
- **Link to Commit**: [Commit on milestone2_nate](https://github.com/ankitgoyal0106/Swap-Shop/commit/5813d410a8341f2daf6ca199776fae717fa2f802)

## October 20, 2024
- Changed wording of users.md file

## October 11th-17th, 2024
- **Task** Made the Create Item Page page, which takes in all the fields for an item a seller is putting up and sends it to IndexedDB as an object so the information can be rendered in other places. 
- **Details** Fields include a unique listing ID, item name, item description, category, images, condition, price, the associated company, posting time and updated posting time, and the item's location using the geolocation API. 
- **Link to Commit** https://github.com/ankitgoyal0106/Swap-Shop/commit/d8ef419d461eea5926e1a471c73b6aad5d6ad11d

## December 1st-10th, 2024
- **Task** Created SQLLite Item Model. 
- **Detail** Used to save each item uploaded to our website; contains all the information collected in the CreateItemPage form. SQLLite Item model contains all the fields in the create item form and aligns with the data.md file. Since all of the information for each item object is together, it makes populating the item page and explore page item cards much easier. This server powers all of the item population on the site.
- **Link to Commit** https://github.com/ankitgoyal0106/Swap-Shop/commit/70b235a623e3fa8aef9eaa90d35ccbdd9fe84c34 ;

- **Task** Made and edited the ItemPage template.
- **Details** This will populate with all of the information of the selected item. This page is shown after the user submits the CreateItemPage form and whenever a user clicks on an item card in the explore page. 
- **Link to Commit** https://github.com/ankitgoyal0106/Swap-Shop/commit/4f75cb18f5c597c99be29ef55639d475a0243a28;

- **Task** Connected CreateItemPage to the Database. Linked CreateItemPage and itemPage
- **Details** The itemPage now populates with all of the information submitted on the CreateItemPage.
- **Link to Commit** There were two commits for this, a few of the fields were not uploading. 
https://github.com/ankitgoyal0106/Swap-Shop/commit/c885262d069186278079dacb3fd9abb98b459877 
AND 
https://github.com/ankitgoyal0106/Swap-Shop/commit/8aaaceaf612cf871daa6aa2f2ae4805919b93da2 

- **Task** Connected the explorePage item cards and the itemPage
- **Details** When an item card is clicked on, the user is taken to the itemPage. The itemPage now populates with all of the information for the item selected.
- **Link to Commit** https://github.com/ankitgoyal0106/Swap-Shop/commit/e80c4c8d6b4cfe868a91cedc3a60b3b8a5f4c69d ;

- **Task** Added SellerEmail attribute to the SQLLite Item Model
- **Details** Realized that when the item cards are clicked and the user is taken to the itemPage, the sellerEmail is not displaying despite it being shown on the itemPage after the item is made in the createItemPage form. Changed the SQLLite Item Model to include the seller email attribute so it would be stored properly. 
- **Link to Commit**  https://github.com/ankitgoyal0106/Swap-Shop/commit/1adfd1b8b8ac477b058ef245cf466b65b5941706 ; 
fixed some CSS with the CreateItemPage form. Supported Image Rendering 

- **Task** Several CSS changes were also made to the Item Page template and CreateItemPage form. 
- **Link to Commits** 
    https://github.com/ankitgoyal0106/Swap-Shop/commit/a919cfcb62c6f8d521d40be570e98c23f288d7ad 
    AND 
    https://github.com/ankitgoyal0106/Swap-Shop/commit/ad41a31b4cafd9bc42ab1361f4b0f039a08bed96 
    AND 
    https://github.com/ankitgoyal0106/Swap-Shop/commit/c885262d069186278079dacb3fd9abb98b459877 
    AND 
    https://github.com/ankitgoyal0106/Swap-Shop/commit/e80c4c8d6b4cfe868a91cedc3a60b3b8a5f4c69d; 


