import ModelFactory from "../model/ModelFactory.js";

class ProfileController{
    constructor(){
        ModelFactory.getModel().then((model) => {
            this.model = model;
        });
    }

    async getProfile(req,res){
        const profile = await this.model.read(req.body.email);//get profile for specific email
        res.json({profile});
    }

    async createProfile(req,res){
        try{
            if (!req.body || !req.body.email) {
                return res.status(400).json({ error: "Invalid profile information." });
            }        

            const profile = await this.model.create(req.body);
            
            return res.status(201).json(profile);
        }
        catch(e){
            return res.status(500).json({error: "Failed to create profile. Please try again."})
        }
    }

    async editProfile(req,res){
        try{
            if(!req.body || !req.body.email){
                return res.status(400).json({ error: "Invalid profile information." });
            }

            const profile = await this.model.update(profile);

            res.status(201).json(profile);
        }
        catch(e){
            return res.status(500).json({error: "Failed to update profile. Please try again."})
        }
    }

    async deleteProfile(req,res){
        await this.model.delete(req.body);
        res.status(201).json("Profile Deleted"); //TODO: find a way to let client know that profile has been deleted
    }

}

export default new ProfileController();