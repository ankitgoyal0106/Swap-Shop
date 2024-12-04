
import { Sequelize, DataTypes, UUID } from "sequelize";

//Initialize a new Sequelize instance with SQLite

import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
});

//Define the Item model
const Item = sequelize.define("Item", {
    listingID: {


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

        type: DataTypes.TEXT,

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

        allowNull: false

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

        await sequelize.sync({ force: true });

        await sequelize.sync({ force: fresh });

        // An exception will be thrown if either of these operations fail.

        if (fresh) {
            await this.delete();


            // Test to see if it works
            await this.create(
            {
                listingID: '1',
                itemName: 'Mock Electronic',
                itemDescription: 'Description for item 2',
                category: 'Electronics',
                price: 100.0,
                postedAt: new Date('2023-01-01T10:00:00Z'),
                itemLocation: 'Location A',
                images: ['img1.jpg', 'img2.jpg'],
                amountAvailable: 10,
                updatedAt: new Date('2023-01-02T10:00:00Z')
            }
            );
        }
    }
    

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


    async read(listingID = null) {
        if (listingID) {
            return await Item.findByPk(listingID);

    async read(itemID = null) {
        if (itemID) {
            return await Item.findByPk(itemID);

        }

        return await Item.findAll();
    }

    async update(item) {

        const item_update = await Item.findByPk(item.userID);
        if (!item_update) {
            return null;
        }
        
        await item_update.update(item);
        return item_update;

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


        await Item.destroy({ where: { listingID: item.userID } });

        await Item.destroy({ where: { itemID: item.itemID } });

        return item;
    }
}

const SQLiteItemModel = new _SQLiteItemModel();

export default SQLiteItemModel;