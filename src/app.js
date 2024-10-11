import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import mongoDB from "./config/mongoose.config.js";
import { config as dotenvConfig } from "dotenv";

import router from "./routes/index.js";
import path from "./utils/path.js";

import { errorHandle } from "./errors/errHandle.js";
import { logger } from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

dotenvConfig({ path: path.env })

app.use("/api", router);

// Middleware de manejo de errores
app.use(errorHandle);

app.listen(PORT, () => {
    logger.info(`Listening on ${PORT}`);
    mongoDB.connectDB();
});