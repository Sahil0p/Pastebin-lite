import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/pasteRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { connectDB } from "./config/db.js";

connectDB();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

export default app;
