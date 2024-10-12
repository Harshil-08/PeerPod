import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import { auth } from "./middlewares/auth.js";
import rootRouter from "./routes/root.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors("*"));
app.use(cookieParser());

app.use("/api", rootRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", auth, userRouter);

app.listen(PORT, () => {
  try {
    mongoose.connect(DB_URI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(`Error connecting to server: ${error.message}`);
  }

  console.log(`Server listening on port ${PORT}`);
});
