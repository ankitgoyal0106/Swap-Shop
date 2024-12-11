import SQLiteProfileModel from "./SQLiteProfileModel.js";

class _ProfileModelFactory {
    async getModel(model = "sqlite"){
        if (model === "sqlite"){
            return SQLiteProfileModel;
        } else if (model === "sqlite-fresh") {
            await SQLiteProfileModel.init(true);
            return SQLiteProfileModel;
        } else {
            return;
        }
    }
}

const ProfileModelFactory = new _ProfileModelFactory();
export default ProfileModelFactory;