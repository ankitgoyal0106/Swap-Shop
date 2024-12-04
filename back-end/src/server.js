import express from "express";  
import routes from "./routes/Routes.js";
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
    this.app.use("/v1", routes); //update the name based on the class in the taskroutes file
}

start(port = 3000) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

console.log("Starting server...");
const server = new Server();
server.start();