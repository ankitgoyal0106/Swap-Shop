import { ChattingRepoRemoteService } from "./ChattingRepoRemoteService.js";
//TODO: Import remote service

/**
 * Factory class to create instances of chat repository services.
 *
 * This class provides a static method to get an appropriate instance
 * of a chat repository service based on the specified repository type.
 * It cannot be instantiated.
 */
export class ChatRepoFactory {
  constructor() {
    throw new Error("Cannot instantiate a ChattingRepoRemoteService object");
  }

  static get(repoType = "local") {
    if (repoType === "local") {
      //return new ChattingRepoRemoteService();
    } else if (repoType === "remote") {
      //TODO: Return remote service
      return new ChattingRepoRemoteService();
    } else {
      throw new Error("Invalid repository type");
    }
  }
}