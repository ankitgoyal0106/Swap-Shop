import Service from "./Service.js";
import { Events } from "../eventhub/Events.js";
//TODO: Import base64

export class ProfileRepoRemoteService extends Service {
  constructor() {
    super();
    this.#initProfiles();
  }

  addSubscriptions() {
    this.subscribe(Events.StoreProfile, (data) => {
      this.storeProfile(data);
    });

    this.subscribe(Events.DeleteProfile, () => {
      this.deleteProfile();
    });
  }

  //Public method for profile fetching (to be used to fetch achievement info)
  async initializeProfiles() {
    await this.#initProfiles();
  }

  //Private method for fetching profile data
  async #initProfiles() {
    const response = await fetch("/v1/profiles");

    if (!response.ok) {
      throw new Error("Failed to fetch profiles");
    }

    const data = await response.json();

    data.profiles.forEach(async (profile) => {
      //Fetch the information for the achievements page
      const profileData = {
          achievementCounts: {
          listed: profile.itemsListed || 0, 
          sold: profile.itemsSold || 0,     
          viewed: profile.itemsViewed || 0, 
          easterEgg: profile.foundEasterEgg || false,  
        }
      };

      this.publish(Events.NewProfile, profileData);
    });
  }

  async storeProfile(profileData) {
    //TODO: Add base 64 conversion

    const response = await fetch("/v1/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error("Failed to store profile");
    }

    const data = await response.json();
    return data;
  }

  //TODO: Add base 64 method here

  async deleteProfile() {
    //TODO: Create delete profile method. Def need to add parameter.
    this.publish(Events.DeleteProfileSuccess);
  }
}
