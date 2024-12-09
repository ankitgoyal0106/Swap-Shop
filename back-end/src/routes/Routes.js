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
    // User Login
    this.router.post("/login", async (req, res) => {
      try {
        await login(req, res);
      } catch (error) {
        res.status(500).json({ message: "Login failed" });
      }
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
    this.router.get("/profiles", async (req, res) => {
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
    const itemController = new ItemController(); 
    this.router.get("/items", async (req, res) => {
      try {
        await ItemController.getAllItems(req, res);
      } catch (error) {
        console.error("Error in /items route:", error);
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
        await ItemController.deleteItem(req, res);
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
