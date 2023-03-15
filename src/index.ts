import mongoose from "mongoose";
import express from "express";
import config from "./config/config";
import sessionRoutes from "./routes/session.route";
import userRoutes from "./routes/user.routes";

const app = express();

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB connected.");

    // Only start server after connecting to MongoDB.
    startServer();
  })
  .catch((error) => {
    console.log(error);
  });

const startServer = () => {
  app.use(express.json());
  app.use("/session", sessionRoutes);
  app.use("/user", userRoutes);

  app.listen(config.port, () => console.log(`App is running at port: ${config.port}`));
};
