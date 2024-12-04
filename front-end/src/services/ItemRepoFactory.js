import { ItemRepoService } from "./ItemRepoService.js";
//TODO: Import remote service

/**
 * Factory class to create instances of item repository services.
 *
 * This class provides a static method to get an appropriate instance
 * of a item repository service based on the specified repository type.
 * It cannot be instantiated.
 */
export class ItemRepoFactory {
  constructor() {
    throw new Error("Cannot instantiate a ItemRepoFactory object");
  }

  static get(repoType = "local") {
    if (repoType === "local") {
      return new ItemRepoService();
    } else if (repoType === "remote") {
      //TODO: Return remote service
      //return new ItemRepoRemoteService();
    } else {
      throw new Error("Invalid repository type");
    }
  }
}