import { Sequelize, DataTypes, UUID } from "sequelize";

//Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
});
//Define the Item model
const Conversation = sequelize.define("Conversation", {
    convoID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    groupName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    groupMembers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    msgLog: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false
    }
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
            await this.create(
            {
                groupName: `hang out group`,
                groupMembers: [`john`, `jim`],
                msgLog: [{name:`john`, msg:`hello`}, {name:`jim`, msg:`hi`}]
            }
            );
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