

document.addEventListener('DOMContentLoaded', function() {
    // Add the nav bar when its made
    const navBar = document.createElement('div');
    navBar.className = 'nav-bar';
    
    // Create the explore page and title
    const explorePage = document.createElement('div');
    explorePage.className = 'explore-page';

    const title = document.createElement('h1');
    title.className = 'explore-title';
    title.textContent = 'Explore Page!';  
    explorePage.appendChild(title);

    // Create the search bar with search input, search button, and category dropdown
    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar';

    // Create the category dropdown filter to go first 
    const categoryDropdown = document.createElement('select');
    categoryDropdown.className = 'category-dropdown';
    const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Furniture', 'IClicker'];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });

    searchBar.appendChild(categoryDropdown);

    // Create the search input and search button
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search items...';
    searchBar.appendChild(searchInput);
     
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchBar.appendChild(searchButton);

    // Create the items grid
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
        { src: '', title: 'Item 9', description: 'Description for item 9' },
        { src: '', title: 'Item 10', description: 'Description for item 10' },
        { src: '', title: 'Item 11', description: 'Description for item 11' },
        { src: '', title: 'Item 12', description: 'Description for item 12' },
        { src: '', title: 'Item 13', description: 'Description for item 13' },
        { src: '', title: 'Item 14', description: 'Description for item 14' },
        { src: '', title: 'Item 15', description: 'Description for item 15' },
        { src: '', title: 'Item 16', description: 'Description for item 16' },
        { src: '', title: 'Item 17', description: 'Description for item 17' },
        { src: '', title: 'Item 18', description: 'Description for item 18' },
        { src: '', title: 'Item 19', description: 'Description for item 19' }
        // Add more items as needed
    ];
    
    // Displaying the item grid, and adding pagination controls to limit each page to 10 items
    let currentPage = 1;
    const itemsPerPage = 12;

    function displayItems(page) {
        itemsGrid.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = items.slice(start, end);

        paginatedItems.forEach(item => {
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
    }

    // Create pagination buttons
    const paginationControls = document.createElement('div');
    paginationControls.className = 'pagination-controls';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayItems(currentPage);
            nextButton.disabled = false;
            if (currentPage === 1) {
                prevButton.disabled = true;
            }
        }
    });
    paginationControls.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = items.length <= itemsPerPage;
    nextButton.addEventListener('click', () => {
        if (currentPage * itemsPerPage < items.length) {
            currentPage++;
            displayItems(currentPage);
            prevButton.disabled = false;
            if (currentPage * itemsPerPage >= items.length) {
                nextButton.disabled = true;
            }
        }
    });
    paginationControls.appendChild(nextButton);
    // Initial display of items
    displayItems(currentPage);

    // Create the recently viewed section
    const recentlyViewedSection = document.createElement('div');
    recentlyViewedSection.className = 'recently-viewed-section';

    const recentlyViewedTitle = document.createElement('h2');
    recentlyViewedTitle.textContent = 'Recently Viewed';
    recentlyViewedSection.appendChild(recentlyViewedTitle);

    const recentlyViewedContainer = document.createElement('div');
    recentlyViewedContainer.className = 'recently-viewed-container';

    // Sample recently viewed items
    const recentlyViewedItems = [
        { src: '', title: 'Recently Viewed 1', description: 'Description for recently viewed item 1' },
        { src: '', title: 'Recently Viewed 2', description: 'Description for recently viewed item 2' },
        { src: '', title: 'Recently Viewed 3', description: 'Description for recently viewed item 3' },
        { src: '', title: 'Recently Viewed 4', description: 'Description for recently viewed item 4' },
        { src: '', title: 'Recently Viewed 5', description: 'Description for recently viewed item 5' },
        { src: '', title: 'Recently Viewed 6', description: 'Description for recently viewed item 6' },
        { src: '', title: 'Recently Viewed 7', description: 'Description for recently viewed item 7' }
        // Add more recently viewed items as needed
    ];

    // Display recently viewed items in the container
    recentlyViewedItems.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'recently-viewed-item-card';

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        itemCard.appendChild(img);

        const itemTitle = document.createElement('h3');
        itemTitle.textContent = item.title;
        itemCard.appendChild(itemTitle);

        const itemDescription = document.createElement('p');
        itemDescription.textContent = item.description;
        itemCard.appendChild(itemDescription);

        recentlyViewedContainer.appendChild(itemCard);
    });

    recentlyViewedSection.appendChild(recentlyViewedContainer);

    // Append all elements to the explorePage
    explorePage.appendChild(navBar);
    explorePage.appendChild(searchBar);
    explorePage.appendChild(itemsGrid);
    explorePage.appendChild(paginationControls);
    explorePage.appendChild(recentlyViewedSection);

    // Append explorePage to the body
    document.body.appendChild(explorePage);
});