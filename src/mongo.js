const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb+srv://fixer_user:fixer_password@cluster0-2ycjl.mongodb.net/test?retryWrites=true&w=majority";


module.exports = function (app) {
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
        .then((connection) => {
            app.users = connection.db("fixer_db").collection("users");
            console.log("Database connection established")
        })
        .catch((err) => console.error(err))

};