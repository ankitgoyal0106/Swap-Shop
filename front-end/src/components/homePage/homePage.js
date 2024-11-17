import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class homeComponent extends BaseComponent {
  #container = null;
  #textContent = null;

  constructor() {
    super();
    this.loadCSS('homePage'); 
  }

  render() {
    this.#container = document.createElement('div');
    this.#container.className = 'home-page';

    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    
    mainContent.appendChild(this.#createTextSection());

    this.#container.appendChild(mainContent);

    return this.#container;
  }

  #createTextSection() {
    this.#textContent = document.createElement('div');
    this.#textContent.className = 'text-content';

    const header = document.createElement('h2');
    header.textContent = 'Welcome to SwapShop';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Are you a college student looking for a place to sell your items? Or maybe you are a student looking to find cheap and gently used items on or near campus? Then SwapShop is for you. SwapShop is a community-driven platform designed for students to buy and sell homemade products or gently used items. Whether you are looking to declutter your dorm room, find affordable textbooks, or sell your handcrafted goods, SwapShop connects college students with others on or near campus. It is the perfect place to discover great deals, support fellow students, and make sustainable choices—all within your campus community.';


    const galleryTitle = document.createElement('h3');
    galleryTitle.textContent = 'View our gallery';

    const imagePaths = [
      'images/sushi.jpeg', 
      'images/containers.jpeg', 
      'images/farmers-market.jpeg'
    ]; 

    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    imagePaths.forEach(imagePath => {
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = 'Gallery Image';
      img.className = 'gallery-image';
      imageContainer.appendChild(img);
    });

    const testimonialTitle = document.createElement('h3');
    testimonialTitle.textContent = 'User Testimonials';

    const testimonial1 = document.createElement('p');
    testimonial1.textContent = 'SwapShop has been very helpful for me! I\'ve been able to sell a bunch of old clothes that I never wear and make money! The platform is easy to use and it allows me to easily find other students who want to find items like mine! -John L.'
    testimonial1.style.fontStyle = 'italic';

    const testimonial2 = document.createElement('p');
    testimonial2.textContent = 'SwapShop helped me find some really great deals on gently used furniture and electronics. The best part is that everything is local, so I can pick it up in person and save on shipping. -Cathy S.'
    testimonial2.style.fontStyle = 'italic';

    const testimonial3 = document.createElement('p');
    testimonial3.textContent = 'I’m new to campus, and SwapShop has made it so easy for me to find everything I need—whether it’s a desk for my dorm, some textbooks, or even decorations to make my room feel more like home. I’ve been able to save so much money, and it’s all thanks to other students who are selling their stuff at such reasonable prices. I highly recommend SwapShop to all my friends! - Karen S.'
    testimonial3.style.fontStyle = 'italic';

    this.#textContent.appendChild(header);
    this.#textContent.appendChild(paragraph);
    this.#textContent.appendChild(galleryTitle);
    this.#textContent.appendChild(imageContainer);
    this.#textContent.appendChild(testimonialTitle);
    this.#textContent.appendChild(testimonial1);
    this.#textContent.appendChild(testimonial2);
    this.#textContent.appendChild(testimonial3);

    return this.#textContent;
  }
}
