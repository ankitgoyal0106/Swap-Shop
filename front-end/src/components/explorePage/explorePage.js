document.addEventListener('DOMContentLoaded', function() {
    const navBar = document.createElement('div');
    navBar.className = 'nav-bar';
    
    const explorePage = document.createElement('div');
    explorePage.className = 'explore-page';

    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search items...';
    searchBar.appendChild(searchInput);

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchBar.appendChild(searchButton);

    const title = document.createElement('h1');
    title.className = 'explore-title';
    title.textContent = 'Explore Page!';
    
    explorePage.appendChild(title);

    const itemsGrid = document.createElement('div');
    itemsGrid.className = 'items-grid';

    // Need to fetch items from the backend
    const items = [
        { src: '', title: 'Item 1', description: 'Description for item 1' },
        { src: '', title: 'Item 2', description: 'Description for item 2' },
        { src: '', title: 'Item 3', description: 'Description for item 3' },
        { src: '', title: 'Item 4', description: 'Description for item 4' },
        { src: '', title: 'Item 5', description: 'Description for item 5' },
        { src: '', title: 'Item 6', description: 'Description for item 6' },
        { src: '', title: 'Item 7', description: 'Description for item 7' },
        { src: '', title: 'Item 8', description: 'Description for item 8' },
        { src: '', title: 'Item 9', description: 'Description for item 9' }
        // Add more items as needed
    ];
   
    // Display items in the grid
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        itemCard.appendChild(img);

        const itemTitle = document.createElement('h2');
        itemTitle.textContent = item.title;
        itemCard.appendChild(itemTitle);

        const itemDescription = document.createElement('p');
        itemDescription.textContent = item.description;
        itemCard.appendChild(itemDescription);

        itemsGrid.appendChild(itemCard);
    });

    // append all elements to the body

    // Append all elements to the explorePage
    explorePage.appendChild(navBar);
    explorePage.appendChild(searchBar);
    explorePage.appendChild(itemsGrid);

    // Append explorePage to the body
    document.body.appendChild(explorePage);
});