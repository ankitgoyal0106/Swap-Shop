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
    this.router.post("/logout", authenticate, async (req, res) => {
      try {
        await logout(req, res);
      } catch (error) {
        res.status(500).json({ message: "Logout failed" });
      }
    });

    // Get All User Profiles
    this.router.get("/profiles", authenticate, async (req, res) => {
      try {
        await ProfileController.getAllProfiles(req, res);
      } catch (error) {
        res.status(500).json({ message: "Failed to retrieve all profiles" });
      }
    });

    // Create A User Profile Without Registering
    this.router.post("/profile", async (req, res) => {
      try {
        await ProfileController.createProfile(req, res);
      } catch {
        res.status(500).json({ message: "Failed to create profile" });
      }
    });

    // Get A User Profile By Email
    this.router.get("/profile:email", authenticate, async (req, res) => {
      try {
        const email = req.params.email;
        req.body.email = email;
        await ProfileController.getProfile(req, res);
      } catch {
        res.status(500).json({ message: "Failed to retrieve profile" });
      }
    });

    //Update Profile
    this.router.put("/edit-profile", async (req, res) => {
      try {
        await ProfileController.editProfile(req, res);
      } catch (error) {
        res.status(500).json({ message: "Failed to update profile" });
      }
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
