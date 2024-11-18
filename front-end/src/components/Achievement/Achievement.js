import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class Achievement extends BaseComponent {
    #container = null;
    #textContent = null;

    constructor() {
        super();
        this.loadCSS('Achievement');
      }
    
    render() {
        const container = document.createElement('div');
        container.classList.add('achievements');
    
        const achievementContent = document.createElement('div');
        achievementContent.className = 'achievement-content'
        
        const badgeData = [
            { src: 'achievement-badges/welcome-badge.jpg', alt: 'Badge 1', title: 'Welcome! You made a profile' },
            { src: 'achievement-badges/list-1.png', alt: 'Badge 2', title: 'You listed one item' },
            { src: 'achievement-badges/list-10.png', alt: 'Badge 3', title: 'You listed 10 items!' },
            { src: 'achievement-badges/list-50.png', alt: 'Badge 4', title: 'WOW, you listed 50 items!' },
            { src: 'achievement-badges/sell-1.png', alt: 'Badge 5', title: 'You sold your first item' },
            { src: 'achievement-badges/sell-10.png', alt: 'Badge 6', title: 'You sold 10 items!' },
            { src: 'achievement-badges/sell-50.png', alt: 'Badge 7', title: 'Amazing! You sold 50 items' },
            { src: 'achievement-badges/view-1.png', alt: 'Badge 8', title: 'Congrats on viewing your first item!' },
            { src: 'achievement-badges/view-10.png', alt: 'Badge 9', title: 'You\'ve been busy...you viewed 10 items' },
            { src: 'achievement-badges/view-50.png', alt: 'Badge 10', title: 'Professional window shopper...you viewed 50 items' },
            { src: 'achievement-badges/easter-egg.png', alt: 'Badge 11', title: 'You Found the Easter Egg!' }
        ];
       
        badgeData.forEach(badge => {
            const img = document.createElement('img');
            img.src = badge.src;
            img.alt = badge.alt;
            img.title = badge.title;
            img.className = 'badge';
            achievementContent.appendChild(img);
        });
        
        container.appendChild(achievementContent);

        return container;
    }
}