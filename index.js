require("dotenv").config();
const express = require("express");
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const routes = require("./routes");
const socketEvents = require("./socketEvents");
const io = new Server(server);

app.use(express.json());

app.use(express.static('./static'));

routes(app);
socketEvents(io);


server.listen(process.env.PORT || 8080, 'localhost', ()=>{
    console.log(`app listening on PORT ` + process.env.PORT);
})