const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/todos", todoRouter);

app.listen(3000);

mongoose
  .connect(
    "mongodb+srv://partharora2233:partharora@cluster0.qojfnju.mongodb.net/",
    { dbName: "todoc" }
  )
  .then(console.log("Mongodb connected...."));

// Connecting the mongoose here to make the connection here...
