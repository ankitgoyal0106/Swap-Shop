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

    this.subscribe(Events.Login, (credentials) => {
      this.login(credentials);
    });
  }

  async #initProfiles() {
    const response = await fetch("http://localhost:3000/v1/profiles");

    if (!response.ok) {
      throw new Error("Failed to fetch profiles");
    } else {
      const data = await response.json();

      data.profiles.forEach(async (profile) => {

      this.publish(Events.NewProfile, profile);
    });
    }
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
    } else {
      const data = await response.json();
      this.publish(Events.Registered, data);
      return data
    }
  }

  async login(credentials) {
    const queryParams = new URLSearchParams(credentials).toString();
    const response = await fetch(`http://localhost:3000/v1/login/credentials?${queryParams}`);

    if (!response.ok) {
      const message = await response.json().then((e) => e.message);
      alert(message);
      throw new Error("Failed to login");
    } else {
      const data = await response.json();
      this.publish(Events.LoginSuccess, data);
      return data;
    }
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
    } else {
      const data = await response.json();
      return data;
    }
  }


  async deleteProfile() {
    //TODO: Create delete profile method. Def need to add parameter.
    this.publish(Events.DeleteProfileSuccess);
  }

  async getProfile(email) {
    const response = await fetch(`http://localhost:3000/v1/profile/${email}`);

    if (!response.ok) {
      this.publish(Events.GetProfileFailure, `Profile does not exist`);
      throw new Error("Failed to fetch profile");
    } else {
      const data = await response.json();
      this.publish(Events.GetProfileSuccess, data);
    }
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
    } else {
      const data = await response.json();
      this.publish(Events.ProfileEditedSuccess, data);
      return data;
    }
  }
}