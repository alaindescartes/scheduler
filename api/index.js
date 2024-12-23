import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import userAuthRouter from './user/userRoutes/userAuth.js';
import residenceRouter from './residence/residenceRoute/residence.js';
import { isAuthenticated } from './auth/authHelper.js';
import clientRouter from './client/clientRoutes/clientRoutes.js';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Middleware: Session
app.use(
  session({
    secret: process.env.SECRET_KEY || 'defaultSecret', // Fallback secret key for development
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Secure cookies in production (HTTPS)
      httpOnly: true, // Prevent client-side access
      sameSite: 'lax', // Protect against CSRF
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// Middleware: CORS
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // Use env variable or default
    credentials: true, // Allow cookies and headers
  })
);

// Middleware: Parse JSON
app.use(express.json());

// Routes
app.use('/auth', userAuthRouter); // Authentication routes
app.use('/res', isAuthenticated, residenceRouter); // Protected residence routes
app.use('/client', isAuthenticated, clientRouter); // Protected client routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // 30 seconds timeout
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Enable Mongoose Debugging (Optional, useful for development)
//mongoose.set('debug', process.env.NODE_ENV !== 'production');

// Start the Server
const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Global Error Handling Middleware
app.use((err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  console.error('Global error:', err);
});
