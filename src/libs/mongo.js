const mongoose = require("mongoose");
const mongo_url = process.env.CONNECTION_STRING;

module.exports = function() {
  mongoose
    .connect(mongo_url, {
      dbName: "fixer_db",
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("Database connection established");
    })
    .catch(err => console.error(err));
};
