import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
});

// Define the Item model
const Item = sequelize.define("Item", {
    itemID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    itemDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    postedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    itemLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    amountAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

class _SQLiteItemModel {
    constructor() {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: fresh });
        // An exception will be thrown if either of these operations fail.

        if (fresh) {
            await this.delete();

            // Just a test to see that it actually works
            await this.create({
                itemName: "Sample Item",
                itemDescription: "Description for sample item",
                category: "Furniture",
                price: 50.0,
                postedAt: new Date(),
                itemLocation: "Sample Location",
                images: ["img1.jpg", "img2.jpg"],
                amountAvailable: 10,
                updatedAt: new Date()
            });
        }
    }

    async create(item) {
        return await Item.create(item);
    }

    async read(itemID = null) {
        if (itemID) {
            return await Item.findByPk(itemID);
        }

        return await Item.findAll();
    }

    async update(item) {
        const itemu = await Item.findByPk(item.itemID);
        if (!itemu) {
            return null;
        }

        await itemu.update(item);
        return itemu;
    }

    async delete(item = null) {
        if (item === null) {
            await Item.destroy({ truncate: true });
            return;
        }

        await Item.destroy({ where: { itemID: item.itemID } });
        return item;
    }
}

const SQLiteItemModel = new _SQLiteItemModel();

export default SQLiteItemModel;