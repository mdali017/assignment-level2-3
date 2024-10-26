import mongoose from "mongoose";
import { Server } from "http";
import config from "./app/config";
import app from "./app";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string, {
      // connectTimeoutMS: 1000,
    });
    app.listen(config.port, () => {
      console.log(`Server is running on url http://localhost:${config.port}`);
      console.log("Database connection successfull !!!");
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection is detected, shutting down : ");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException is detected, shutting down : ");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
