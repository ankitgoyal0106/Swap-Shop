import express from "express";  
//IMPORT the TaskRoutes from he file ex: import TaskRoutes from "./routes/TaskRoutes.js";
class Server{
  constructor(){
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }


//Configure all the middleware
configureMiddleware(){
    this.app.use(express.static("../front-end/source"));

    this.app.use(express.json({ limit: "10mb" }));
}

setupRoutes(){
    this.app.use("/v1", TaskRoutes); //update the name based on the class in the taskroutes file
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