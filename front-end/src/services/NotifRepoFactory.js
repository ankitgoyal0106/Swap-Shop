import { NotifRepoService } from "./NotifRepoService.js";
import { NotifRemoteFakeService } from "./NotifRemoteFakeService.js";

/**
 * Factory class to create instances of notification repository services.
 * 
 * This class provides a static method to get an appropriate instance
 * of a notification repository service based on the specified repository type.
 * It cannot be instantiated.
 */
export class NotifRepoFactory {
  constructor() {
    throw new Error('Cannot instantiate a NotifRepoFactory object');
  }

  /**
   * Returns an instance of a notification repository service based on the given
   * repository type.
   *
   * @param {string} [repoType='local'] - The type of repository service to
   * create. Can be 'local' or 'remote'.
   * @returns {NotifRepoService|NotifRepoServerRemote} An instance
   * of the appropriate task repository service.
   * @throws Will throw an error if the repository type is not recognized.
   */
  static get(repoType = 'local') {
    if (repoType === 'local') {
      return new NotifRepoService();
    }
    else if (repoType === 'remote') {
      return new NotifRemoteFakeService();
    }
    else {
      throw new Error('Invalid repository type');
    }
  }
}
