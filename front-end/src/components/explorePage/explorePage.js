import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { getEmailFromLocalStorage } from "../../services/LocalStorage.js";


  export class explorePage extends BaseComponent {
    #container = null;
    #searchBar = null;
    #itemsGrid = null;
    #paginationControls = null;
    #recentlyViewedSection = null;
    #recommendedSection = null;

    constructor() {
        super();
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.items = [];
        this.recommendedItems = this.#getRecommendedItems();
        this.recentlyViewedItems = [];
        this.#initializeItems();
        this.eventHub = EventHub.getInstance();
        this.email = getEmailFromLocalStorage();
        this.subscribeToItemEvents();

        this.loadCSS("explorePage");
    }

    subscribeToItemEvents(){
        this.eventHub.subscribe('GetProfileSuccess', (data) => {
            this.recentlyViewedItems = JSON.parse(data.profile.recentlyViewed);
        });
    }

    render() {
        if(this.email){
            this.eventHub.publish('GetProfile', this.email);
        } 
        this.#container = document.createElement('div');
        this.#container.className = 'explore-page';

        const mainContent = document.createElement('div');
        mainContent.className = 'main-content';

        // Append items grid and recommended section to the main content container
        mainContent.appendChild(this.#createFilterSection());
        mainContent.appendChild(this.#createItemsGrid());
        mainContent.appendChild(this.#createRecommendedSection());

        // Append each part to the main container
        this.#container.appendChild(this.#createTitle());
        this.#container.appendChild(this.#createSearchBar());
        this.#container.appendChild(mainContent);
        this.#container.appendChild(this.#createPaginationControls());
        this.#container.appendChild(this.#createRecentlyViewedSection());

        // Initial display of items
        this.#displayItems(this.currentPage);

        return this.#container;
    }

    async handleViewItem(data){
        await this.updateReventlyViewed(data);
    }

    async updateReventlyViewed(itemData){
        try {
            //Fetch current profile
            const response = await fetch(`http://localhost:3000/v1/profile/${this.email}`);
            if (!response.ok) {
                throw new Error("Profile not found");
            }

            const profileData = await response.json();
            const recents = profileData.profile.recentlyViewed;
            let recentlyViewed;
            if(recents === "[]"){
                recentlyViewed = [];
            }else{
                recentlyViewed = JSON.parse(recents);
                console.log(recentlyViewed);
            }

            // Add item to recently viewed
            recentlyViewed.unshift(itemData);
            if(recentlyViewed.length > 5){
                recentlyViewed.pop();
            }

            recentlyViewed = JSON.stringify(recentlyViewed);

            const updatedProfileData = {
                ...profileData.profile,
                recentlyViewed,
            };

            const putResponse = await fetch(`http://localhost:3000/v1/edit-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',  
                },
                body: JSON.stringify(updatedProfileData),
            });

            if(!putResponse.ok){
                throw new Error("Failed to update profile");
            }

            const updatedData = await putResponse.json();
        } catch (error){
            console.error("Error adding to recently viewed:", error);
        }
    }

    #createTitle() {
        const title = document.createElement('h1');
        title.className = 'explore-title';
        title.textContent = 'Explore Page!';
        return title;
    }

    #createSearchBar() {
        this.#searchBar = document.createElement('div');
        this.#searchBar.className = 'search-bar';

        // Category dropdown
        const categoryDropdown = document.createElement('select');
        categoryDropdown.className = 'category-dropdown';
        const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Furniture', 'IClicker'];

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.toLowerCase();
            option.textContent = category;
            categoryDropdown.appendChild(option);
        });

        // Search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search items...';

        // Search button
        const searchButton = document.createElement('button');
        searchButton.textContent = 'Search';
        searchButton.addEventListener('click', () => this.#updateItemsGrid());

        this.#searchBar.append(categoryDropdown, searchInput, searchButton);
        return this.#searchBar;
    }

    #createItemsGrid() {
        this.#itemsGrid = document.createElement('div');
        this.#itemsGrid.className = 'items-grid';
        return this.#itemsGrid;
    }

    #updateItemsGrid() {
        const category = this.#searchBar.querySelector('.category-dropdown').value;
        const searchQuery = this.#searchBar.querySelector('input').value.toLowerCase();

        const filteredItems = this.items.filter(item => {
            return (item.itemName.toLowerCase().includes(searchQuery) ||
                item.itemDescription.toLowerCase().includes(searchQuery)) &&
                (category === 'all' || item.category.toLowerCase() === category);
        });

        this.#displayFilteredItems(filteredItems); // Use a separate method to display filtered items
    }

    #displayFilteredItems(filteredItems) {
        this.#itemsGrid.innerHTML = '';
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedItems = filteredItems.slice(start, end);

        paginatedItems.forEach(item => {
            const itemCard = this.#createItemCard(item);
            this.#itemsGrid.appendChild(itemCard);
        });
    }

    #createPaginationControls() {
        this.#paginationControls = document.createElement('div');
        this.#paginationControls.className = 'pagination-controls';

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = this.currentPage === 1;
        prevButton.addEventListener('click', () => this.#handlePrevButton());

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = this.items.length <= this.itemsPerPage;
        nextButton.addEventListener('click', () => this.#handleNextButton());

        this.#paginationControls.append(prevButton, nextButton);
        return this.#paginationControls;
    }

    #createRecentlyViewedSection() {
        this.#recentlyViewedSection = document.createElement('div');
        this.#recentlyViewedSection.className = 'recently-viewed-section';

        const recentlyViewedTitle = document.createElement('h2');
        recentlyViewedTitle.textContent = 'Recently Viewed';

        const recentlyViewedContainer = document.createElement('div');
        recentlyViewedContainer.className = 'recently-viewed-container';

        this.recentlyViewedItems.forEach(item => {
            const itemCard = this.#createItemCard(item);
            recentlyViewedContainer.appendChild(itemCard);
        });
        
        this.#recentlyViewedSection.append(recentlyViewedTitle, recentlyViewedContainer);
        return this.#recentlyViewedSection;
    }

    #createItemCard(item) {
      const itemCard = document.createElement('div');
      itemCard.className = 'item-card';
  
      const itemTitle = document.createElement('h2');
      itemTitle.textContent = item.itemName;
      itemCard.appendChild(itemTitle);
      itemCard.addEventListener('click', () => { 
        console.log('Clicked on item:', item.itemName); 
        const hub = EventHub.getInstance();
        hub.publish('SwitchToItemPage', item);
        this.handleViewItem(item);
        return item.ListingID;
      }); 

      const img = document.createElement('img');
      
      img.src = item.images;
      img.alt = item.itemName || 'Item Image';
      img.className = 'item-image';
      itemCard.appendChild(img);
    
      const itemDescription = document.createElement('p');
      itemDescription.textContent = item.itemDescription;
      itemCard.appendChild(itemDescription);
  
      return itemCard;
    }

    #createRecommendedSection() {
        this.#recommendedSection = document.createElement('div');
        this.#recommendedSection.className = 'recommended-section';

        const recommendedTitle = document.createElement('h2');
        recommendedTitle.textContent = 'Recommended';
        recommendedTitle.className = 'recommended-title';

        const recommendedContainer = document.createElement('div');
        recommendedContainer.className = 'recommended-container';

        this.recommendedItems.forEach(item => {
            const itemCard = this.#createItemCard(item);
            recommendedContainer.appendChild(itemCard);
        });

        this.#recommendedSection.append(recommendedTitle, recommendedContainer);
        return this.#recommendedSection;
    }

    #createFilterSection() {
        const filterSection = document.createElement('div');
        filterSection.className = 'filter-section';

        const filterTitle = document.createElement('h2');
        filterTitle.textContent = 'Filters';

        // Price Range Filter
        const priceFilterContainer = this.#createCollapsibleFilter(
            'Price Range',
            () => {
                const minPriceInput = document.createElement('input');
                minPriceInput.type = 'number';
                minPriceInput.placeholder = 'Min';

                const maxPriceInput = document.createElement('input');
                maxPriceInput.type = 'number';
                maxPriceInput.placeholder = 'Max';

                const container = document.createElement('div');
                container.className = 'filter-options';
                container.append(minPriceInput, maxPriceInput);
                return container;
            }
        );

        // Condition Filter
        const conditionFilterContainer = this.#createCollapsibleFilter(
            'Condition',
            () => {
                const conditionSelect = document.createElement('select');
                const conditions = ['Any', 'New', 'Used'];
                conditions.forEach(condition => {
                    const option = document.createElement('option');
                    option.value = condition.toLowerCase();
                    option.textContent = condition;
                    conditionSelect.appendChild(option);
                });

                const container = document.createElement('div');
                container.className = 'filter-options';
                container.appendChild(conditionSelect);
                return container;
            }
        );

        // Apply Filters Button
        const applyFiltersButton = document.createElement('button');
        applyFiltersButton.textContent = 'Apply Filters';
        applyFiltersButton.className = 'apply-filters-button';
        applyFiltersButton.addEventListener('click', () => this.#applyFilters());

        // Append all filters to the section
        filterSection.append(filterTitle, priceFilterContainer, conditionFilterContainer);
        // Append the apply filters button to the filter section
        filterSection.appendChild(applyFiltersButton);
        return filterSection;
    }

    #applyFilters() {
        let lowPrice = this.#container.querySelector('.filter-section .filter-content .filter-options input:nth-child(1)').value;
        let highPrice = this.#container.querySelector('.filter-section .filter-content .filter-options input:nth-child(2)').value;
        const condition = this.#container.querySelector('.filter-section .filter-content .filter-options select').value;
        if (lowPrice === '') {
            lowPrice = 0;
        }
        if (highPrice === '') {
            highPrice = Infinity;
        }
        for (let i = 0; i < filteredItems.length; i++) {
            console.log(filteredItems[i].price, lowPrice, highPrice, condition, filteredItems[i].condition);
            if (filteredItems[i].price < lowPrice || filteredItems[i].price > highPrice || (condition !== 'any' && filteredItems[i].condition !== condition)) {
                filteredItems.splice(i, 1);
                i--;
            }
        }
        this.#displayFilteredItems(filteredItems);
    }

    // Helper function to create a collapsible filter
    #createCollapsibleFilter(title, contentGenerator) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'collapsible-filter';

        const filterButton = document.createElement('button');
        filterButton.className = 'filter-button';
        filterButton.textContent = title;
        filterButton.onclick = () => {
            filterContent.classList.toggle('hidden');
        };

        const filterContent = document.createElement('div');
        filterContent.className = 'filter-content hidden';
        filterContent.appendChild(contentGenerator());

        filterContainer.append(filterButton, filterContent);
        return filterContainer;
    }

    #displayItems(page) {
        this.#itemsGrid.innerHTML = '';
        const start = (page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedItems = this.items.slice(start, end);

        paginatedItems.forEach(item => {
            const itemCard = this.#createItemCard(item);
            this.#itemsGrid.appendChild(itemCard);
        });
    }

    #handlePrevButton() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.#displayItems(this.currentPage);
            this.#paginationControls.querySelector('button:nth-child(1)').disabled = this.currentPage === 1;
            this.#paginationControls.querySelector('button:nth-child(2)').disabled = false;
        }
    }

    #handleNextButton() {
        if (this.currentPage * this.itemsPerPage < this.items.length) {
            this.currentPage++;
            this.#displayItems(this.currentPage);
            this.#paginationControls.querySelector('button:nth-child(1)').disabled = false;
            this.#paginationControls.querySelector('button:nth-child(2)').disabled = this.currentPage * this.itemsPerPage >= this.items.length;
        }
    }

    async #initializeItems() {
        try {
            this.items = await this.#getItems(); // Fetch items
            if (!Array.isArray(this.items)) {
                throw new Error("Fetched items is not an array");
            }
            this.#displayItems(this.currentPage); // Display items only after fetching
        } catch (error) {
            console.error("Error initializing items:", error);
            this.items = []; // Fallback to an empty array
        }
    }

    async #getItems() {
        try {
            const response = await fetch('http://localhost:3000/v1/items'); // Update the URL to match your backend route
            if (!response.ok) {
                throw new Error('Failed to fetch items from the backend');
            }
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('Error fetching items:', error);
            return [];
        }
    }

    #getRecommendedItems() {
        return [];
    }
        
}