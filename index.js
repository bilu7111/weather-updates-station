require("dotenv").config();
const express = require("express");
const geoip = require('geoip-lite');
const requestIp = require('request-ip');

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    try{
        const userIP = requestIp.getClientIp(req);;
        console.log(userIP);
        const userLocation = geoip.lookup(userIP);
        console.log(userLocation);
        res.status(200).json(userLocation);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

app.listen(process.env.PORT || 8080, 'localhost', ()=>{
    console.log(`app listening on PORT ` + process.env.$PORT);
})