const { default: axios } = require("axios");
const { User, WeatherUpdate } = require("./database/models");
const cron = require('node-cron');

// Helpful to check provided city name is correct or not
const cities = require('all-the-cities');
const compareWeather = require("./utils/compareWeather");
const { uuid } = require("uuidv4");


/**
 * Global Node Cron Task Variable
 */
let task;

module.exports = ( io ) => {
    try{
        io.on("connection", async (socket) => {
            console.log("A User has connected to the socket.");
             
            let apiRes;
            let weather_update = null;
           
            // As cron job updates after one minute, we want to show some initial weather update
            // For consecutive updates, a valid API KEY is required.
            const url = encodeURI(`${process.env.OPEN_WEATHER_BASE_URL}/weather?q=${process.env.CENTRAL_SERVER_CITY}&appid=${process.env.OPEN_WEATHER_KEY}`);
                            apiRes = await axios.get(url)
                            .catch(err=>{throw new Error(err.message)});
            weather_update = apiRes.data;
            socket.emit("weather_update", {weather_update});

            socket.on("get_update", (payload)=>{

                /**
                 * If there is already a cron job, stop it.
                 */
                if(task) {
                    task.stop();
                }

                task = cron.schedule("* * * * *", async ()=> {
                    try{
                        const apiKey = payload.apiKey;
                        const userAvailable = await User.findOne({
                                where : {
                                    apiKey: apiKey
                                }
                            });
        
                        // If in some case the user is not available
                        if(!userAvailable){
                            socket.emit("user_not_found");
                            task.stop();
                            return null;
                        }

                        if(payload.location && cities.filter(city => city.name.toLowerCase().match(payload.location.toLowerCase())).length) {

                            /**
                             * We don't want to get invalid input from user. On a Typo mistake in city name, we guess the 
                             * best possible matching city to it
                             */
                            const cityName = cities.filter(city => city.name.toLowerCase().match(payload.location.toLowerCase()))[0].name;
                            const url = encodeURI(`${process.env.OPEN_WEATHER_BASE_URL}/weather?q=${cityName}&appid=${process.env.OPEN_WEATHER_KEY}`);
                            apiRes = await axios.get(url)
                            .catch(err=>{throw new Error(err.message)});
                            weather_update = apiRes.data;
                        }

                        // If location is not provided, we use the city of the Central Server
                        else {
                            const url = encodeURI(`${process.env.OPEN_WEATHER_BASE_URL}/weather?q=${process.env.CENTRAL_SERVER_CITY}&appid=${process.env.OPEN_WEATHER_KEY}`);
                            apiRes = await axios.get(url)
                            .catch(err=>{throw new Error(err.message)});
                            weather_update = apiRes.data;
                        }

                        /**
                         * As mentioned in the assignment, we add weather details to database if 
                         * the latest update is different
                         */
                        const [lastWeatherUpdate] = await WeatherUpdate.findAll({
                            limit: 1,
                            order: [ [ 'createdAt', 'DESC' ]]
                        });
                        if(!lastWeatherUpdate || !compareWeather(lastWeatherUpdate, weather_update.weather[0])){
                            const weatherDetails = weather_update.weather[0];
                            delete weatherDetails.id;
                            await WeatherUpdate.create({id: uuid(),...weatherDetails});
                        }

                        socket.emit("weather_update", {weather_update});
                    }
                    catch(err){
                        console.log(err);
                        throw new Error(err);
                    }
                });

                task.start();
            });
        });

        io.on("disconnection", (sockey) => {
            console.log("A user disconnected", task);

            /**
             * Completely destroy the Cron Job
             */
            if(task) task.destroy();
        });

    }
    catch(err){
        console.log(err);
    }
}