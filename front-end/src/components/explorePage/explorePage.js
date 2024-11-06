import { BaseComponent } from "../BaseComponent/BaseComponent.js";

document.addEventListener('DOMContentLoaded', function() {
    const explorePage = new ExplorePageComponent();
    document.body.appendChild(explorePage.render());
  });
  
  export class explorePage extends BaseComponent {
    #container = null;
    #navBar = null;
    #searchBar = null;
    #itemsGrid = null;
    #paginationControls = null;
    #recentlyViewedSection = null;
  
    constructor() {
    super();
      this.currentPage = 1;
      this.itemsPerPage = 12;
      this.items = this.#getItems();
      this.recentlyViewedItems = this.#getRecentlyViewedItems();
      this.loadCSS("explorePage");
    }
  
    render() {
      this.#container = document.createElement('div');
      this.#container.className = 'explore-page';
  
      // Append each part to the main container
      this.#container.appendChild(this.#createTitle());
      this.#container.appendChild(this.#createSearchBar());
      this.#container.appendChild(this.#createItemsGrid());
      this.#container.appendChild(this.#createPaginationControls());
      this.#container.appendChild(this.#createRecentlyViewedSection());
  
      // Initial display of items
      this.#displayItems(this.currentPage);
  
      return this.#container;
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
  
      this.#searchBar.append(categoryDropdown, searchInput, searchButton);
      return this.#searchBar;
    }
  
    #createItemsGrid() {
      this.#itemsGrid = document.createElement('div');
      this.#itemsGrid.className = 'items-grid';
      return this.#itemsGrid;
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
  
      return itemCard;
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
  
    #getItems() {
      return [
        { src: '', title: 'Item 1', description: 'Description for item 1' },
        // Add other items...
      ];
    }
  
    #getRecentlyViewedItems() {
      return [
        { src: '', title: 'Recently Viewed 1', description: 'Description for recently viewed item 1' },
        // Add other recently viewed items...
      ];
    }
  }