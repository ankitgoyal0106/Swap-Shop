import { ProfileRepositoryService } from "./ProfileRepositoryService.js";
import { ProfileRepoRemoteService } from "./ProfileRepoRemoteService.js";

/**
 * Factory class to create instances of profile repository services.
 *
 * This class provides a static method to get an appropriate instance
 * of a profile repository service based on the specified repository type.
 * It cannot be instantiated.
 */
export class ProfileRepoFactory {
  constructor() {
    throw new Error("Cannot instantiate a ProfileRepoFactory object");
  }

  static get(repoType = "remote") {
    if (repoType === "local") {
      return new ProfileRepositoryService();
    } else if (repoType === "remote") {
      return new ProfileRepoRemoteService();
    } else {
      throw new Error("Invalid repository type");
    }
  }
}
