import express from "express";  
import Routes from "./routes/Routes.js";
class Server{
  constructor(){
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }


//Configure all the middleware
configureMiddleware(){
    this.app.use(express.static("../front-end/src"));

    this.app.use(express.json({ limit: "10mb" }));
}

setupRoutes(){
    this.app.use("/v1", Routes); //update the name based on the class in the taskroutes file
}

start(port = 3000) {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

console.log("Starting server...");
const server = new Server();
server.start();
