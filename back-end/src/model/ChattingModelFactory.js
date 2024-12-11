import InMemoryItemModel from "./InMemoryItemModel.js";
import SQLiteConvoModel from "./SQLiteConvoModel.js";

class _ModelFactory {
    async getModel(model = "sqlite"){
        if (model === "sqlite"){
            return SQLiteConvoModel;
        } else if (model === "sqlite-fresh") {
            await SQLiteConvoModel.init(true);
            return SQLiteConvoModel;
        } else {
            return InMemoryItemModel;
        }
    }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;