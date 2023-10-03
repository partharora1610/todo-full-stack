const express = require("express");

const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/todos", todoRouter);

// Handling operational errors
app.all("*", (req, res, next) => {
  // creating an error so that the middleware can handle the error
  const err = new Error(`Can't find the ${req.originalUrl} on the server`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

// Global Error Middleware
// 500 => Internal Server Error
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({ status: err.status, message: err.message });
});

module.exports = app;
