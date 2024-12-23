import InMemoryItemModel from "./InMemoryItemModel.js";
import SQLiteItemModel from "./SQLiteItemModel.js";

class _ModelFactory {
    async getModel(model = "sqlite"){
        if (model === "sqlite"){
            return SQLiteItemModel;
        } else if (model === "sqlite-fresh") {
            await SQLiteItemModel.init(true);
            return SQLiteItemModel;
        } else {
            return InMemoryItemModel;
        }
    }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;