const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userAuthRouter = require("./user/userRoutes/userAuth");

//Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use true if using HTTPS
      httpOnly: true, // Helps mitigate XSS attacks
      maxAge: 1000 * 60 * 60 * 1, // 1 hour in milliseconds
    },
  })
);

//user auth routes
app.use("/auth", userAuthRouter);

//connect to the db()
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo_error: ", err));

// Start the server
const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
