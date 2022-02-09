# Weather Updates Station

GET LIVE UPDATES AFTER EVERY MINUTE

# THIRD PARTY LIBRARIES USED
* Socket IO(socket.io)
* All Cities(all-the-cities)
* Axios(axios)
* Sequelize(sequelize)
* Dotenv(dotenv)
* MySQL2(mysql2)
* UUID V4(uuidv4)

# Socket Events
All socket events are defined in `socketEvents.js`

# Routes 
There is only a single route for registering a user and providing `API_KEY` for 
fetching updates afterwards. 

# Getting Started
There is a .sample-env. Include valid values in it(including the Open Weather API key) and rename it to `.env` to 
successfully run the project.

Then run `npm install` and after successfully installing the packages, run command `npm start`. 
The app will be served on provided `PORT` in the `PORT` environment variable.
