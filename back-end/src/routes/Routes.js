import express from "express";
import ItemController from "./controller/ItemController.js";
import {
  register,
  login,
  logout,
  getProfile,
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

    // Get User Profile
    this.router.get("/profile", authenticate, async (req, res) => {
      try {
        await getProfile(req, res);
      } catch (error) {
        res.status(500).json({ message: "Failed to retrieve profile" });
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

    //Update Profile
    this.router.post("/edit-profile", async (req, res) => {
      try {
        await ProfileController.editProfile(req, res);
      } catch (error) {
        res.status(500).json({ message: "Failed to update profile" });
      }
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new Routes().getRouter();
