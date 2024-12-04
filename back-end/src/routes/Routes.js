import express from "express";
import ItemController from "./controller/ItemController.js";

class Routes {
    constructor(){
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes(){

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

    getRouter(){
        return this.router;
    }
}

export default new Routes().getRouter();
