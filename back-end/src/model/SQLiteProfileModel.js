import { Sequelize, DataTypes, UUID } from "sequelize";

//Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
});

//Define the Profile model
const Profile = sequelize.define("Profile", {
    userID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    phoneNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    college: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /*
    profilePicture: {
        type: DataTypes.TEXT,
        allowNull: true,
        get () {
            return JSON.parse(this.getDataValue('profilePicture'));
        },
        set (value) {
            this.setDataValue('profilePicture', JSON.stringify(value));
        },
    },*/
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    achievementCounts: {
        type: DataTypes.JSON,
        allowNull: true
    },
    savedListings: {
        type: DataTypes.STRING,
        allowNull: true
    },
    recentlyViewed: {
        type: DataTypes.STRING,
        allowNull: true
    },
    conversationList: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

class _SQLiteProfileModel {
    constructor() {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        // An exception will be thrown if either of these operations fail.

        if (fresh) {
            await this.delete();
        }
    }
    
    async create(profile) {
        return await Profile.create(profile);
    }

    async read(email = null) {
        if (email) {
            return await Profile.findByPk(email);
        }

        return await Profile.findAll();
    }

    //CHANGED THIS FUNCTION
    async update(profile) {
        console.log("Received profile for update:", profile);
    
        // Find the profile by email
        const profileu = await Profile.findOne({ where: { email: profile.email } });
        
        if (!profileu) {
            console.log(`No profile found with email: ${profile.email}`);
            return null;  
        }
    
        // Attempt to update the profile
        try {
            const updatedProfile = await profileu.update(profile, { returning: true });
            return updatedProfile;  // Return the updated profile
        } catch (error) {
            console.error("Error updating profile:", error);
            return null;
        }
    }
    
    
    async delete(profile = null) {
        if (profile === null) {
            await Profile.destroy({ truncate: true });
            return;
        }

        await Profile.destroy({ where: { email: profile.email } });
        return profile;
    }
}

const SQLiteProfileModel = new _SQLiteProfileModel();

export default SQLiteProfileModel;