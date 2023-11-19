const databaseToServerConnection = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const router = require("./routes/route");
const express = require("express");
const app = express();

databaseToServerConnection();
app.use(express.json());
app.use(cookieParser());

app.use("/user", router);
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () => {
  console.log("Server Started at Port:", process.env.PORT);
});
