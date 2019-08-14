const mongoose = require('mongoose');
const mongo_url = "mongodb+srv://fixer_user:fixer_password@cluster0-2ycjl.mongodb.net/test?retryWrites=true&w=majority";

module.exports = function () {
    mongoose.connect(mongo_url, {dbName: 'fixer_db', useNewUrlParser: true, useCreateIndex: true})
        .then(() => {
            console.log("Database connection established")
        })
        .catch((err) => console.error(err))
};