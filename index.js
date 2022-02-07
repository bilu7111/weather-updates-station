require("dotenv").config();
const express = require("express");
const geoip = require('geoip-lite');
const requestIp = require('request-ip');

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    const userIP = requestIp.getClientIp(req);;
    console.log(userIP);
    const userLocation = geoip.lookup(userIP);
    console.log(userLocation);
    res.status(200).json(userLocation);
})

app.listen(process.env.API_PORT, 'localhost', ()=>{
    console.log(`app listening on PORT ` + process.env.API_PORT);
})