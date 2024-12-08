import ModelFactory from "../model/ModelFactory.js";

class ItemController{
    constructor(){
        ModelFactory.getModel("sqlite").then((model) => {
            this.model = model;
          });
    }

    async getItem(req,res){
        const item = await this.model.read(req.body.itemID);
        res.json(item);
    }

    async getAllItems(req,res){
        try {
            const items = await this.model.read();
            res.status(200).json({ items });
          } catch (error) {
            console.error("Error fetching items:", error);
            res.status(500).json({ message: "Failed to fetch items" });
          }
    }

    async createItem(req,res){
        try{
            if (!req.body || !req.body.listingID) {
                return res.status(400).json({ error: "Invalid item information." });
            }        

            const item = await this.model.create(req.body);
            
            return res.status(201).json(item);
        }
        catch(e){
            return res.status(500).json({error: "Failed to create item listing. Please try again."})
        }
    }

    async updateItem(req, res) {
        try {
          const updatedItem = await this.model.update(req.body);
          res.status(200).json({ message: "Item updated successfully", item: updatedItem });
        } catch (error) {
          console.error("Error updating item:", error);
          res.status(500).json({ message: "Failed to update item" });
        }
      }
    
    async deleteItem(req,res){
        await this.model.delete(req.body.itemID);
        res.json(await this.model.read())
    }
}

export default new ItemController();