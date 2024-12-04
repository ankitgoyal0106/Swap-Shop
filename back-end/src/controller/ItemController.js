import ModelFactory from "../model/ModelFactory.js";

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

    async getAllItems(req,res){
        const items = await this.model.read();
        res.json({items});
    }

    async createItem(req,res){
        try{
            if (!req.body || !req.body.itemID) {
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
        await this.model.delete(req.body.itemID);
        res.json(await this.model.read())
    }
}

export default new ItemController();