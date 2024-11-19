import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import userAuthRouter from "./user/userRoutes/userAuth.js";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

//Middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use true if using HTTPS
      httpOnly: true, // Helps mitigate XSS attacks
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour in milliseconds
    },
  })
);
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());

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
app.use((err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

});
