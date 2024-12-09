import { Sequelize, DataTypes, UUID } from "sequelize";

//Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
});
//Define the Item model
const Item = sequelize.define("Item", {
    listingID: {
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
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    condition: {
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
        type: DataTypes.TEXT,
        allowNull: false,
        get () {
            return JSON.parse(this.getDataValue('images'));
        },
        set (value) {
            this.setDataValue('images', JSON.stringify(value));
        },
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
        // An exception will be thrown if either of these operations fail.

        if (fresh) {
            await this.delete();

            // Test to
            await this.create(
            {
                listingID: '1',
                itemName: 'Mock Electronic',
                itemDescription: 'Description for item 2',
                category: 'Electronics',
                price: 100.0,
                condition: 'New',
                postedAt: new Date('2023-01-01T10:00:00Z'),
                itemLocation: 'Location A',
                images: ['img1.jpg', 'img2.jpg'],
                amountAvailable: 10,
                updatedAt: new Date('2023-01-02T10:00:00Z')
            }
            );
        }
    }
    
    async create(item) {
        return await Item.create(item);
    }

    async read(listingID = null) {
        if (listingID) {
            return await Item.findByPk(listingID);
        }

        return await Item.findAll();
    }

    async update(item) {
        const item_update = await Item.findByPk(item.listingID);
        if (!item_update) {
            return null;
        }

        await item_update.update(item);
        return item_update;
    }

    async delete(item = null) {
        if (item === null) {
            await Item.destroy({ truncate: true });
            return;
        }

        await Item.destroy({ where: { listingID: item.listingID } });
        return item;
    }
}

const SQLiteItemModel = new _SQLiteItemModel();

export default SQLiteItemModel;