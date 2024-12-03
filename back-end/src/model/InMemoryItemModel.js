// This is a simple model that stores items in memory. It has methods to create,
// read, update, and delete items. The items are stored in an array, and the
// methods manipulate this array to perform the CRUD operations.
//
// This model is useful for prototyping and testing, as it provides a quick way
// to store and manipulate data without the need for a persistent database. It
// can be easily replaced with a more sophisticated database model when needed.
class _InMemoryItemModel {
    static itemid = 1;
    
    constructor() {
      this.items = [];
    }
  
    async create(item) {
      item.id = _InMemoryItemModel.itemid++;
      this.items.push(item);
      return item;
    }
  
    async read(id = null) {
      if (id) {
        return this.items.find((item) => item.id === id);
      }
  
      return this.items;
    }
  
    async update(item) {
      const index = this.items.findIndex((i) => i.id === item.id);
      this.items[index] = item;
      return item;
    }
  
    async delete(item = null) {
      if (item === null) {
        this.items = [];
        return;
      }
  
      const index = this.items.findIndex((i) => i.id === item.id);
      this.items.splice(index, 1);
      return items;
    }
  }
  
  // Create a singleton instance of the InMemoryTaskModel.
  const InMemoryItemModel = new _InMemoryItemModel();
  
  // Initialize the model with some sample items.
  InMemoryItemModel.create({
    ListingID: '1',
    itemName: 'Mock Electronic',
    itemDescription: 'Description for item 2',
    category: 'Electronics',
    price: 100.0,
    postedAt: new Date('2023-01-01T10:00:00Z'),
    itemLocation: 'Location A',
    images: ['img1.jpg', 'img2.jpg'],
    amountAvailable: 10,
    updatedAt: new Date('2023-01-02T10:00:00Z')
  });
  
  export default InMemoryItemModel;
  