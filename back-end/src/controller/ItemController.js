import ModelFactory from "../model/ItemModelFactory.js";

class ItemController{
    constructor(){
        ModelFactory.getModel().then((model) => {
            this.model = model;
          });
    }

    async getItem(req,res){
        const item = await this.model.read(req.body.itemID);
        res.json(item);
    }

    async getAllItemsByEmail(req, res) {
        const items = await this.model.read(null, req.params.email);
        res.json({ items });
    }

    async getAllItems(req,res){
        const items = await this.model.read();
        res.json({items});
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

    async removeItem(req,res){
        const itemID = await this.model.delete(req.params.itemID);
        res.json({ itemID });
    }
}

export default new ItemController();