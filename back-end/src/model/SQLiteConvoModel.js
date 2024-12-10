import { Sequelize, DataTypes, UUID } from "sequelize";

//Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
});
//Define the Item model
const Conversation = sequelize.define("Conversation", {
    convoID: {//unique ID for a chatroom
        type: DataTypes.STRING,
        //defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    groupName: { //name of chatroom
        type: DataTypes.STRING,
        allowNull: false
    },
    groupMembers: { //list of participants
        type: DataTypes.STRING,
        allowNull: false
    },
    msgLog: { //array containing {name:, msg:} objects that represent messages sent between users
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

class _SQLiteConvoModel {
    constructor() {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        // An exception will be thrown if either of these operations fail.

        if (fresh) {
            await this.delete();

            // Test to
            // await this.create(
            // {
            //     convoID: "1",
            //     groupName: `hang out group`,
            //     groupMembers: "[`example@umass.edu`, `jim`]",
            //     msgLog: "[{name:`example@umass.edu`, msg:`hello`}, {name:`jim`, msg:`hi`}]"
            // }
            // );
        }
    }
    
    async create(Convo) {
        return await Conversation.create(Convo);
    }

    async read(convoID = null) {
        if (convoID) {
            return await Conversation.findByPk(convoID);
        }

        return await Conversation.findAll(); //throw error?
    }

    async update(Convo) {
        const convo_update = await Conversation.findByPk(Convo.convoID);
        if (!convo_update) {
            return null;
        }

        await convo_update.update(Convo);
        return convo_update;
    }

    async delete(Convo = null) {
        if (Convo === null) {
            await Conversation.destroy({ truncate: true });
            return;
        }

        await Conversation.destroy({ where: { convoID: Convo.convoID } });
        return Convo;
    }
}

const SQLiteConvoModel = new _SQLiteConvoModel();

export default SQLiteConvoModel;