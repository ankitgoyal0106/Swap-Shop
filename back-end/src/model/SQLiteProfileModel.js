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
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
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
    profilePicture: {
        type: DataTypes.OBJECT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    achievements: {
        type: DataTypes.ARRAY(DataTypes.OBJECT),
        allowNull: true
    },
    savedListings: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    recentlyViewed: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    conversationList: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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

            //Just a test to see that it actually works
            await this.create({
                name: "John Doe",
                email: "example@umass.edu",
                phoneNo: "123-456-7890",
                college: "University of Massachusetts Amherst",
                password: "password",
                profilePicture: {
                    "lastModified": 1663869395816,
                    "lastModifiedDate": "Thu Sep 22 2022 13:56:35 GMT-0400 (Eastern Daylight Time)",
                    "name": "Data types.jpg",
                    "size": 113745,
                    "type": "image/jpeg",
                    "webkitRelativePath": ""
                },
                createdAt: new Date(),
                updatedAt: new Date(),
                achievements: [{"Title": "Signed Up!", "Description": "You signed up for the app!", "ID": 0, "Date": new Date()}],
                savedListings: [crypto.randomUUID()],
                recentlyViewed: [crypto.randomUUID()],
                conversationList: [crypto.randomUUID()]
            });
        }
    }
    
    async create(profile) {
        return await Profile.create(profile);
    }

    async read(userID = null) {
        if (userID) {
            return await Profile.findByPk(userID);
        }

        return await Profile.findAll();
    }

    async update(profile) {
        const profileu = await Profile.findByPk(profile.userID);
        if (!profileu) {
            return null;
        }

        await profileu.update(profile);
        return profileu;
    }

    async delete(profile = null) {
        if (profile === null) {
            await Profile.destroy({ truncate: true });
            return;
        }

        await Profile.destroy({ where: { userID: profile.userID } });
        return profile;
    }
}

const SQLiteProfileModel = new _SQLiteProfileModel();

export default SQLiteProfileModel;