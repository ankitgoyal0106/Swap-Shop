import InMemoryItemModel from "./InMemoryItemModel.js";
import SQLiteModel from "./SQLiteModel.js";

class _ModelFactory {
    async getModel(model = "memory"){
        if (model === "sqlite"){
            await SQLiteModel;
        } else if (model === "sqlite-fresh") {
            await SQLiteModel.init(true);
            return SQLiteModel;
        } else {
            return InMemoryItemModel;
        }
    }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;