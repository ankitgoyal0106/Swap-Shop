import InMemoryItemModel from "./InMemoryItemModel.js";
import SQLiteModel from "./SQLiteItemModel.js";

class _ModelFactory {
    async getModel(model = "sqlite"){
        if (model === "sqlite"){
            return SQLiteModel;
        } else if (model === "sqlite-fresh") {
            await SQLiteItemModel.init(true);
            return SQLiteModel;
        } else {
            return InMemoryModel;
        }
    }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;