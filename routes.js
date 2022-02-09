const { uuid } = require('uuidv4');
const { User } = require("./database/models/index");


module.exports = (app) => {
    app.post("/register-user", async (req, res)=>{
        try{
            const apiKey = uuid();
            const userId = uuid();
            await User.create({apiKey, id: userId});
            res.status(200).json({apiKey, userId});
        }
        catch(err){
            res.status(500).send(err);
        }
    });
}