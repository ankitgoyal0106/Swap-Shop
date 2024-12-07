import Service from "./Service.js";
import { Events } from "../eventhub/Events.js";

export class ProfileRepoRemoteService extends Service {
  constructor() {
    super();
    this.#initProfiles();
  }

  addSubscriptions() {
    this.subscribe(Events.StoreProfile, (data) => {
      this.storeProfile(data);
    });

    this.subscribe(Events.RegisterProfile, (data) => {
      this.registerProfile(data);
    });

    this.subscribe(Events.DeleteProfile, () => {
      this.deleteProfile();
    });

    this.subscribe(Events.GetProfile, (email) => {
      this.getProfile(email);
    });

    this.subscribe(Events.ProfileEdited, (data) => {
      this.updateProfile(data);
    });
  }

  async #initProfiles() {
    const response = await fetch("http://localhost:3000/v1/profiles");

    if (!response.ok) {
      throw new Error("Failed to fetch profiles");
    }

    const data = await response.json();

    data.profiles.forEach(async (profile) => {

      this.publish(Events.NewProfile, profile);
    });
  }

  async registerProfile(profileData) {
    const response = await fetch("http://localhost:3000/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error("Failed to register profile");
    }

    const data = await response.json();
    this.publish(Events.Registered, data);
    return data
  }

  async storeProfile(profileData) {

    const response = await fetch("http://localhost:3000/v1/profile", {
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


  async deleteProfile() {
    //TODO: Create delete profile method. Def need to add parameter.
    this.publish(Events.DeleteProfileSuccess);
  }

  async getProfile(email) {
    const response = await fetch(`http://localhost:3000/v1/profile/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    
    this.publish(Events.GetProfileSuccess, data);
  }

  async updateProfile(profileData) {
    const response = await fetch("http://localhost:3000/v1/edit-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    return data;
  }
}
