import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import { blogsRouter } from "./controllers/blogs.js";
import { usersRouter } from "./controllers/users.js";
import { loginRouter } from "./controllers/login.js";
import middleware from "./utils/middleware.js";

logger.info("connecting to", config.MONGOOSEURL);
mongoose
  .connect(config.MONGOOSEURL)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", middleware.tokenExtractor);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
