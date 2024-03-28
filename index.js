// server.mjs
const express=require("express")
const bodyparser=require("body-parser")
const { ConnectToDataBase}=require("./dbconfig")

//enabling local env variables
require("dotenv").config();
//initiate db connection
ConnectToDataBase();
const http_server = express();

//inject body-paser middileware
http_server.use(bodyparser.json())


http_server.use("/api",require("./controllers/Task.controller"))


// starts a simple http server locally on port 3000
http_server.listen(process.env.PORT,process.env.HOSTNAME, () => {
  console.log('Server Started');
});

// run with `node server.mjs`
