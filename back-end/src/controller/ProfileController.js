import ProfileModelFactory from "../model/ProfileModelFactory.js";

class ProfileController{
    constructor(){
        ProfileModelFactory.getModel("sqlite").then((model) => {
            this.model = model;
        });
    }

    async getProfile(req,res){
        // let profile = null;
        // setTimeout(async() => profile = await this.model.read(req.params.email), 5000);//get profile for specific email
        // if(profile !== null){
        //     return res.status(201).json({profile});
        // }
        // res.status(400).ok(false);
        const profile = await this.model.read(req.params.email);//get profile for specific email
        res.json({profile});
    }

    async getAllProfiles(_req, res) {
        const profiles = await this.model.read();
        res.json( { profiles } );
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

            const profile = await this.model.update(req.body);

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