import 'dotenv/config';
import express from 'express';
import connectDB from './DBconfig.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Initialize the app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration options
const corsOptions = {
  origin: ['http://localhost:3000', 'https://blogmasterofficial.netlify.app'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Middlewares
app.use(cookieParser());
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Database connection
connectDB();

// Importing routes
import userRoute from './Routes/userRoutes.js';
import blogRoute from './Routes/blogRoutes.js';

// Using routes
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);

// Port configuration
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
