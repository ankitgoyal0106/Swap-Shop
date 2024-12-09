import express from "express";
import ItemController from "../controller/ItemController.js";
import ProfileController from "../controller/ProfileController.js";
import {
  register,
  login,
  logout
} from "../controller/LoginController.js";
import { authenticate } from "../auth/middleware.js";

class Routes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // user registration
    this.router.post("/register", async (req, res) => {
      try {
        await register(req, res);
      } catch (error) {
        res.status(500).json({ message: "Registration failed" });
      }
    });

    // DESCRIPTION
    //   Get profile data of the user trying to log in. This endpoint returns an object with a 'user' property
    //   containing an object of the users profile data.
    // REQUEST
    //   GET /login/credentials?email=""&password=""
    // RESPONSE
    //   {
    //     "user": { ... }
    //   }
    // STATUS CODES
    //   200 - OK: The request was successful
    //   401 - Unauthorized: The user is not authorized to access the requested resource
    //   500 - Internal Server Error: The server encountered an error
    this.router.get("/login/credentials", async (req, res) => {
      await login(req, res);
    });

    // User Logout
    this.router.post("/logout", async (req, res) => {
        await logout(req, res);
    });

    // DESCRIPTION
    //   Get all profiles. This endpoint returns an object with a 'profiles' property
    //   containing an array profiles.
    // REQUEST
    //   GET /profiles
    // RESPONSE
    //   {
    //     "profiles": [ ... ]
    //   }
    // STATUS CODES
    //   200 - OK: The request was successful
    //   500 - Internal Server Error: The server encountered an error
    this.router.get("/profiles", async (req, res) => {
        await ProfileController.getAllProfiles(req, res);
    });

    // DESCRIPTION
    //   Add a new profile without registering. This endpoint creates a new profile with the provided
    //   data and returns the created profile.
    // REQUEST
    //   POST /profile
    //   {
    //     "userID": "ID for the user (optional)",
    //     "name": "User's full name as a string",
    //     "email": "User's email as a string",
    //     "phoneNo": "User's phone number as a string",
    //     "college": "User's college as a string",
    //     "password": "User's password as a string",
    //     "createdAt": "Date the profile was created",
    //     "updatedAt": "Date the profile was last updated",
    //     "achievementCounts": "JSON of counts associated with the user for achievements (optional)",
    //     "savedListings": "Stringified array of saved listings IDs (optional)",
    //     "recentlyViewed": "Stringified array of recently viewed listings IDs (optional)",
    //     "conversationList": "Stringified array of conversation IDs (optional)"
    //   }
    // RESPONSE
    //   {
    //     "profile": { ... }
    //   }
    // STATUS CODES
    //   201 - Created: The profile was created successfully
    //   400 - Bad Request: The request was invalid or missing required data
    //   500 - Internal Server Error: The server encountered an error
    this.router.post("/profile", async (req, res) => {
        await ProfileController.createProfile(req, res);
    });

    // DESCRIPTION
    //   Get the profile associated with a user's email. This endpoint returns an object with a 'profile' property
    //   containing an object of user data.
    // REQUEST
    //   GET /profile/:email
    // RESPONSE
    //   {
    //     "profile": { ... } 
    //   }
    // STATUS CODES
    //   200 - OK: The request was successful
    //   500 - Internal Server Error: The server encountered an error
    this.router.get("/profile/:email", async (req, res) => {
        await ProfileController.getProfile(req, res);
    });

    // DESCRIPTION
    //   Put updated data in a profile associated with a user's email. This endpoint returns an object with a 'profile' property
    //   containing an object of user's updated data.
    // REQUEST
    //   PUT /edit-profile
    //   {
    //     "email": email
    //     ...
    //   }
    // RESPONSE
    //   {
    //     "profile": { ... } 
    //   }
    // STATUS CODES
    //   201 - Created: The request was successful
    //   400 - Bad Request: The request was invalid or missing required data
    //   500 - Internal Server Error: The server encountered an error
    this.router.put("/edit-profile", async (req, res) => {
        await ProfileController.editProfile(req, res);
    });

    //Get Item
    this.router.get("/items", async (req, res) => {
      try {
        await ItemController.getAllItems(req, res);
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    //Get Item ID
    this.router.get("/item/:id", async (req, res) => {
      try {
        const itemID = req.params.id;
        req.body.itemID = itemID;
        await ItemController.getItem(req, res);
      } catch (error) {
        res.status(500).json({ message: "Failed to get item" });
      }
    });

    //Create Item
    this.router.post("/item", async (req, res) => {
      try {
        await ItemController.createItem(req, res);
      } catch (error) {
        res.status(500).json({ message: "Failed to create item" });
      }
    });

    //Delete Item
    this.router.delete("/item", async (req, res) => {
      try {
        await ItemController.removeItem(req, res);
      } catch (error) {
        res.status(500).json({ message: "Failed to remove item" });
      }
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new Routes().getRouter();
