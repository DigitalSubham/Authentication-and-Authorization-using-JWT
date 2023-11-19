const mongoose = require("mongoose");
require("dotenv").config();

const databaseToServerConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Server to Database Connection Successful");
    })
    .catch((err) => {
      console.log("Some error while connection to database");
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = databaseToServerConnection;
