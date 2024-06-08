import 'dotenv/config';
import express from 'express'
import  connectDB  from './DBconfig.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

// App
const app = express();

// Routes
import userRoute from './Routes/userRoutes.js'
import blogRoute from './Routes/blogRoutes.js'

// Configurations
connectDB();

// MiddleWares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);
// Port
const port = 5000;

// App listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
