import 'dotenv/config';
import express from 'express'
import connectDB  from './DBconfig.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

// App
const app = express();

// Cors
// CORS configuration options
const corsOptions = {
    origin:['http://localhost:3000', 'https://blogmasterofficial.netlify.app'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  preflightContinue: false,
  optionsSuccessStatus: 204
};




// Routes
import userRoute from './Routes/userRoutes.js'
import blogRoute from './Routes/blogRoutes.js'

// Configurations
connectDB();

// MiddleWares
app.use(express.json());
// Use the CORS middleware with the configured options
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);


// Port
const port = process.env.PORT || 5000;

// App listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
