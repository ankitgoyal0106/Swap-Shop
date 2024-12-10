import ModelFactory from "../model/ChattingModelFactory.js";

class ChatController{
    constructor(){
        ModelFactory.getModel("sqlite").then((model) => {
            this.model = model;
          });
    }

    async getConvo(req,res){
        const convo = await this.model.read(req.params.convoID);
        res.json(convo);
    }

    async saveNewConvo(req,res){
        try{
            if (!req.body || !req.body.convoID) {
                return res.status(400).json({ error: "Invalid convoID." });
            }        

            const convo = await this.model.create(req.body);
            
            return res.status(201).json(convo);
        }
        catch(e){
            return res.status(500);
        }
    }

    async updateConvo(req,res){
        try{
            if (!req.body || !req.body.convoID) {
                return res.status(400).json({ error: "Invalid convoID." });
            }        

            const convo = await this.model.update(req.body);
            
            return res.status(201).json(convo);
        }
        catch(e){
            return res.status(500).json({error: "Failed to update conversation. Please try again."})
        }
    }
}

export default new ChatController();