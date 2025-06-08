import express from "express";
import rateLimit from 'express-rate-limit';
import { createServer } from "http";
import { connectDB } from "./config/db";

import authMiddleware from "./middlewares/auth.middleware";

connectDB();
const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 4000;



app.use(express.json());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message : "Too many requests from this IP, please try again after an hour",
});


app.use(limiter);
app.use(authMiddleware);

app.use("/deploy", deployRoutes)